import { useEffect, useRef } from "react";

export interface PendulumOptions {
  /** How strongly a change in tilt (acceleration) kicks the swing. */
  driveGain?: number;
  /** Spring constant pulling back to dead vertical (rad/s^2 per rad) — higher swings faster. */
  stiffness?: number;
  /** Damping coefficient — higher settles the swing sooner. */
  damping?: number;
  /** Hard clamp, in degrees, so an extreme flick can't over-rotate the bob. */
  maxAngleDeg?: number;
}

const MAX_DT = 1 / 30;
// Below these thresholds the swing is imperceptible — snap exactly onto dead
// vertical instead of leaving it to approach asymptotically and never arrive.
const REST_ANGLE_EPSILON = (0.02 * Math.PI) / 180;
const REST_VELOCITY_EPSILON = 0.001;

// A pendulum hanging from a pivot: equilibrium is always dead vertical
// (angle 0), and it's only kicked out of rest by *changes* in tilt
// (acceleration), not by however the tilt currently sits. So holding a
// steady tilt lets it swing back to center, and only an actual tilt
// movement sets it swaying — like a real hanging mala reacting to jostles,
// not leaning to track wherever your hand currently is. Low stiffness
// relative to damping keeps the swing slow and soft rather than a stiff,
// fast-snapping spring.
export function usePendulum(
  tilt: number,
  { driveGain = 1, stiffness = 50, damping = 1, maxAngleDeg = 4 }: PendulumOptions = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const angularVelocity = useRef(0);
  const tiltRef = useRef(tilt);
  const prevTiltRef = useRef(tilt);

  useEffect(() => {
    tiltRef.current = tilt;
  }, [tilt]);

  useEffect(() => {
    let frameId: number;
    let lastTime: number | null = null;
    const maxAngle = (maxAngleDeg * Math.PI) / 180;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, MAX_DT);
      lastTime = time;

      const tiltDelta = tiltRef.current - prevTiltRef.current;
      prevTiltRef.current = tiltRef.current;
      angularVelocity.current += driveGain * tiltDelta;

      const angularAcceleration = -stiffness * angle.current - damping * angularVelocity.current;
      angularVelocity.current += angularAcceleration * dt;
      angle.current += angularVelocity.current * dt;

      if (angle.current > maxAngle) {
        angle.current = maxAngle;
        angularVelocity.current = Math.min(angularVelocity.current, 0);
      } else if (angle.current < -maxAngle) {
        angle.current = -maxAngle;
        angularVelocity.current = Math.max(angularVelocity.current, 0);
      }

      if (
        Math.abs(angle.current) < REST_ANGLE_EPSILON &&
        Math.abs(angularVelocity.current) < REST_VELOCITY_EPSILON
      ) {
        angle.current = 0;
        angularVelocity.current = 0;
      }

      if (ref.current) {
        ref.current.style.transform = `rotate(${(angle.current * 180) / Math.PI}deg)`;
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [driveGain, stiffness, damping, maxAngleDeg]);

  return ref;
}
