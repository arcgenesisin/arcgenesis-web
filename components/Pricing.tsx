"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Tier = {
  name: string;
  price: number;
  cadence: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  accent: string;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: 500,
    cadence: "/ month",
    blurb: "Ask the regulation anything.",
    features: [
      "Unlimited conversation about rules & codes",
      "1 full plot assessment free, per Google account",
      "Every mode, single run",
    ],
    cta: "Start for ₹500",
    accent: "99,102,241",
  },
  {
    name: "Professional",
    price: 2000,
    cadence: "/ month",
    blurb: "For the practitioner with live files.",
    features: [
      "10 projects a month",
      "Site potential · valuation · title search",
      "Downloadable reports",
      "Priority processing",
    ],
    highlight: true,
    cta: "Get Professional",
    accent: "129,140,248",
  },
  {
    name: "Studio",
    price: 10000,
    cadence: "/ month",
    blurb: "For firms moving volume.",
    features: [
      "100 projects a month",
      "Everything in Professional",
      "Team workspace",
      "Bulk / batch runs",
    ],
    cta: "Get Studio",
    accent: "56,189,248",
  },
];

function useCountUp(target: number, go: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const f = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - f, 3);
      setV(Math.round(target * e));
      if (f < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, target, ms]);
  return v;
}

function TierCard({ t, i, inView }: { t: Tier; i: number; inView: boolean }) {
  const price = useCountUp(t.price, inView);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 180, damping: 20 });
  const rY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        className={`group relative flex h-full flex-col rounded-3xl border p-7 transition-colors ${
          t.highlight
            ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-transparent"
            : "border-white/10 bg-card hover:border-white/20"
        }`}
      >
        {/* living glow that follows the pointer */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [mx, my],
              ([x, y]: number[]) =>
                `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, rgba(${t.accent},0.13), transparent 65%)`,
            ),
          }}
        />
        {t.highlight && (
          <>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background:
                  "conic-gradient(from var(--ring,0deg), rgba(129,140,248,0), rgba(129,140,248,0.5), rgba(56,189,248,0.4), rgba(129,140,248,0))",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
              }}
              animate={{ ["--ring" as string]: ["0deg", "360deg"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <span className="mb-4 w-fit rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
              Most chosen
            </span>
          </>
        )}

        <h3 className="text-lg font-semibold">{t.name}</h3>
        <p className="mt-1 text-sm text-muted">{t.blurb}</p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-muted">{t.cadence}</span>
        </div>

        <Link
          href="/request-access"
          className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
            t.highlight
              ? "bg-white text-black"
              : "border border-white/15 text-foreground hover:bg-white/5"
          }`}
        >
          {t.cta}
        </Link>

        <ul className="mt-7 space-y-3 text-sm">
          {t.features.map((f, fi) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.14 + fi * 0.08, duration: 0.5 }}
              className="flex gap-2.5 text-muted"
            >
              <span className="mt-0.5 text-accent">✓</span>
              <span>{f}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
            Enter at any depth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            One product, priced by how much land you put through it. The first
            plot assessment is free with a Google sign-in.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <TierCard key={t.name} t={t} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
