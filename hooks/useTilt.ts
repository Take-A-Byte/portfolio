import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export type TiltMode = "gyro" | "pointer";

export interface TiltState {
  /** -1 (left) to 1 (right) */
  x: number;
  /** -1 (up/back) to 1 (down/forward) */
  y: number;
  mode: TiltMode;
  /** iOS 13+ requires a user gesture before granting DeviceOrientation access */
  needsPermission: boolean;
  permissionDenied: boolean;
  requestPermission: () => Promise<void>;
}

type OrientationPermissionAPI = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const MAX_GAMMA = 32;
const MAX_BETA_OFFSET = 32;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// Whether the browser gates DeviceOrientation behind a user gesture (iOS 13+).
// This never changes during a session, so it's read via useSyncExternalStore
// rather than pushed into state from an effect.
function subscribeToNothing() {
  return () => {};
}

function getRequiresGesture() {
  if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
    return false;
  }
  const OrientationEvent = window.DeviceOrientationEvent as OrientationPermissionAPI;
  return typeof OrientationEvent.requestPermission === "function";
}

function getRequiresGestureServerSnapshot() {
  return false;
}

export function useTilt(): TiltState {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [mode, setMode] = useState<TiltMode>("pointer");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requiresGesture = useSyncExternalStore(
    subscribeToNothing,
    getRequiresGesture,
    getRequiresGestureServerSnapshot,
  );
  const needsPermission = requiresGesture && !permissionGranted;

  // First reading becomes the "neutral" pose so beta is relative to how the
  // user is already holding the device, not absolute to the ground.
  const baseBeta = useRef<number | null>(null);
  const gyroActive = useRef(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.beta === null || event.gamma === null) return;
    if (baseBeta.current === null) baseBeta.current = event.beta;

    gyroActive.current = true;
    setMode("gyro");
    setX(clamp(event.gamma / MAX_GAMMA, -1, 1));
    setY(clamp((event.beta - baseBeta.current) / MAX_BETA_OFFSET, -1, 1));
  }, []);

  const attachGyro = useCallback(() => {
    window.addEventListener("deviceorientation", handleOrientation);
  }, [handleOrientation]);

  const requestPermission = useCallback(async () => {
    const OrientationEvent = window.DeviceOrientationEvent as
      | OrientationPermissionAPI
      | undefined;
    if (!OrientationEvent?.requestPermission) return;

    try {
      const result = await OrientationEvent.requestPermission();
      if (result === "granted") {
        setPermissionGranted(true);
        attachGyro();
      } else {
        setPermissionDenied(true);
      }
    } catch {
      setPermissionDenied(true);
    }
  }, [attachGyro]);

  useEffect(() => {
    if (requiresGesture) return;
    attachGyro();
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [requiresGesture, attachGyro, handleOrientation]);

  useEffect(() => {
    function handlePointer(clientX: number, clientY: number) {
      if (gyroActive.current) return;
      setX(clamp((clientX / window.innerWidth) * 2 - 1, -1, 1));
      setY(clamp((clientY / window.innerHeight) * 2 - 1, -1, 1));
    }
    function onMouseMove(event: MouseEvent) {
      handlePointer(event.clientX, event.clientY);
    }
    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (touch) handlePointer(touch.clientX, touch.clientY);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return { x, y, mode, needsPermission, permissionDenied, requestPermission };
}
