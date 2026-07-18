"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// The closer: a plot draws itself and rises into a building, on a quiet loop —
// the same journey your first project will take.

const PLATE: [number, number][] = [
  [-30, -22],
  [26, -22],
  [26, 8],
  [6, 8],
  [6, 26],
  [-30, 26],
];

function drawLoop(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  // base sits low in the (tall) canvas: floors rise ~70u above it, ground
  // diamond falls ~38u below it -- cy at 0.66h keeps both inside the canvas.
  const cy = h * 0.66;
  const u = Math.min(w, h) / 150;
  const T = 9; // loop seconds
  const ph = (t % T) / T;
  const drawP = Math.min(1, ph / 0.3); // boundary draws
  const riseP = Math.min(1, Math.max(0, (ph - 0.28) / 0.4)); // floors rise
  const fade = ph > 0.86 ? 1 - (ph - 0.86) / 0.14 : 1;

  ctx.save();
  ctx.globalAlpha = fade;
  ctx.translate(cx, cy);

  const iso = (x: number, y: number, z: number): [number, number] => [
    (x - y) * 0.85 * u,
    (x + y) * 0.42 * u - z * u,
  ];

  // ground grid
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let g = -45; g <= 45; g += 15) {
    const [x1, y1] = iso(g, -45, 0);
    const [x2, y2] = iso(g, 45, 0);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    const [x3, y3] = iso(-45, g, 0);
    const [x4, y4] = iso(45, g, 0);
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
  }
  ctx.stroke();

  // plot boundary draws itself
  const seq = [...PLATE, PLATE[0]];
  let total = 0;
  const lens: number[] = [];
  for (let i = 0; i < seq.length - 1; i++) {
    const L = Math.hypot(seq[i + 1][0] - seq[i][0], seq[i + 1][1] - seq[i][1]);
    lens.push(L);
    total += L;
  }
  let budget = total * drawP;
  ctx.strokeStyle = "rgba(147,197,253,0.9)";
  ctx.lineWidth = 1.8;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  const [sx, sy] = iso(seq[0][0], seq[0][1], 0);
  ctx.moveTo(sx, sy);
  for (let i = 0; i < seq.length - 1 && budget > 0; i++) {
    const f = Math.min(1, budget / lens[i]);
    const nx = seq[i][0] + (seq[i + 1][0] - seq[i][0]) * f;
    const ny = seq[i][1] + (seq[i + 1][1] - seq[i][1]) * f;
    const [ix, iy] = iso(nx, ny, 0);
    ctx.lineTo(ix, iy);
    budget -= lens[i];
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // floors rise
  const floors = 6;
  const fh = 8;
  const visible = riseP * floors;
  for (let k = 0; k < floors; k++) {
    const fA = Math.min(1, Math.max(0, visible - k));
    if (fA <= 0) break;
    const z = (k + 1) * fh * (0.3 + 0.7 * fA);
    ctx.globalAlpha = fade * fA;
    ctx.fillStyle = k === floors - 1 ? "rgba(147,197,253,0.16)" : "rgba(99,102,241,0.09)";
    ctx.strokeStyle = "rgba(165,180,252,0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    PLATE.forEach(([x, y], i) => {
      const [ix, iy] = iso(x, y, z);
      if (i === 0) ctx.moveTo(ix, iy);
      else ctx.lineTo(ix, iy);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // corner sparks while drawing
  if (drawP < 1) {
    const sparkT = t * 3;
    PLATE.forEach(([x, y], i) => {
      const a = Math.sin(sparkT + i) * 0.5 + 0.5;
      const [ix, iy] = iso(x, y, 0);
      ctx.globalAlpha = fade * a * drawP;
      ctx.fillStyle = "rgba(191,219,254,0.9)";
      ctx.beginPath();
      ctx.arc(ix, iy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  ctx.restore();
}

function LoopCanvas() {
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
      visible = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const loop = (t: number) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        drawLoop(ctx, w, h, reduce ? 5.5 : t / 1000);
      }
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export default function SignupCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="relative mx-4 mt-32 mb-10 sm:mx-auto sm:max-w-6xl">
      {/* the rising building floats ABOVE the card — no clipping, it climbs out
          of the bounding box while the card itself stays a clean frame */}
      <div className="pointer-events-none absolute inset-x-0 -top-[230px] z-10 h-[500px]">
        <LoopCanvas />
      </div>
      <div className="relative rounded-[32px] border border-white/10 bg-[#04060f] pt-[250px] sm:pt-[270px]">
      <div ref={ref} className="relative px-6 pb-16 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          Let&apos;s start your first project.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-xl text-lg text-muted"
        >
          Bring a plot. We&apos;ll find it on the plan, read it against the
          code, and hand you the report. The first one is on us.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
          >
            Start your first project <span aria-hidden>→</span>
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-foreground hover:bg-white/5"
          >
            About the lab
          </Link>
        </motion.div>
        <p className="mt-5 text-xs text-muted">
          No card. One Google sign-in.
        </p>
      </div>
      </div>
    </section>
  );
}
