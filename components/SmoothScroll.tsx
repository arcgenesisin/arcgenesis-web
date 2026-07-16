"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Buttery scroll — the rail the whole film runs on.
// Skipped entirely under prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.35,
      // slower travel per gesture: the films reveal instead of flashing past
      wheelMultiplier: 0.75,
      touchMultiplier: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
