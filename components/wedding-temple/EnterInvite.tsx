"use client";

// A "tap to begin" gate in front of the invite. Audio can't autoplay
// without a user gesture, and our previous fallback — starting playback on
// the first pointerdown anywhere on the page — was unreliable on mobile
// Safari/Chrome, likely because the state-driven re-render between the
// gesture and the play() call broke the "user activation" chain some
// engines require. Routing it through this one explicit tap fixes that.
export function EnterInvite({
  audioRef,
  onEnter,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  // Reports which path was used so the page can tell MuteButton what icon
  // to start on (its own ref-read-during-render isn't allowed, so this is
  // how that state actually gets there).
  onEnter: (startedMuted: boolean) => void;
}) {
  // Must call play() synchronously inside this click handler — deferring
  // it to a later effect/render loses the "user gesture" context mobile
  // browsers require.
  function handleEnter() {
    audioRef.current?.play().catch(() => {});
    onEnter(false);
  }

  // Starts playback muted rather than skipping play() entirely — that way
  // the MuteButton's later "unmute" tap just flips the existing track's
  // muted flag instead of needing to start playback for the first time
  // itself (unmuting isn't gated by autoplay policy, only starting is, but
  // this keeps both entry paths converging on "audio is already playing").
  function handleStartMuted(event: React.MouseEvent) {
    event.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.play().catch(() => {});
    }
    onEnter(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
      onClick={handleEnter}
    >
      <div className="flex max-w-sm flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center shadow-2xl">
        <svg viewBox="0 0 24 24" fill="#f55e69" className="h-12 w-12">
          <path d="M12 21s-6.7-4.35-9.33-8.2C1.02 10.6 1.5 7.4 4.1 5.7c2.02-1.32 4.6-.9 6.2 1 .6.7 1.1 1.5 1.7 1.5s1.1-.8 1.7-1.5c1.6-1.9 4.18-2.32 6.2-1 2.6 1.7 3.08 4.9 1.43 7.1C18.7 16.65 12 21 12 21z" />
        </svg>
        <h2 className="font-cormorant text-3xl font-bold text-zinc-900">Welcome!</h2>
        <p className="text-base text-zinc-600">Tap anywhere to begin, best experienced with sound on</p>
        <p className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span aria-hidden>✨</span> Enjoy the celebration <span aria-hidden>✨</span>
        </p>
        <button
          type="button"
          onClick={handleStartMuted}
          className="mt-2 cursor-pointer text-sm text-zinc-400 underline underline-offset-2"
        >
          Start muted anyway
        </button>
      </div>
    </div>
  );
}
