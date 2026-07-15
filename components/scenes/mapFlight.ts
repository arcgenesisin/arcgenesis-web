import type { DrawFn } from "./Scene";
import { chip, ease, label, lerp, range, seeded } from "./helpers";

// The Map reality: a flight over the Mumbai–Pune region on our georeferenced
// plan layer — city networks resolve, DP overlays light up, airport OLS
// funnels rise. World space is 1000 × 600.

type Seg = { x1: number; y1: number; x2: number; y2: number };
type Patch = { pts: [number, number][]; color: string };

function genCity(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  n: number,
  seed: number,
): Seg[] {
  const rnd = seeded(seed);
  const segs: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2;
    const rf = Math.sqrt(rnd());
    const x = cx + Math.cos(a) * rx * rf;
    const y = cy + Math.sin(a) * ry * rf;
    const horiz = rnd() > 0.5;
    const len = 6 + rnd() * 18;
    segs.push(
      horiz
        ? { x1: x - len / 2, y1: y, x2: x + len / 2, y2: y }
        : { x1: x, y1: y - len / 2, x2: x, y2: y + len / 2 },
    );
  }
  return segs;
}

function genPatches(
  cx: number,
  cy: number,
  spread: number,
  n: number,
  seed: number,
): Patch[] {
  const rnd = seeded(seed);
  const colors = [
    "rgba(245,166,90,0.20)", // residential amber
    "rgba(79,139,255,0.20)", // commercial blue
    "rgba(52,211,153,0.16)", // green / open
    "rgba(244,114,182,0.16)", // reservation rose
  ];
  const out: Patch[] = [];
  for (let i = 0; i < n; i++) {
    const px = cx + (rnd() - 0.5) * spread * 2;
    const py = cy + (rnd() - 0.5) * spread * 1.3;
    const w = 12 + rnd() * 26;
    const h = 10 + rnd() * 20;
    const sk = (rnd() - 0.5) * 8;
    out.push({
      pts: [
        [px, py],
        [px + w, py + sk],
        [px + w - sk * 0.4, py + h],
        [px - sk * 0.4, py + h - sk],
      ],
      color: colors[Math.floor(rnd() * colors.length)],
    });
  }
  return out;
}

// ---- static world (built once) -------------------------------------------
const CITY = {
  mumbai: { x: 205, y: 300 },
  navi: { x: 292, y: 322 },
  pune: { x: 660, y: 375 },
};
const mumbaiSegs = genCity(CITY.mumbai.x, CITY.mumbai.y, 34, 118, 120, 11);
const naviSegs = genCity(CITY.navi.x, CITY.navi.y, 52, 62, 80, 22);
const puneSegs = genCity(CITY.pune.x, CITY.pune.y, 82, 60, 130, 33);
const mumbaiPatches = genPatches(CITY.mumbai.x, CITY.mumbai.y - 20, 34, 9, 44);
const naviPatches = genPatches(CITY.navi.x, CITY.navi.y, 40, 8, 55);
const punePatches = genPatches(CITY.pune.x, CITY.pune.y, 55, 11, 66);

const EXPRESSWAY: [number, number][] = [
  [228, 330],
  [300, 344],
  [382, 352],
  [470, 358],
  [562, 366],
  [660, 375],
];

const AIRPORTS = [
  { x: 238, y: 282, heading: -0.5, name: "BOM" },
  { x: 322, y: 348, heading: 0.4, name: "NMIA" },
  { x: 692, y: 352, heading: 0.15, name: "PNQ" },
];

// camera keyframes: [p, cx, cy, zoom]
const CAM: [number, number, number, number][] = [
  [0.0, 430, 330, 1.0],
  [0.2, 212, 298, 2.6],
  [0.4, 268, 320, 2.1],
  [0.6, 470, 352, 1.85],
  [0.8, 660, 372, 2.4],
  [1.0, 445, 338, 1.02],
];

function camera(p: number): [number, number, number] {
  for (let i = 0; i < CAM.length - 1; i++) {
    const [p0, x0, y0, z0] = CAM[i];
    const [p1, x1, y1, z1] = CAM[i + 1];
    if (p <= p1 || i === CAM.length - 2) {
      const t = ease(range(p, p0, p1));
      return [lerp(x0, x1, t), lerp(y0, y1, t), lerp(z0, z1, t)];
    }
  }
  return [430, 330, 1];
}

function drawFunnel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  heading: number,
  a: number,
  t: number,
) {
  if (a <= 0.01) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(heading);
  const L = 85;
  const spread = 0.22;
  // funnel edges
  ctx.strokeStyle = `rgba(255,120,90,${0.55 * a})`;
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(spread) * L, Math.sin(spread) * L);
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(-spread) * L, Math.sin(-spread) * L);
  ctx.stroke();
  // cross arcs, pulsing outward
  for (let i = 0; i < 3; i++) {
    const rr = ((t * 14 + i * (L / 3)) % L) + 6;
    ctx.strokeStyle = `rgba(255,120,90,${(0.5 - (rr / L) * 0.4) * a})`;
    ctx.beginPath();
    ctx.arc(0, 0, rr, -spread, spread);
    ctx.stroke();
  }
  // runway bar
  ctx.strokeStyle = `rgba(255,255,255,${0.8 * a})`;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-7, 0);
  ctx.lineTo(7, 0);
  ctx.stroke();
  ctx.restore();
}

function drawSegs(
  ctx: CanvasRenderingContext2D,
  segs: Seg[],
  a: number,
  color: string,
) {
  if (a <= 0.01) return;
  ctx.strokeStyle = color;
  ctx.globalAlpha = a;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  for (const s of segs) {
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawPatches(ctx: CanvasRenderingContext2D, patches: Patch[], a: number) {
  if (a <= 0.01) return;
  ctx.globalAlpha = a;
  for (const pt of patches) {
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.moveTo(pt.pts[0][0], pt.pts[0][1]);
    for (let i = 1; i < pt.pts.length; i++) ctx.lineTo(pt.pts[i][0], pt.pts[i][1]);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export const drawMapFlight: DrawFn = (ctx, w, h, p, t, mobile) => {
  const s = Math.min(w / 1000, h / 600) * (mobile ? 1.25 : 1.05);
  const [cx, cy, zoom] = camera(p);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(s * zoom, s * zoom);
  ctx.translate(-cx, -cy);
  const inv = 1 / (s * zoom); // screen-constant sizes

  // ---- sea + coast ----
  const coast: [number, number][] = [];
  for (let y = 80; y <= 560; y += 14) coast.push([150 + Math.sin(y * 0.025) * 12, y]);
  ctx.fillStyle = "rgba(79,139,255,0.06)";
  ctx.beginPath();
  ctx.moveTo(40, 60);
  for (const [x, y] of coast) ctx.lineTo(x, y);
  ctx.lineTo(40, 580);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(79,139,255,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const [x, y] of coast) ctx.lineTo(x, y);
  ctx.stroke();

  // ---- ghost terrain grid ----
  ctx.strokeStyle = "rgba(255,255,255,0.035)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  for (let x = 100; x <= 900; x += 50) {
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 560);
  }
  for (let y = 100; y <= 560; y += 50) {
    ctx.moveTo(100, y);
    ctx.lineTo(900, y);
  }
  ctx.stroke();

  // ---- reveal phases ----
  const seeMumbai = ease(range(p, 0.08, 0.2));
  const seeNavi = ease(range(p, 0.28, 0.42));
  const seePune = ease(range(p, 0.62, 0.8));
  const seeAll = ease(range(p, 0.84, 0.98));

  // expressway — the corridor between the cities
  const exwy = ease(range(p, 0.4, 0.66));
  if (exwy > 0.01) {
    ctx.strokeStyle = `rgba(138,180,255,${0.35 + exwy * 0.45})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 7]);
    ctx.lineDashOffset = -t * 26;
    ctx.beginPath();
    ctx.moveTo(EXPRESSWAY[0][0], EXPRESSWAY[0][1]);
    // draw partially along the polyline as it "builds"
    const total = EXPRESSWAY.length - 1;
    const upto = exwy * total;
    for (let i = 1; i <= total; i++) {
      if (i <= upto) ctx.lineTo(EXPRESSWAY[i][0], EXPRESSWAY[i][1]);
      else {
        const f = upto - (i - 1);
        if (f > 0)
          ctx.lineTo(
            lerp(EXPRESSWAY[i - 1][0], EXPRESSWAY[i][0], f),
            lerp(EXPRESSWAY[i - 1][1], EXPRESSWAY[i][1], f),
          );
        break;
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // city road networks
  drawSegs(ctx, mumbaiSegs, seeMumbai * 0.85, "rgba(160,180,255,0.5)");
  drawSegs(ctx, naviSegs, Math.max(seeNavi, seeAll * 0.7) * 0.8, "rgba(160,180,255,0.45)");
  drawSegs(ctx, puneSegs, Math.max(seePune, seeAll * 0.7) * 0.85, "rgba(160,180,255,0.5)");

  // pune ring roads
  if (seePune > 0.01) {
    ctx.strokeStyle = `rgba(160,180,255,${seePune * 0.4})`;
    ctx.lineWidth = 0.9;
    for (const k of [0.55, 0.95]) {
      ctx.beginPath();
      ctx.ellipse(CITY.pune.x, CITY.pune.y, 82 * k, 60 * k, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // DP overlays light up after each city resolves
  drawPatches(ctx, mumbaiPatches, ease(range(p, 0.16, 0.26)));
  drawPatches(ctx, naviPatches, ease(range(p, 0.36, 0.48)));
  drawPatches(ctx, punePatches, ease(range(p, 0.72, 0.84)));

  // airport OLS funnels
  drawFunnel(ctx, AIRPORTS[0].x, AIRPORTS[0].y, AIRPORTS[0].heading, ease(range(p, 0.2, 0.3)), t);
  drawFunnel(ctx, AIRPORTS[1].x, AIRPORTS[1].y, AIRPORTS[1].heading, ease(range(p, 0.42, 0.52)), t);
  drawFunnel(ctx, AIRPORTS[2].x, AIRPORTS[2].y, AIRPORTS[2].heading, ease(range(p, 0.78, 0.88)), t);

  // georef lock crosshair on the active city
  const locks: { x: number; y: number; w0: number; w1: number }[] = [
    { x: CITY.mumbai.x, y: CITY.mumbai.y, w0: 0.13, w1: 0.24 },
    { x: CITY.navi.x, y: CITY.navi.y, w0: 0.34, w1: 0.45 },
    { x: CITY.pune.x, y: CITY.pune.y, w0: 0.68, w1: 0.8 },
  ];
  for (const L of locks) {
    const lp = range(p, L.w0, L.w1);
    if (lp > 0 && lp < 1) {
      const rr = lerp(70, 16, ease(lp)) * inv * (mobile ? 32 : 46);
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * Math.sin(lp * Math.PI)})`;
      ctx.lineWidth = 1.2 * inv;
      ctx.beginPath();
      ctx.arc(L.x, L.y, rr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(L.x - rr * 1.35, L.y);
      ctx.lineTo(L.x - rr * 0.65, L.y);
      ctx.moveTo(L.x + rr * 0.65, L.y);
      ctx.lineTo(L.x + rr * 1.35, L.y);
      ctx.moveTo(L.x, L.y - rr * 1.35);
      ctx.lineTo(L.x, L.y - rr * 0.65);
      ctx.moveTo(L.x, L.y + rr * 0.65);
      ctx.lineTo(L.x, L.y + rr * 1.35);
      ctx.stroke();
    }
  }

  // ---- screen-constant text (labels + chips): size n screen-px in world units
  const px = (n: number) => n * inv;

  label(ctx, CITY.mumbai.x, CITY.mumbai.y - 130, "MUMBAI", "rgba(255,255,255,0.85)", seeMumbai, px(mobile ? 10 : 12), px(3));
  label(ctx, CITY.navi.x, CITY.navi.y - 72, "NAVI MUMBAI", "rgba(255,255,255,0.8)", Math.max(seeNavi, seeAll * 0.8), px(mobile ? 9 : 11), px(3));
  label(ctx, CITY.pune.x, CITY.pune.y - 74, "PUNE", "rgba(255,255,255,0.85)", Math.max(seePune, seeAll * 0.8), px(mobile ? 10 : 12), px(3));

  chip(ctx, CITY.mumbai.x, CITY.mumbai.y + 128, "DP overlay · georeferenced ✓", "#c7d2fe", "rgba(30,35,70,0.85)", ease(range(p, 0.2, 0.26)) * (1 - range(p, 0.32, 0.38)), px(mobile ? 10 : 11));
  chip(ctx, AIRPORTS[1].x, AIRPORTS[1].y + 40, "OLS · approach funnel", "#fecaca", "rgba(70,25,25,0.85)", ease(range(p, 0.46, 0.52)) * (1 - range(p, 0.58, 0.64)), px(mobile ? 10 : 11));
  chip(ctx, CITY.pune.x, CITY.pune.y + 94, "Regional Plan · in force", "#c7d2fe", "rgba(30,35,70,0.85)", ease(range(p, 0.8, 0.86)) * (1 - range(p, 0.92, 0.97)), px(mobile ? 10 : 11));

  ctx.restore();
};
