"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// A reality scene: a tall scroll section whose sticky viewport plays a
// scroll-scrubbed canvas film. Entering and leaving passes through a dark
// veil — the teleport fold between realities.

export type DrawFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number, // scroll progress 0..1 through the scene
  t: number, // seconds, for ambient shimmer
  mobile: boolean,
) => void;

// Fraction of the scroll at which the film reaches its final frame.
// The rest of the travel is a HOLD — a soft lock: the finished scene stays
// fixed for ~a full viewport of scrolling, so a fast flick dies inside it
// and leaving a reality always takes a deliberate second scroll.
const HOLD = 0.62;

function SceneCanvas({
  progress,
  draw,
}: {
  progress: MotionValue<number>;
  draw: DrawFn;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0,
      h = 0,
      raf = 0,
      visible = true,
      running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const loop = (t: number) => {
      if (running && visible) {
        ctx.clearRect(0, 0, w, h);
        // the film completes at HOLD, then rests finished while the user reads
        const p = reduce ? 1 : Math.min(1, progress.get() / HOLD);
        draw(ctx, w, h, p, t / 1000, w < 640);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(parent);
    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [draw, progress]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export default function Scene({
  id,
  eyebrow,
  accent,
  title,
  sub,
  base,
  glow,
  draw,
}: {
  id?: string;
  eyebrow: string;
  accent: string;
  title: string;
  sub: string;
  base: string; // universe base color
  glow: string; // universe radial glow rgba
  draw: DrawFn;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // copy stays through the whole hold; the veil folds only at the very end
  const copyO = useTransform(scrollYProgress, [0.03, 0.11, 0.94, 0.995], [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.03, 0.11], [26, 0]);
  // the fold: dark veil at both thresholds of the reality
  const veil = useTransform(scrollYProgress, [0, 0.07, 0.965, 1], [1, 0, 0, 1]);
  const settle = useTransform(scrollYProgress, [0, 0.1], [1.045, 1]);

  return (
    <section id={id} ref={ref} className="relative" style={{ height: "340vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: base }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(90% 70% at 50% 35%, ${glow}, transparent 70%)`,
          }}
        />
        <motion.div className="absolute inset-0" style={{ scale: settle }}>
          <SceneCanvas progress={scrollYProgress} draw={draw} />
        </motion.div>

        {/* the words, low and quiet */}
        <motion.div
          style={{ opacity: copyO, y: copyY }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-7xl px-6 pb-10 sm:px-10 sm:pb-16"
        >
          <div className="max-w-xl">
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {sub}
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-20 bg-background"
        />
      </div>
    </section>
  );
}
