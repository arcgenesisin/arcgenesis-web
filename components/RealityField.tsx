"use client";

import { useEffect, useRef } from "react";
import { MODE_INDEX, type ModeId } from "@/lib/modes";

// One persistent particle field. Each mode is a formation; switching modes
// sends every particle on a curved flight to its place in the new reality.
// The field never unmounts — the atoms are constant, the universe changes.

type Particle = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  cxp: number; // bezier control
  cyp: number;
  delay: number;
  size: number;
  g: number; // group id (line/ring/chain) for structural strokes
  tw: number; // twinkle phase
};

type Pt = { x: number; y: number; g: number };

// ---- formations (normalized 0..1 coords) --------------------------------
function fAssistant(n: number): Pt[] {
  // concentric memory orbits
  const pts: Pt[] = [];
  const rings = [0.16, 0.26, 0.37];
  const share = [0.24, 0.34, 0.42];
  rings.forEach((r, ri) => {
    const count = Math.max(6, Math.floor(n * share[ri]));
    for (let i = 0; i < count && pts.length < n; i++) {
      const a = (i / count) * Math.PI * 2 + ri * 0.7;
      pts.push({ x: 0.5 + Math.cos(a) * r * 1.35, y: 0.5 + Math.sin(a) * r, g: ri });
    }
  });
  while (pts.length < n) pts.push({ x: 0.5, y: 0.5, g: 3 });
  return pts;
}

function fSite(n: number): Pt[] {
  // a street grid with a glowing plot
  const pts: Pt[] = [];
  const hs = [0.24, 0.42, 0.6, 0.78];
  const vs = [0.18, 0.38, 0.58, 0.8];
  const per = Math.floor((n * 0.88) / (hs.length + vs.length));
  let g = 0;
  for (const y of hs) {
    for (let i = 0; i < per && pts.length < n; i++)
      pts.push({ x: 0.08 + (i / (per - 1)) * 0.84, y: y + Math.sin(i * 1.7) * 0.006, g });
    g++;
  }
  for (const x of vs) {
    for (let i = 0; i < per && pts.length < n; i++)
      pts.push({ x: x + Math.sin(i * 2.1) * 0.004, y: 0.14 + (i / (per - 1)) * 0.74, g });
    g++;
  }
  // the plot: a small bright cluster
  const remaining = n - pts.length;
  for (let i = 0; i < remaining; i++) {
    const a = (i / remaining) * Math.PI * 2;
    pts.push({ x: 0.485 + Math.cos(a) * 0.035, y: 0.505 + Math.sin(a) * 0.05, g: 99 });
  }
  return pts;
}

function fValue(n: number): Pt[] {
  // a ledger: left-aligned rows of differing length
  const pts: Pt[] = [];
  const rows = 7;
  const lens = [0.62, 0.4, 0.74, 0.5, 0.66, 0.34, 0.55];
  const per = Math.floor(n / rows);
  for (let r = 0; r < rows; r++) {
    const y = 0.24 + (r / (rows - 1)) * 0.52;
    for (let i = 0; i < per && pts.length < n; i++)
      pts.push({ x: 0.16 + (i / (per - 1)) * lens[r], y, g: r });
  }
  while (pts.length < n) pts.push({ x: 0.16, y: 0.5, g: 0 });
  return pts;
}

function fTitle(n: number): Pt[] {
  // chains of title: linked columns descending through time
  const pts: Pt[] = [];
  const chains = [0.24, 0.37, 0.5, 0.63, 0.76];
  const per = Math.floor(n / chains.length);
  chains.forEach((x, ci) => {
    for (let i = 0; i < per && pts.length < n; i++) {
      const t = i / (per - 1);
      pts.push({ x: x + Math.sin(t * Math.PI * 2 + ci) * 0.022, y: 0.16 + t * 0.66, g: ci });
    }
  });
  while (pts.length < n) pts.push({ x: 0.5, y: 0.5, g: 0 });
  return pts;
}

const FORMS: Record<ModeId, (n: number) => Pt[]> = {
  assistant: fAssistant,
  site: fSite,
  value: fValue,
  title: fTitle,
};

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function RealityField({
  mode,
  className = "",
}: {
  mode: ModeId;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    particles: Particle[];
    color: [number, number, number];
    clock: number; // morph start (ms)
    retarget: (m: ModeId, instant: boolean) => void;
  } | null>(null);

  // init once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0,
      h = 0,
      raf = 0,
      running = true;
    const DUR = 750;

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

    const N = w < 640 ? 210 : 480;
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      sx: 0,
      sy: 0,
      tx: 0.5,
      ty: 0.5,
      cxp: 0.5,
      cyp: 0.5,
      delay: 0,
      size: 0.8 + Math.random() * 1.4,
      g: 0,
      tw: Math.random() * Math.PI * 2,
    }));

    const st = {
      particles,
      color: [...MODE_INDEX[mode].color] as [number, number, number],
      clock: -1e9,
      retarget(m: ModeId, instant: boolean) {
        const pts = FORMS[m](particles.length);
        particles.forEach((p, i) => {
          const t = pts[i % pts.length];
          p.sx = p.x;
          p.sy = p.y;
          p.tx = t.x;
          p.ty = t.y;
          p.g = t.g;
          // curved flight: control point pushed perpendicular off the line
          const mx = (p.sx + p.tx) / 2;
          const my = (p.sy + p.ty) / 2;
          const dx = p.tx - p.sx;
          const dy = p.ty - p.sy;
          const side = Math.random() > 0.5 ? 1 : -1;
          p.cxp = mx - dy * side * (0.25 + Math.random() * 0.3);
          p.cyp = my + dx * side * (0.25 + Math.random() * 0.3);
          p.delay = Math.random() * 320;
          if (instant) {
            p.x = t.x;
            p.y = t.y;
            p.delay = 0;
          }
        });
        st.clock = instant ? -1e9 : performance.now();
      },
    };
    stateRef.current = st;
    st.retarget(mode, true);

    const target = () => MODE_INDEX[modeRef.current].color;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      // color universe drifts toward the active mode
      const tc = target();
      st.color[0] += (tc[0] - st.color[0]) * 0.05;
      st.color[1] += (tc[1] - st.color[1]) * 0.05;
      st.color[2] += (tc[2] - st.color[2]) * 0.05;
      const [r, g, b] = st.color;

      const elapsed = now - st.clock;
      let settled = 1;

      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const e = easeInOut(Math.min(1, Math.max(0, (elapsed - p.delay) / DUR)));
        if (e < 1) {
          const u = 1 - e;
          p.x = u * u * p.sx + 2 * u * e * p.cxp + e * e * p.tx;
          p.y = u * u * p.sy + 2 * u * e * p.cyp + e * e * p.ty;
          settled = Math.min(settled, e);
        } else {
          // settled: breathe faintly in place
          p.x = p.tx + Math.sin(now / 2600 + p.tw) * 0.0022;
          p.y = p.ty + Math.cos(now / 3100 + p.tw) * 0.0022;
        }
        // the fold: light dips mid-flight
        const dip = 1 - 0.62 * Math.sin(Math.PI * Math.min(e, 0.999));
        const a = (0.35 + 0.3 * Math.sin(now / 1400 + p.tw)) * dip;
        const px = p.x * w;
        const py = p.y * h;
        const glow = p.g === 99 ? 1.9 : 1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a * glow)})`;
        ctx.arc(px, py, p.size * glow, 0, Math.PI * 2);
        ctx.fill();
      }

      // structural strokes appear once the formation has arrived
      const arrive = Math.max(0, (elapsed - 500) / 700);
      const lineA = Math.min(0.16, Math.max(0, arrive * 0.16));
      if (lineA > 0.005) {
        ctx.strokeStyle = `rgba(${r},${g},${b},${lineA})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let i = 0; i < particles.length - 1; i++) {
          const a1 = particles[i];
          const a2 = particles[i + 1];
          if (a1.g === a2.g && a1.g !== 99) {
            ctx.moveTo(a1.x * w, a1.y * h);
            ctx.lineTo(a2.x * w, a2.y * h);
          }
        }
        ctx.stroke();
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    if (reduce) {
      // single settled frame
      st.retarget(modeRef.current, true);
      draw(performance.now());
    }

    const ro = new ResizeObserver(() => resize());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // track current mode for the color loop + retarget on change
  const modeRef = useRef(mode);
  useEffect(() => {
    const first = modeRef.current === mode && stateRef.current?.clock === -1e9;
    modeRef.current = mode;
    if (!first) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stateRef.current?.retarget(mode, reduce);
    }
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
