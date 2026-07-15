import type { DrawFn } from "./Scene";
import { chip, ease, easeOut, inr, lerp, range, rr } from "./helpers";

// The Report reality: a potential report assembles itself.
// Act 1 — the 2D floor plate draws. Act 2 — it extrudes into a 3D massing.
// Act 3 — the money resolves.

// L-shaped footprint in local units (0..100)
const PLATE: [number, number][] = [
  [16, 18],
  [72, 18],
  [72, 48],
  [52, 48],
  [52, 78],
  [16, 78],
];
// interior walls
const INNER: [number, number][][] = [
  [
    [16, 48],
    [52, 48],
  ],
  [
    [38, 18],
    [38, 78],
  ],
];

function pathLen(pts: [number, number][], closed: boolean): number {
  let L = 0;
  for (let i = 0; i < pts.length - 1; i++)
    L += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
  if (closed)
    L += Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]);
  return L;
}

function drawPartial(
  ctx: CanvasRenderingContext2D,
  pts: [number, number][],
  frac: number,
  closed: boolean,
) {
  if (frac <= 0) return;
  const total = pathLen(pts, closed) * Math.min(1, frac);
  const seq = closed ? [...pts, pts[0]] : pts;
  let run = 0;
  ctx.beginPath();
  ctx.moveTo(seq[0][0], seq[0][1]);
  for (let i = 0; i < seq.length - 1; i++) {
    const d = Math.hypot(seq[i + 1][0] - seq[i][0], seq[i + 1][1] - seq[i][1]);
    if (run + d <= total) {
      ctx.lineTo(seq[i + 1][0], seq[i + 1][1]);
      run += d;
    } else {
      const f = (total - run) / d;
      ctx.lineTo(
        lerp(seq[i][0], seq[i + 1][0], f),
        lerp(seq[i][1], seq[i + 1][1], f),
      );
      break;
    }
  }
  ctx.stroke();
}

// isometric projection of footprint point at height z
function iso(x: number, y: number, z: number): [number, number] {
  return [(x - y) * 0.82, (x + y) * 0.42 - z];
}

export const drawReport: DrawFn = (ctx, w, h, p, t, mobile) => {
  const a1 = ease(range(p, 0.04, 0.3)); // plan draws
  const a2 = ease(range(p, 0.3, 0.62)); // extrusion
  const a3 = ease(range(p, 0.58, 0.9)); // financials

  const u = Math.min(w, h) / (mobile ? 130 : 150); // local unit
  const cy = h * (mobile ? 0.34 : 0.42);
  // on phones the acts replace each other (cinema cut), on desktop they coexist
  const actFade = mobile ? 1 - ease(range(p, 0.56, 0.7)) : 1;

  // ---------- Act 1: the 2D plate ----------
  const planX = mobile ? w * 0.5 - 47 * u * 0.5 : w * 0.24 - 44 * u * 0.5;
  const planY = cy - 48 * u * 0.5;
  ctx.save();
  ctx.globalAlpha = actFade;
  ctx.translate(planX, planY);
  ctx.scale(u, u);
  ctx.lineWidth = 1.4 / u;

  // grid paper under the plan
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  for (let x = 8; x <= 80; x += 8) {
    ctx.moveTo(x, 10);
    ctx.lineTo(x, 86);
  }
  for (let y = 10; y <= 86; y += 8) {
    ctx.moveTo(8, y);
    ctx.lineTo(80, y);
  }
  ctx.stroke();

  ctx.strokeStyle = `rgba(147,197,253,${0.4 + a1 * 0.6})`;
  ctx.lineWidth = 2.4 / u;
  drawPartial(ctx, PLATE, a1 * 1.15, true);
  ctx.lineWidth = 1.2 / u;
  ctx.strokeStyle = `rgba(147,197,253,${a1 * 0.5})`;
  for (const wall of INNER) drawPartial(ctx, wall, range(a1, 0.55, 1), false);

  // dims
  if (a1 > 0.75) {
    const da = range(a1, 0.75, 1);
    ctx.font = `500 ${11 / u}px ui-monospace, monospace`;
    ctx.fillStyle = `rgba(255,255,255,${da * 0.7})`;
    ctx.textAlign = "center";
    ctx.fillText("42.0 m", 44, 12);
    ctx.save();
    ctx.translate(11, 48);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("38.5 m", 0, 0);
    ctx.restore();
  }
  ctx.restore();

  chip(
    ctx,
    planX + 44 * u * 0.5,
    planY + 48 * u + 26,
    "2D · floor plate generated",
    "#bfdbfe",
    "rgba(23,37,84,0.85)",
    range(a1, 0.85, 1) * (mobile ? 1 - a2 : 1),
    mobile ? 10 : 11,
  );

  // ---------- Act 2: the 3D massing ----------
  const floors = 8;
  const fh = 7.5; // floor height in local units
  const mx = mobile ? w * 0.5 : w * 0.62;
  const my = mobile ? h * 0.62 : cy + 30 * u * 0.42 + 40;
  if (a2 > 0.01 && (!mobile || a2 > 0.05)) {
    ctx.save();
    ctx.globalAlpha = actFade;
    ctx.translate(mx, my);
    const mu = u * (mobile ? 0.62 : 0.78);
    ctx.scale(mu, mu);
    ctx.lineWidth = 1.1 / mu;

    const visible = a2 * floors;
    for (let k = 0; k < floors; k++) {
      const fA = Math.min(1, Math.max(0, visible - k));
      if (fA <= 0) break;
      const rise = easeOut(fA);
      const z = k * fh * rise + (1 - rise) * -4;
      const top = k * fh + fh;
      // slab outline at this level
      ctx.globalAlpha = fA * actFade;
      ctx.fillStyle = k === floors - 1 ? "rgba(147,197,253,0.2)" : "rgba(99,102,241,0.10)";
      ctx.strokeStyle = "rgba(165,180,252,0.65)";
      ctx.beginPath();
      PLATE.forEach(([x, y], i) => {
        const [ix, iy] = iso(x - 44, y - 48, z);
        if (i === 0) ctx.moveTo(ix, iy);
        else ctx.lineTo(ix, iy);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // verticals on last frame of each floor
      if (fA > 0.9 && top) {
        ctx.strokeStyle = "rgba(165,180,252,0.25)";
        for (const [x, y] of PLATE) {
          const [ix1, iy1] = iso(x - 44, y - 48, z);
          const [ix2, iy2] = iso(x - 44, y - 48, Math.max(0, z - fh));
          ctx.beginPath();
          ctx.moveTo(ix1, iy1);
          ctx.lineTo(ix2, iy2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = actFade;
    }
    ctx.restore();

    chip(
      ctx,
      mx,
      my + 36,
      "3D · G+7 · 24.5 m",
      "#c7d2fe",
      "rgba(30,35,70,0.85)",
      range(a2, 0.9, 1) * actFade,
      mobile ? 10 : 11,
    );
  }

  // ---------- Act 3: the money ----------
  if (a3 > 0.01) {
    const cw = mobile ? Math.min(w - 48, 320) : 300;
    const chh = mobile ? 190 : 210;
    const cxr = mobile ? w / 2 - cw / 2 : w * 0.62 + 120;
    // phone: the card takes center stage as the earlier acts fade out
    const cyr = mobile ? h * 0.36 - chh / 2 : cy - chh / 2 - 20;
    const slide = (1 - a3) * 30;

    ctx.save();
    ctx.globalAlpha = a3;
    ctx.translate(0, slide);
    ctx.fillStyle = "rgba(8,10,20,0.82)";
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    rr(ctx, cxr, cyr, cw, chh, 14);
    ctx.fill();
    ctx.stroke();

    ctx.font = "600 11px ui-monospace, monospace";
    ctx.fillStyle = "rgba(148,163,184,0.9)";
    ctx.textAlign = "left";
    ctx.fillText("POTENTIAL REPORT — DRAFT", cxr + 18, cyr + 26);

    const rows: [string, string][] = [
      ["Permissible FSI", (1.65 * a3).toFixed(2)],
      ["Buildable-up area", Math.round(3040 * a3).toLocaleString("en-IN") + " m²"],
      ["Saleable area", Math.round(2590 * a3).toLocaleString("en-IN") + " m²"],
      ["GDV", inr(414000000 * a3)],
      ["Cost to build", inr(228000000 * a3)],
    ];
    ctx.font = "500 12px ui-sans-serif, system-ui, sans-serif";
    rows.forEach(([k, v], i) => {
      const yy = cyr + 52 + i * 24;
      ctx.fillStyle = "rgba(148,163,184,0.85)";
      ctx.textAlign = "left";
      ctx.fillText(k, cxr + 18, yy);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.textAlign = "right";
      ctx.fillText(v, cxr + cw - 18, yy);
    });
    // margin bar
    const bw = cw - 36;
    const yy = cyr + chh - 32;
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    rr(ctx, cxr + 18, yy, bw, 8, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(52,211,153,0.9)";
    rr(ctx, cxr + 18, yy, bw * 0.31 * a3, 8, 4);
    ctx.fill();
    ctx.font = "600 11px ui-monospace, monospace";
    ctx.fillStyle = "rgba(52,211,153,0.95)";
    ctx.textAlign = "left";
    ctx.fillText(`MARGIN ${(31 * a3).toFixed(0)}%`, cxr + 18, yy + 24);
    ctx.restore();
  }

  // faint pulse tying the acts together
  const beam = Math.sin(t * 1.2) * 0.5 + 0.5;
  ctx.fillStyle = `rgba(99,102,241,${0.03 + beam * 0.02})`;
  ctx.fillRect(0, 0, w, h);
};
