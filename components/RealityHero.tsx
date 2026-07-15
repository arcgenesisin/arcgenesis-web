"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MODES, MODE_INDEX, type ModeId } from "@/lib/modes";
import RealityField from "./RealityField";

const CYCLE_MS = 5600;

export default function RealityHero() {
  const [mode, setMode] = useState<ModeId>("site");
  const locked = useRef(false);
  const active = MODE_INDEX[mode];

  // slow auto-walk through the realities until the visitor takes the wheel
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (locked.current) return;
      setMode((m) => {
        const i = MODES.findIndex((x) => x.id === m);
        return MODES[(i + 1) % MODES.length].id;
      });
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  const choose = (id: ModeId) => {
    locked.current = true;
    setMode(id);
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-16">
      {/* base universe (transitions between mode colors) */}
      <div
        className="absolute inset-0 transition-colors duration-[1200ms]"
        style={{ backgroundColor: active.bgBase }}
      />
      {/* one glow per mode, crossfaded */}
      {MODES.map((m) => (
        <div
          key={m.id}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{
            opacity: m.id === mode ? 1 : 0,
            background: `radial-gradient(90% 65% at 50% 32%, ${m.glow}, transparent 70%)`,
          }}
        />
      ))}

      <RealityField mode={mode} />

      {/* content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <span className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted">
          ARC GENESIS
        </span>
        <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl">
          Ask the land itself.
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          Every plan, code, rate and record in India — folded into one
          conversation. Change the mode, and it answers from a different
          reality.
        </p>

        {/* the constant conversation */}
        <div className="mt-10 w-full max-w-xl">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-left backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm text-black">
                    {active.user}
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full transition-colors duration-700"
                    style={{
                      backgroundColor: `rgb(${active.color[0]},${active.color[1]},${active.color[2]})`,
                    }}
                  />
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {active.reply}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-xs text-muted/80">
            The same conversation — a different reality.
          </p>
        </div>

        {/* mode pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {MODES.map((m) => {
            const on = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() => choose(m.id)}
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-500 ${
                  on
                    ? "border-white/30 bg-white/10 text-foreground"
                    : "border-white/10 text-muted hover:border-white/25 hover:text-foreground"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: `rgb(${m.color[0]},${m.color[1]},${m.color[2]})`,
                    opacity: on ? 1 : 0.5,
                    transform: on ? "scale(1.4)" : "scale(1)",
                  }}
                />
                {m.label}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={mode + "-tag"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 text-xs text-muted"
          >
            {active.tag}
          </motion.p>
        </AnimatePresence>

        <div className="mt-9 flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Log in to start <span aria-hidden>→</span>
          </Link>
          <a
            href="#show"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-muted transition-colors hover:border-white/30 hover:text-foreground"
          >
            See it move
          </a>
        </div>
      </div>

      {/* settle into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
