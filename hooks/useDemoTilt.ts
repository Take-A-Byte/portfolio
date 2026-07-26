"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_TILT_AMOUNT = 0.3;
const DEMO_TILT_MS = 1400;
// If real tilt input is already moving by more than this once the demo
// would start, skip/cancel it — the visitor has already found the gesture,
// so a synthetic nudge would just fight with their own input.
const REAL_INPUT_EPSILON = 0.03;

// A one-shot "look, it tilts" nudge on the x-axis: swings out and back,
// decaying to rest, entirely synthetic (not real tilt/pointer input) —
// replaces an explicit instructional caption by having the invite
// demonstrate its own affordance. Runs once `active` turns true (the
// caller decides when — e.g. once the swipe onboarding has finished), and
// bails immediately the moment real input starts moving mid-demo, so it
// never fights with an actual tilt.
export function useDemoTilt(realX: number, active: boolean) {
  const [offset, setOffset] = useState(0);
  const realXRef = useRef(realX);

  useEffect(() => {
    realXRef.current = realX;
  }, [realX]);

  useEffect(() => {
    if (!active) return;

    let frameId: number;
    let start: number | null = null;

    function step(time: number) {
      if (Math.abs(realXRef.current) > REAL_INPUT_EPSILON) {
        setOffset(0);
        return;
      }

      if (start === null) start = time;
      const t = Math.min((time - start) / DEMO_TILT_MS, 1);
      // One swing right, a smaller swing back left, decaying to rest —
      // reads as a gentle nudge rather than a mechanical wobble.
      setOffset(Math.sin(t * Math.PI * 2) * DEMO_TILT_AMOUNT * (1 - t));

      if (t < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setOffset(0);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active]);

  return offset;
}
