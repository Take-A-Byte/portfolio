"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Half of this is how long the cloud takes to travel from off-screen to
// fully covering the text (the animation's midpoint, where the text swap
// also happens — see goTo below) — 2500 made that a 1250ms travel, which
// read as a sluggish delay rather than a quick wipe.
export const SWEEP_MS = 1500;
// Minimum horizontal drag distance (px) before a pointer-down/up pair
// counts as a swipe instead of a tap/click on something inside the card
// (e.g. a pagination dot).
const DRAG_THRESHOLD_PX = 5;
// How long the overview slide sits still before the one-time onboarding
// peek starts, on mount.
const AUTO_PEEK_DELAY_MS = 1800;
// How long the onboarding peek holds on slide 1 before auto-reversing back
// to slide 0, once its cloud sweep has finished arriving.
const AUTO_PEEK_HOLD_MS = 900;

export type CloudDirection = "enter-left" | "enter-right" | null;

// Drives an index (0..count-1) with a "cloud" direction to animate against,
// plus a one-time onboarding peek: index 1, then back to 0. The direction is
// named after which edge the cloud enters from, matching the swipe that
// triggered it — dragging left (going to the next item) brings the cloud in
// from the right, dragging right (previous) brings it in from the left.
export function usePanelSwipe(count: number) {
  const [current, setCurrent] = useState(0);
  const [cloud, setCloud] = useState<CloudDirection>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  const currentRef = useRef(0);
  const busyRef = useRef(false);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const goTo = useCallback(
    (index: number, direction?: "enter-left" | "enter-right") => {
      if (busyRef.current) return;
      const clamped = Math.max(0, Math.min(count - 1, index));
      if (clamped === currentRef.current) return;

      const dir = direction ?? (clamped > currentRef.current ? "enter-right" : "enter-left");
      busyRef.current = true;
      setCloud(dir);

      setTimeout(() => setCurrent(clamped), SWEEP_MS / 2);
      setTimeout(() => {
        setCloud(null);
        busyRef.current = false;
      }, SWEEP_MS);
    },
    [count],
  );

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function runOnboarding() {
      await delay(AUTO_PEEK_DELAY_MS);
      if (cancelled || count < 2) {
        setOnboardingDone(true);
        return;
      }
      goTo(1, "enter-right");
      await delay(SWEEP_MS + AUTO_PEEK_HOLD_MS);
      if (cancelled) return;
      goTo(0, "enter-left");
      await delay(SWEEP_MS);
      if (cancelled) return;
      setOnboardingDone(true);
    }

    runOnboarding();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePointerDown(event: { clientX: number }) {
    dragStartX.current = event.clientX;
  }

  function handlePointerUp(event: { clientX: number }) {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;

    if (delta < 0) goTo(current + 1, "enter-right");
    else goTo(current - 1, "enter-left");
  }

  return {
    current,
    cloud,
    onboardingDone,
    goTo,
    handlePointerDown,
    handlePointerUp,
  };
}
