"use client";

import { useEffect, useRef, useState } from "react";
import { TempleInviteScene } from "@/components/wedding-temple/TempleInviteScene";
import { TempleLoader } from "@/components/wedding-temple/TempleLoader";
import { EnterInvite } from "@/components/wedding-temple/EnterInvite";
import { MuteButton } from "@/components/wedding-temple/MuteButton";
import "./page.css";

const MIN_LOADING_MS = 3000;

export default function WeddingTempleInvitation() {
  const [started, setStarted] = useState(false);
  const [startedMuted, setStartedMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Only starts counting once the visitor has dismissed the welcome
  // dialog — otherwise it'd burn through its 3s minimum underneath a
  // dialog nobody can see yet.
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setLoading(false), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, [started]);

  // volume isn't a settable JSX attribute on <audio> (it's a DOM property
  // only) — background music should sit under the page, not compete with
  // it, so this can't be left at the browser default of full volume.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.25;
  }, []);

  return (
    <>
      <div className="flex h-dvh flex-col overflow-hidden bg-orange-50 px-4 pb-6 pt-8 font-geist dark:bg-zinc-950 sm:px-8">
        <audio ref={audioRef} src="/wedding-temple/theme-song.mp3" loop preload="auto" />

        <main className="mx-auto flex w-full max-w-2xl flex-1">
          {loading ? <TempleLoader /> : <TempleInviteScene />}
        </main>
      </div>

      {!started && (
        <EnterInvite
          audioRef={audioRef}
          onEnter={(muted) => {
            setStartedMuted(muted);
            setStarted(true);
          }}
        />
      )}
      {started && <MuteButton audioRef={audioRef} initialMuted={startedMuted} />}
    </>
  );
}
