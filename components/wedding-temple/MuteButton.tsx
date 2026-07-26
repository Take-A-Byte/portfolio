"use client";

import { useState } from "react";

// Small and low-contrast on purpose — this is an escape hatch for the rare
// visitor who wants it off, not a control anyone's meant to notice first.
// Fixed to the viewport (not the card) so it stays reachable regardless of
// how the invite itself scrolls/tilts.
export function MuteButton({
  audioRef,
  initialMuted = false,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  // The "Start muted anyway" entry path already sets audio.muted before
  // this component ever mounts — reading audioRef.current during render to
  // pick up that state isn't allowed (refs are effect/handler-only), so
  // the caller passes it down as a plain prop instead.
  initialMuted?: boolean;
}) {
  const [muted, setMuted] = useState(initialMuted);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      aria-pressed={muted}
      className="fixed right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white opacity-60 backdrop-blur-sm transition-opacity active:scale-95 hover:opacity-100"
    >
      {muted ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L18.73 21 20 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </button>
  );
}
