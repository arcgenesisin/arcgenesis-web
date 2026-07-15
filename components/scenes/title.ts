import type { DrawFn } from "./Scene";
import { chip, ease, easeOut, lerp, range, rr, seeded } from "./helpers";

// The Title reality: one click — and every government record of the property
// flies in from its portal and reconciles into a single search report.

const RECORDS = [
  { name: "7/12 Extract", src: "mahabhulekh" },
  { name: "Mutation entries", src: "ferfar" },
  { name: "Sale deeds · 30 yrs", src: "IGR / SRO" },
  { name: "Encumbrance", src: "registration" },
  { name: "CTS sheet", src: "city survey" },
  { name: "Court search", src: "eCourts" },
  { name: "RERA filings", src: "MahaRERA" },
  { name: "Circle rate", src: "ASR" },
];

const rnd = seeded(31);
const META = RECORDS.map((r, i) => ({
  ...r,
  edge: i % 4, // 0 top 1 right 2 bottom 3 left
  off: 0.15 + rnd() * 0.7,
  rot: (rnd() - 0.5) * 0.5,
  t0: 0.22 + i * 0.05,
}));

function cardW(mobile: boolean) {
  return mobile ? 128 : 168;
}

export const drawTitle: DrawFn = (ctx, w, h, p, t, mobile) => {
  const cx = w / 2;
  const cy = h * (mobile ? 0.38 : 0.42);
  const CW = cardW(mobile);
  const CH = mobile ? 40 : 48;

  // ---------- Act 1: the click ----------
  const btnY = h * (mobile ? 0.66 : 0.68);
  const preClick = 1 - ease(range(p, 0.16, 0.24));
  if (preClick > 0.01) {
    ctx.save();
    ctx.globalAlpha = preClick;
    const bw = mobile ? 210 : 240;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    rr(ctx, cx - bw / 2, btnY - 22, bw, 44, 22);
    ctx.fill();
    ctx.fillStyle = "#0b0612";
    ctx.font = "600 14px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Search this property", cx, btnY + 1);
    ctx.restore();

    // the cursor approaches
    const cp = ease(range(p, 0.02, 0.16));
    const cxr = lerp(w * 0.86, cx + 8, cp);
    const cyr = lerp(h * 0.86, btnY + 6, cp);
    ctx.save();
    ctx.globalAlpha = preClick;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cxr, cyr);
    ctx.lineTo(cxr, cyr + 15);
    ctx.lineTo(cxr + 4.2, cyr + 11.5);
    ctx.lineTo(cxr + 7.4, cyr + 17.5);
    ctx.lineTo(cxr + 9.8, cyr + 16.2);
    ctx.lineTo(cxr + 6.6, cyr + 10.4);
    ctx.lineTo(cxr + 11.5, cyr + 9.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  // click ripple
  const rip = range(p, 0.17, 0.24);
  if (rip > 0 && rip < 1) {
    ctx.strokeStyle = `rgba(216,180,254,${(1 - rip) * 0.8})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, btnY, rip * 90, 0, Math.PI * 2);
    ctx.stroke();
  }

  // "one click" caption right after
  chip(ctx, cx, btnY, "that was the only click", "#e9d5ff", "rgba(45,20,70,0.9)", ease(range(p, 0.24, 0.3)) * (1 - range(p, 0.4, 0.48)), mobile ? 10 : 12);

  // ---------- Act 2: the records fly in ----------
  const merge = ease(range(p, 0.72, 0.86)); // stack → single report
  META.forEach((m, i) => {
    const fp = ease(range(p, m.t0, m.t0 + 0.2));
    if (fp <= 0) return;
    // start position on an edge
    let sx = 0,
      sy = 0;
    if (m.edge === 0) (sx = w * m.off), (sy = -60);
    if (m.edge === 1) (sx = w + 80), (sy = h * m.off);
    if (m.edge === 2) (sx = w * m.off), (sy = h + 60);
    if (m.edge === 3) (sx = -80), (sy = h * m.off);
    // stacked landing slot
    const slotX = cx + ((i % 2) * 2 - 1) * 7 * (1 - merge);
    const slotY = cy + (i - META.length / 2) * (mobile ? 7 : 8) * (1 - merge);
    const x = lerp(sx, slotX, fp);
    const y = lerp(sy, slotY, fp);
    const rot = m.rot * (1 - fp) + m.rot * 0.12 * (1 - merge);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = Math.min(1, fp * 1.4) * (1 - merge * 0.9);
    ctx.fillStyle = "rgba(20,12,32,0.92)";
    ctx.strokeStyle = "rgba(216,180,254,0.35)";
    ctx.lineWidth = 1;
    rr(ctx, -CW / 2, -CH / 2, CW, CH, 9);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${mobile ? 10 : 11.5}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillStyle = "rgba(243,232,255,0.95)";
    ctx.fillText(m.name, -CW / 2 + 12, -6);
    ctx.font = "500 9px ui-monospace, monospace";
    ctx.fillStyle = "rgba(192,132,252,0.8)";
    ctx.fillText(m.src, -CW / 2 + 12, mobile ? 9 : 11);
    // fetched tick
    if (fp >= 1) {
      ctx.fillStyle = "rgba(134,239,172,0.9)";
      ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("✓", CW / 2 - 10, 0);
    }
    ctx.restore();
  });

  // ---------- Act 3: one report ----------
  if (merge > 0.01) {
    const RW = mobile ? Math.min(w - 56, 290) : 330;
    const RH = mobile ? 168 : 190;
    const scale = lerp(0.86, 1, easeOut(merge));
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.globalAlpha = merge;
    ctx.fillStyle = "rgba(14,8,24,0.95)";
    ctx.strokeStyle = "rgba(216,180,254,0.5)";
    ctx.lineWidth = 1.2;
    rr(ctx, -RW / 2, -RH / 2, RW, RH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "600 11px ui-monospace, monospace";
    ctx.fillStyle = "rgba(216,180,254,0.9)";
    ctx.fillText("TITLE SEARCH REPORT", -RW / 2 + 20, -RH / 2 + 28);

    const rows: [string, string, string][] = [
      ["✓", "30-year chain traced — clean", "rgba(134,239,172,0.95)"],
      ["✓", "No litigation found", "rgba(134,239,172,0.95)"],
      ["✓", `${RECORDS.length} records reconciled`, "rgba(134,239,172,0.95)"],
      ["▲", "2 entries to verify at the SRO", "rgba(252,211,77,0.95)"],
    ];
    ctx.font = `500 ${mobile ? 11 : 12.5}px ui-sans-serif, system-ui, sans-serif`;
    rows.forEach(([ic, txt, col], i) => {
      const yy = -RH / 2 + 56 + i * (mobile ? 24 : 27);
      const rp = range(merge, 0.3 + i * 0.12, 0.55 + i * 0.12);
      ctx.globalAlpha = merge * ease(rp);
      ctx.fillStyle = col;
      ctx.fillText(ic, -RW / 2 + 20, yy);
      ctx.fillStyle = "rgba(243,232,255,0.9)";
      ctx.fillText(txt, -RW / 2 + 40, yy);
    });
    ctx.restore();

    chip(ctx, cx, cy + (mobile ? 118 : 132), "every source cited inside", "#e9d5ff", "rgba(45,20,70,0.9)", range(merge, 0.7, 1), mobile ? 10 : 12);
  }

  // ambient dust
  const rr2 = seeded(9);
  for (let i = 0; i < (mobile ? 20 : 36); i++) {
    const x = rr2() * w;
    const y = rr2() * h;
    const tw = Math.sin(t * 0.9 + i * 1.7) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(216,180,254,${0.05 + tw * 0.08})`;
    ctx.fillRect(x, y, 1.6, 1.6);
  }
};
