"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Site ambience. Deliberately restrained:
//   - OFF by default. Never autoplays with sound (browsers block it, and a
//     research lab that blares audio at a visitor reads as amateur).
//   - Remembers the choice; if it was on, it resumes on the visitor's first
//     interaction (the only moment a browser will permit playback).
//   - Fades in/out instead of cutting.
//   - Stays silent for anyone who asked for reduced motion.
// Track: "Deep Cinematic Ballad" by Grand_Project (Pixabay Content License,
// free for commercial use, attribution not required).

const KEY = "arc-ambience";
const TARGET = 0.32; // gentle: it sits under the page, never over it

export default function Ambience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  // fade the element's volume toward a target, then optionally pause
  const fadeTo = useCallback((to: number, done?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const step = (to - a.volume) / 18; // ~600ms at 33ms ticks
    fadeRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      const next = audioRef.current.volume + step;
      const finished = step > 0 ? next >= to : next <= to;
      audioRef.current.volume = Math.min(1, Math.max(0, finished ? to : next));
      if (finished) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        done?.();
      }
    }, 33);
  }, []);

  const start = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return false;
    a.volume = 0;
    try {
      await a.play();
      fadeTo(TARGET);
      return true;
    } catch {
      return false; // browser refused (no gesture yet)
    }
  }, [fadeTo]);

  const stop = useCallback(() => {
    fadeTo(0, () => audioRef.current?.pause());
  }, [fadeTo]);

  // mount: build the element, honour the remembered preference
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stay entirely out of the way

    const a = new Audio("/audio/ambience.mp3");
    a.loop = true;
    a.preload = "none"; // don't spend a visitor's data until they ask for it
    a.volume = 0;
    audioRef.current = a;
    setReady(true);

    const wanted = window.localStorage.getItem(KEY) === "on";
    if (!wanted) return;

    // Resume only on the first real interaction — the one moment browsers allow it.
    let armed = true;
    const resume = async () => {
      if (!armed) return;
      armed = false;
      const ok = await start();
      if (ok) setOn(true);
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll"];
    events.forEach((e) => window.addEventListener(e, resume, { once: true, passive: true }));

    return () => {
      armed = false;
      events.forEach((e) => window.removeEventListener(e, resume));
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      a.pause();
      audioRef.current = null;
    };
  }, [start]);

  const toggle = async () => {
    if (on) {
      stop();
      setOn(false);
      window.localStorage.setItem(KEY, "off");
      return;
    }
    const ok = await start();
    if (ok) {
      setOn(true);
      window.localStorage.setItem(KEY, "on");
    }
  };

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Turn ambience off" : "Turn ambience on"}
      aria-pressed={on}
      title={on ? "Sound on" : "Sound off"}
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/50 text-foreground/80 backdrop-blur-md transition-all hover:border-white/35 hover:text-foreground"
    >
      {/* three bars: still when off, breathing when on */}
      <span className="flex items-end gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-current"
            style={{
              height: on ? undefined : 7,
              animation: on ? `arcbar 1.1s ease-in-out ${i * 0.18}s infinite` : undefined,
            }}
          />
        ))}
      </span>
      <style>{`@keyframes arcbar{0%,100%{height:5px}50%{height:13px}}`}</style>
    </button>
  );
}
