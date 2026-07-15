import type { DrawFn } from "./Scene";
import { chip, ease, inr, range, seeded } from "./helpers";

// The Valuation reality: a dozen forces of value fly in from the dark and
// are weighed into a single number — and each keeps its source.

const FACTORS = [
  { text: "ASR / circle rate", src: "IGR" },
  { text: "Comparable sales", src: "Index-II" },
  { text: "Permissible FSI", src: "DP + code" },
  { text: "Road width", src: "georef plan" },
  { text: "Zone / land use", src: "DP overlay" },
  { text: "Frontage & shape", src: "parcel" },
  { text: "Age & condition", src: "inspection" },
  { text: "Rent yield", src: "market" },
  { text: "TDR market", src: "quotes" },
  { text: "Construction cost", src: "CPWD" },
  { text: "Encumbrances", src: "title" },
  { text: "Corner premium", src: "rule" },
];

const rnd = seeded(77);
const META = FACTORS.map((f, i) => ({
  ...f,
  angle: (i / FACTORS.length) * Math.PI * 2 + rnd() * 0.4 - 0.2,
  curve: (rnd() - 0.5) * 1.6,
  t0: 0.06 + i * 0.042,
}));

export const drawValuation: DrawFn = (ctx, w, h, p, t, mobile) => {
  const cx = w / 2;
  const cy = h * (mobile ? 0.42 : 0.46);
  const R = Math.min(w, h) * (mobile ? 0.13 : 0.15); // weighing ring
  const D = Math.min(w, h) * (mobile ? 0.62 : 0.55); // start distance

  // ---- ambient rings ----
  for (let i = 1; i <= 3; i++) {
    ctx.strokeStyle = `rgba(52,211,153,${0.06 - i * 0.012})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R + i * 46 + Math.sin(t * 0.8 + i) * 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ---- inbound factors ----
  let arrived = 0;
  META.forEach((f) => {
    const fp = ease(range(p, f.t0, f.t0 + 0.26));
    if (fp >= 1) arrived++;
    if (fp <= 0 || fp >= 1) return;
    const sx = cx + Math.cos(f.angle) * D;
    const sy = cy + Math.sin(f.angle) * D * 0.8;
    const exx = cx + Math.cos(f.angle) * R;
    const eyy = cy + Math.sin(f.angle) * R * 0.9;
    // curved approach
    const mxx = (sx + exx) / 2 - Math.sin(f.angle) * 60 * f.curve;
    const myy = (sy + eyy) / 2 + Math.cos(f.angle) * 60 * f.curve;
    const u = 1 - fp;
    const x = u * u * sx + 2 * u * fp * mxx + fp * fp * exx;
    const y = u * u * sy + 2 * u * fp * myy + fp * fp * eyy;
    const alpha = Math.sin(fp * Math.PI);
    chip(ctx, x, y, f.text, "#d1fae5", "rgba(6,44,32,0.9)", alpha, mobile ? 10 : 12);
    // source tag rides under the chip
    ctx.save();
    ctx.globalAlpha = alpha * 0.75;
    ctx.font = "500 9px ui-monospace, monospace";
    ctx.fillStyle = "rgba(110,231,183,0.8)";
    ctx.textAlign = "center";
    ctx.fillText(f.src, x, y + (mobile ? 18 : 21));
    ctx.restore();
    // spark trail into the ring
    ctx.strokeStyle = `rgba(52,211,153,${alpha * 0.25})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(exx, eyy);
    ctx.stroke();
  });

  // ---- the weighing ring ----
  const ringPulse = 1 + Math.sin(t * 2.2) * 0.01 + (arrived / FACTORS.length) * 0.05;
  ctx.strokeStyle = "rgba(52,211,153,0.85)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(cx, cy, R * ringPulse, 0, Math.PI * 2);
  ctx.stroke();
  // arrival ticks around the ring
  META.forEach((f) => {
    const done = range(p, f.t0, f.t0 + 0.26) >= 1;
    if (!done) return;
    const ax = cx + Math.cos(f.angle) * R * ringPulse;
    const ay = cy + Math.sin(f.angle) * R * 0.9 * ringPulse;
    ctx.fillStyle = "rgba(110,231,183,0.9)";
    ctx.beginPath();
    ctx.arc(ax, ay, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // ---- the number ----
  const np = ease(range(p, 0.12, 0.78));
  const value = 31200000 * np; // ₹3.12 Cr
  const cr = value / 10000000;
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `600 ${mobile ? 34 : 46}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = `rgba(255,255,255,${0.35 + np * 0.65})`;
  ctx.fillText(`₹ ${cr.toFixed(2)} Cr`, cx, cy + (mobile ? 10 : 14));
  ctx.font = "500 11px ui-monospace, monospace";
  ctx.fillStyle = `rgba(110,231,183,${np * 0.9})`;
  ctx.fillText("MARKET VALUE", cx, cy - (mobile ? 28 : 36));
  ctx.restore();

  // confidence band + sourcing line, once weighed
  const done = ease(range(p, 0.78, 0.92));
  if (done > 0.01) {
    ctx.save();
    ctx.globalAlpha = done;
    ctx.textAlign = "center";
    ctx.font = "500 12px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "rgba(209,250,229,0.85)";
    ctx.fillText(`confidence band ± 4.2%`, cx, cy + R + 44);
    ctx.font = "500 11px ui-monospace, monospace";
    ctx.fillStyle = "rgba(110,231,183,0.7)";
    ctx.fillText(`${FACTORS.length} factors weighed · every one keeps its source`, cx, cy + R + 66);
    ctx.restore();

    chip(
      ctx,
      cx,
      cy + R + (mobile ? 96 : 100),
      inr(31200000) + " · draft report ready",
      "#d1fae5",
      "rgba(6,44,32,0.9)",
      range(done, 0.6, 1),
      mobile ? 10 : 12,
    );
  }
};
