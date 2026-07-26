"use client";

import { useCallback, useEffect, useRef } from "react";

export interface MalaChainOptions {
  /** How strongly a change in tilt (acceleration) kicks the topmost link. */
  driveGain?: number;
  /** Fraction of a link's angular acceleration that transmits to the link below it. */
  transferGain?: number;
  /** Spring constant pulling each link back to hanging straight from its parent. */
  stiffness?: number;
  /** Damping coefficient — higher settles each link sooner. */
  damping?: number;
  /** Hard clamp, in degrees, on any single link's rotation relative to its parent. */
  maxAngleDeg?: number;
}

const MAX_DT = 1 / 30;
const REST_EPS_ANGLE = (0.02 * Math.PI) / 180;
const REST_EPS_VEL = 0.001;

// Models the mala as a chain of rigid links hinged end to end, rendered as
// nested DOM nodes so each link's rotation is relative to the one above it
// and compounds down the chain — the standard way to fake a multi-joint
// pendulum without solving the full coupled equations of motion for real.
//
// Only the top link is driven directly by tilt acceleration. Every link
// below is a damped oscillator whose equilibrium is "hang straight as a
// continuation of whatever the parent link is doing" (relative angle 0),
// driven by the parent's own angular acceleration that frame. A kick then
// propagates smoothly down the chain, each joint bending a little more than
// the one above — instead of every bead independently chasing a position
// and drifting out of phase with its neighbours, which is what reads as an
// unnatural snake/traveling wave.
export function useMalaChain(
  tilt: number,
  count: number,
  {
    driveGain = 5,
    transferGain = 75,
    stiffness = 1000,
    damping = 0.1,
    maxAngleDeg = 500,
  }: MalaChainOptions = {},
) {
  const elementsRef = useRef<Array<HTMLDivElement | null>>(
    Array.from({ length: count }, () => null),
  );
  const angleRef = useRef<number[]>(Array.from({ length: count }, () => 0));
  const velRef = useRef<number[]>(Array.from({ length: count }, () => 0));
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

      const angle = angleRef.current;
      const vel = velRef.current;
      let parentAccel = 0;

      for (let i = 0; i < count; i++) {
        if (i === 0) {
          vel[0] += driveGain * tiltDelta;
        }

        const drive = i === 0 ? 0 : transferGain * parentAccel;
        const accel = -stiffness * angle[i] - damping * vel[i] + drive;
        vel[i] += accel * dt;
        angle[i] += vel[i] * dt;

        if (angle[i] > maxAngle) {
          angle[i] = maxAngle;
          vel[i] = Math.min(vel[i], 0);
        } else if (angle[i] < -maxAngle) {
          angle[i] = -maxAngle;
          vel[i] = Math.max(vel[i], 0);
        }

        if (Math.abs(angle[i]) < REST_EPS_ANGLE && Math.abs(vel[i]) < REST_EPS_VEL) {
          angle[i] = 0;
          vel[i] = 0;
        }

        parentAccel = accel;

        const el = elementsRef.current[i];
        if (el) {
          el.style.transform = `rotate(${(angle[i] * 180) / Math.PI}deg)`;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [count, driveGain, transferGain, stiffness, damping, maxAngleDeg]);

  const getRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      elementsRef.current[index] = el;
    },
    [],
  );

  return { getRef };
}
