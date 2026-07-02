"use client";

import { useEffect, useRef } from "react";

type Blob = {
  hue: [number, number, number];
  // Lissajous path params
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  px: number;
  py: number;
  cx: number;
  cy: number;
  r: number;
  pulse: number;
};

const BLOBS: Blob[] = [
  { hue: [99, 102, 241], ax: 0.22, ay: 0.16, fx: 0.11, fy: 0.14, px: 0, py: 1.7, cx: 0.28, cy: 0.3, r: 0.55, pulse: 0.09 },
  { hue: [79, 139, 255], ax: 0.2, ay: 0.2, fx: 0.09, fy: 0.13, px: 2.1, py: 0.4, cx: 0.72, cy: 0.28, r: 0.5, pulse: 0.11 },
  { hue: [139, 92, 246], ax: 0.24, ay: 0.18, fx: 0.13, fy: 0.1, px: 1.1, py: 3.0, cx: 0.5, cy: 0.68, r: 0.5, pulse: 0.1 },
  { hue: [56, 189, 248], ax: 0.16, ay: 0.14, fx: 0.16, fy: 0.12, px: 0.6, py: 2.2, cx: 0.32, cy: 0.7, r: 0.38, pulse: 0.12 },
];

export default function LiveBackground({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    const parent = canvas.parentElement!;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      // dark base
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, w, h);

      const time = t / 1000;
      const min = Math.min(w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const b of BLOBS) {
        const x = (b.cx + b.ax * Math.sin(time * b.fx + b.px)) * w;
        const y = (b.cy + b.ay * Math.sin(time * b.fy + b.py)) * h;
        const r = (b.r + b.pulse * Math.sin(time * 0.2 + b.px)) * min;
        const [rr, gg, bb] = b.hue;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rr},${gg},${bb},0.42)`);
        g.addColorStop(0.5, `rgba(${rr},${gg},${bb},0.14)`);
        g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(parent);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* fade the aurora into the page below */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
    </div>
  );
}
