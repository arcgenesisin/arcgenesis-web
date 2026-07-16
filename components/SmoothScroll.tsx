"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Buttery scroll — the rail the whole film runs on.
// Skipped entirely under prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Smooth the WHEEL only. Touch keeps the browser's native momentum —
    // taking over touch (syncTouch) locked desktop wheel scrolling, and the
    // phone films read fine on native momentum with the longer scene runways.
    const lenis = new Lenis({
      duration: 1.35,
      wheelMultiplier: 0.75,
      smoothWheel: true,
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
