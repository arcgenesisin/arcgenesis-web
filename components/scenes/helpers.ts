// Shared math + canvas helpers for the reality scenes.

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// progress p remapped to 0..1 over [a,b]
export const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// deterministic rng so scene geometry is stable frame to frame
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// small labelled chip, centered on (x,y); returns nothing
export function chip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  fg: string,
  bg: string,
  alpha = 1,
  fs = 11,
) {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `500 ${fs}px ui-sans-serif, system-ui, sans-serif`;
  const w = ctx.measureText(text).width + fs * 1.6;
  const h = fs * 2.1;
  ctx.fillStyle = bg;
  rr(ctx, x - w / 2, y - h / 2, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y + fs * 0.04);
  ctx.restore();
}

export function label(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string,
  alpha = 1,
  fs = 11,
  tracking = 2,
) {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `600 ${fs}px ui-monospace, monospace`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // simple letter-spacing
  const chars = text.split("");
  const widths = chars.map((c) => ctx.measureText(c).width + tracking);
  const total = widths.reduce((a, b) => a + b, 0) - tracking;
  let cx = x - total / 2;
  chars.forEach((c, i) => {
    ctx.fillText(c, cx + widths[i] / 2, y);
    cx += widths[i];
  });
  ctx.restore();
}

export const inr = (v: number) => "₹" + Math.round(v).toLocaleString("en-IN");
