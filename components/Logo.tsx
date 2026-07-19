"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// The ARC GENESIS mark: three broken rings in orbit.
// Outer clockwise, middle counter-clockwise, inner clockwise — each ring
// rotates as one rigid body, so segments can never collide.
// Framer Motion drives the transforms (reliable across SVG renderers).

function pt(r: number, a: number): [number, number] {
  const rad = (a * Math.PI) / 180;
  return [50 + r * Math.sin(rad), 50 - r * Math.cos(rad)];
}
function arc(r: number, a1: number, a2: number): string {
  const [x1, y1] = pt(r, a1);
  const [x2, y2] = pt(r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

// Ring speed as a fraction of the previous cadence. 0.7 = 70% of the old
// speed, so each revolution takes 1/0.7 as long. One knob keeps all three
// rings in their relative rhythm (outer : middle : inner = 9 : 6 : 4).
const SPEED = 0.7;

const spin = (baseDur: number, dir: 1 | -1) => ({
  animate: { rotate: 360 * dir },
  transition: {
    duration: baseDur / SPEED,
    ease: "linear" as const,
    repeat: Infinity,
  },
  style: { transformBox: "view-box" as const, transformOrigin: "50px 50px" },
});

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="lg-o1" x1="10" y1="15" x2="45" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c026d3" />
          <stop offset="0.55" stopColor="#e11d78" />
          <stop offset="1" stopColor="#ef2d4e" />
        </linearGradient>
        <linearGradient id="lg-o2" x1="92" y1="25" x2="55" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6d28d9" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="lg-m1" x1="20" y1="20" x2="80" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff2d55" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="lg-m2" x1="82" y1="45" x2="35" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="lg-i1" x1="65" y1="30" x2="62" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lg-i2" x1="35" y1="72" x2="60" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff2d55" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* outer ring — clockwise */}
      <motion.g {...spin(9, 1)}>
        <path d={arc(41, -150, 60)} stroke="url(#lg-o1)" strokeWidth="9" strokeLinecap="round" />
        <path d={arc(41, 82, 188)} stroke="url(#lg-o2)" strokeWidth="9" strokeLinecap="round" />
      </motion.g>
      {/* middle ring — counter-clockwise */}
      <motion.g {...spin(6, -1)}>
        <path d={arc(28.5, -122, 30)} stroke="url(#lg-m1)" strokeWidth="9" strokeLinecap="round" />
        <path d={arc(28.5, 58, 208)} stroke="url(#lg-m2)" strokeWidth="9" strokeLinecap="round" />
      </motion.g>
      {/* inner ring — clockwise, fastest */}
      <motion.g {...spin(4, 1)}>
        <path d={arc(17, -28, 118)} stroke="url(#lg-i1)" strokeWidth="8" strokeLinecap="round" />
        <path d={arc(17, 148, 292)} stroke="url(#lg-i2)" strokeWidth="8" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <LogoMark />
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight">
          ARC GENESIS
        </span>
      )}
    </Link>
  );
}
