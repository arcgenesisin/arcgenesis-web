"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Site ambience. Deliberately restrained:
//   - OFF by default. Never autoplays with sound (browsers block it, and a
//     research lab that blares audio at a visitor reads as amateur).
//   - Remembers the choice; if it was on, it resumes on the visitor's first
//     interaction, and keeps listening until playback actually succeeds
//     (iOS refuses a scroll, so one failed try must not disarm us).
//   - Volume runs through a Web Audio gain node, because iOS Safari ignores
//     HTMLAudioElement.volume outright — without this, iPhones would play the
//     track at FULL volume with no fade.
//   - Stays silent entirely for anyone who asked for reduced motion.
// Track: "Deep Cinematic Ballad" by Grand_Project (Pixabay Content License,
// free for commercial use, attribution not required).

const KEY = "arc-ambience";
const TARGET = 0.32; // gentle: it sits under the page, never over it
const FADE = 0.7; // seconds

type Ctx = AudioContext & { resume: () => Promise<void> };

export default function Ambience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<Ctx | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const fallbackFade = useRef<number | null>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  // Build the gain graph lazily — an AudioContext may only be created/resumed
  // after a user gesture on iOS, so this runs on the first play, not on mount.
  const ensureGraph = useCallback((a: HTMLAudioElement) => {
    if (gainRef.current) return true;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return false; // no Web Audio: fall back to element volume
    try {
      const ctx = new AC() as Ctx;
      const src = ctx.createMediaElementSource(a); // same-origin, so this is allowed
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(gain).connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
      return true;
    } catch {
      return false;
    }
  }, []);

  // Ramp toward a target. Uses the gain node where possible (works on iOS),
  // otherwise steps element volume (fine everywhere else).
  const fadeTo = useCallback((to: number, done?: () => void) => {
    const g = gainRef.current;
    const ctx = ctxRef.current;
    if (g && ctx) {
      const now = ctx.currentTime;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.linearRampToValueAtTime(to, now + FADE);
      if (done) window.setTimeout(done, FADE * 1000 + 40);
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (fallbackFade.current) window.clearInterval(fallbackFade.current);
    const step = (to - a.volume) / 20;
    fallbackFade.current = window.setInterval(() => {
      const el = audioRef.current;
      if (!el) return;
      const next = el.volume + step;
      const finished = step > 0 ? next >= to : next <= to;
      el.volume = Math.min(1, Math.max(0, finished ? to : next));
      if (finished) {
        if (fallbackFade.current) window.clearInterval(fallbackFade.current);
        fallbackFade.current = null;
        done?.();
      }
    }, 35);
  }, []);

  const start = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return false;
    const graphed = ensureGraph(a);
    if (!graphed) a.volume = 0; // fallback path starts silent then ramps
    try {
      await ctxRef.current?.resume(); // iOS starts contexts suspended
      await a.play();
      fadeTo(TARGET);
      return true;
    } catch {
      return false; // refused (no valid gesture yet)
    }
  }, [ensureGraph, fadeTo]);

  const stop = useCallback(() => {
    fadeTo(0, () => audioRef.current?.pause());
  }, [fadeTo]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stay entirely out of the way

    const a = new Audio("/audio/ambience.mp3");
    a.loop = true;
    a.preload = "none"; // don't spend a visitor's data until they ask for it
    a.crossOrigin = "anonymous"; // keeps the media-element source usable
    a.volume = 1; // real level is controlled by the gain node
    audioRef.current = a;
    setReady(true);

    const wanted = window.localStorage.getItem(KEY) === "on";
    if (!wanted) return;

    // Keep listening until playback actually SUCCEEDS. On iOS a scroll is not a
    // valid gesture, so a first attempt there is refused — disarming on that
    // would strand a saved preference no matter how often the visitor tapped.
    let done = false;
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "touchend", // iOS counts the completed touch
      "click",
      "keydown",
      "scroll",
    ];
    const detach = () =>
      events.forEach((e) => window.removeEventListener(e, resume));
    async function resume() {
      if (done) return;
      const ok = await start();
      if (!ok) return; // stay armed for the next try
      done = true;
      detach();
      setOn(true);
    }
    events.forEach((e) => window.addEventListener(e, resume, { passive: true }));

    return () => {
      done = true;
      detach();
      if (fallbackFade.current) window.clearInterval(fallbackFade.current);
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
      type="button"
      onClick={toggle}
      aria-label={on ? "Turn ambience off" : "Turn ambience on"}
      aria-pressed={on}
      title={on ? "Sound on" : "Sound off"}
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-white/15 bg-black/50 text-foreground/80 backdrop-blur-md transition-all hover:border-white/35 hover:text-foreground"
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
