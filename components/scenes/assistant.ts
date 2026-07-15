import type { DrawFn } from "./Scene";
import { chip, ease, lerp, range, rr, seeded } from "./helpers";

// The ARC AI reality: one mind at the centre of your life's channels.
// Act 1 — the chats you already use connect to it.
// Act 2 — everything you send becomes orbiting memory.
// Act 3 — it does the work: fetches, schedules, answers from your own files.

const CHANNELS = [
  { name: "WhatsApp", color: "#25D366" },
  { name: "Instagram", color: "#E1306C" },
  { name: "Telegram", color: "#2AABEE" },
  { name: "Facebook", color: "#5B93FF" },
  { name: "X", color: "#E7E9EA" },
  { name: "Email", color: "#F59E0B" },
];

const MEMORIES = [
  "Sale deed.pdf",
  "Kharadi project",
  "Site photos",
  "IGR receipt",
  "Plan.dxf",
  "Meeting notes",
  "Loan sanction",
  "Survey map",
];

const TASKS = [
  "“Send the sale deed” → sent on WhatsApp ✓",
  "“Meet the CA this week” → Tue 4:00 PM ✓",
  "“What's pending on Kharadi?” → 3 items, from your files ✓",
];

const rnd = seeded(5);
const CH = CHANNELS.map((c, i) => ({
  ...c,
  angle: -Math.PI / 2 + (i / CHANNELS.length) * Math.PI * 2,
  t0: 0.04 + i * 0.035,
  pulseOff: rnd() * 10,
}));
const MEM = MEMORIES.map((m, i) => ({
  text: m,
  base: (i / MEMORIES.length) * Math.PI * 2 + rnd(),
  t0: 0.3 + i * 0.03,
  wobble: rnd() * Math.PI,
}));

export const drawAssistant: DrawFn = (ctx, w, h, p, t, mobile) => {
  const cx = w / 2;
  const cy = h * (mobile ? 0.36 : 0.44);
  const min = Math.min(w, h);
  const D = min * (mobile ? 0.42 : 0.4); // channel distance
  const R2 = min * (mobile ? 0.2 : 0.21); // memory orbit
  // phone cinema cut: channels + orbit hand the stage to the task cards
  const actFade = mobile ? 1 - ease(range(p, 0.6, 0.72)) : 1;

  // ---------- the core ----------
  const coreR = min * 0.055;
  const breathe = 1 + Math.sin(t * 1.6) * 0.03;
  // halo
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4);
  halo.addColorStop(0, "rgba(245,166,90,0.28)");
  halo.addColorStop(1, "rgba(245,166,90,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, coreR * 4, 0, Math.PI * 2);
  ctx.fill();
  // three rotating arcs — the mark itself, alive
  const arcs: [number, number, number][] = [
    [coreR * 1.0, t * 0.7, 4.2],
    [coreR * 1.45, -t * 0.5, 3.6],
    [coreR * 1.9, t * 0.34, 4.6],
  ];
  arcs.forEach(([r, rot, span], i) => {
    ctx.strokeStyle = `rgba(245,${180 - i * 20},${110 - i * 20},${0.85 - i * 0.18})`;
    ctx.lineWidth = 2.4 - i * 0.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r * breathe, rot, rot + span);
    ctx.stroke();
  });
  ctx.font = `600 ${mobile ? 10 : 11}px ui-monospace, monospace`;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ARC AI", cx, cy);

  // ---------- Act 1: the channels connect ----------
  CH.forEach((c) => {
    const fp = ease(range(p, c.t0, c.t0 + 0.12));
    if (fp <= 0) return;
    const nx = cx + Math.cos(c.angle) * D * 1.12;
    const ny = cy + Math.sin(c.angle) * D * (mobile ? 0.92 : 0.72);
    const exx = cx + Math.cos(c.angle) * coreR * 2.6;
    const eyy = cy + Math.sin(c.angle) * coreR * 2.2;

    // link draws from the channel toward the core
    ctx.save();
    ctx.globalAlpha = actFade;
    ctx.strokeStyle = `rgba(245,166,90,${0.28 * fp})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(lerp(nx, exx, fp), lerp(ny, eyy, fp));
    ctx.stroke();

    // memory pulses travel inward while the mind is being fed
    if (fp >= 1 && p < 0.62) {
      for (let k = 0; k < 2; k++) {
        const f = (t * 0.35 + c.pulseOff + k * 0.5) % 1;
        const px = lerp(nx, exx, f);
        const py = lerp(ny, eyy, f);
        ctx.fillStyle = `rgba(255,214,150,${0.9 - f * 0.6})`;
        rr(ctx, px - 3, py - 3.6, 6, 7.2, 1.5);
        ctx.fill();
      }
    }
    ctx.restore();

    // channel node
    ctx.save();
    ctx.globalAlpha = Math.min(1, fp * 1.3) * actFade;
    const label = c.name;
    ctx.font = `500 ${mobile ? 10 : 11.5}px ui-sans-serif, system-ui, sans-serif`;
    const tw = ctx.measureText(label).width + 30;
    const nh = mobile ? 24 : 27;
    ctx.fillStyle = "rgba(20,14,6,0.9)";
    ctx.strokeStyle = `${c.color}55`;
    ctx.lineWidth = 1;
    rr(ctx, nx - tw / 2, ny - nh / 2, tw, nh, nh / 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(nx - tw / 2 + 13, ny, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,244,224,0.92)";
    ctx.textAlign = "left";
    ctx.fillText(label, nx - tw / 2 + 22, ny + 0.5);
    ctx.restore();
  });

  // ---------- Act 2: memory takes orbit ----------
  MEM.forEach((m) => {
    const fp = ease(range(p, m.t0, m.t0 + 0.14));
    if (fp <= 0) return;
    const ang = m.base + t * 0.12;
    const ox = cx + Math.cos(ang) * R2 * 1.5 * fp;
    const oy = cy + Math.sin(ang) * R2 * 0.82 * fp + Math.sin(t + m.wobble) * 3;
    chip(
      ctx,
      ox,
      oy,
      m.text,
      "#ffedd5",
      "rgba(60,36,10,0.88)",
      fp * actFade * (0.65 + 0.35 * Math.sin(t * 0.8 + m.wobble)),
      mobile ? 9 : 10.5,
    );
  });
  // orbit guide
  const orbA = ease(range(p, 0.34, 0.5)) * actFade;
  if (orbA > 0.01) {
    ctx.strokeStyle = `rgba(245,166,90,${orbA * 0.15})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R2 * 1.5, R2 * 0.82, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ---------- Act 3: it does the work ----------
  const cardW = mobile ? Math.min(w - 44, 316) : 356;
  const cardH = mobile ? 42 : 46;
  const baseX = mobile ? cx : w * 0.76;
  const baseY = mobile ? h * 0.3 : h * 0.3;
  TASKS.forEach((task, i) => {
    const fp = ease(range(p, 0.62 + i * 0.09, 0.74 + i * 0.09));
    if (fp <= 0) return;
    const y = baseY + i * (cardH + 12) + (1 - fp) * 26;
    ctx.save();
    ctx.globalAlpha = fp;
    ctx.fillStyle = "rgba(24,16,6,0.92)";
    ctx.strokeStyle = "rgba(245,166,90,0.3)";
    ctx.lineWidth = 1;
    rr(ctx, baseX - cardW / 2, y - cardH / 2, cardW, cardH, 11);
    ctx.fill();
    ctx.stroke();
    ctx.font = `500 ${mobile ? 10.5 : 12}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const [ask, done] = task.split(" → ");
    ctx.fillStyle = "rgba(255,237,213,0.95)";
    ctx.fillText(ask, baseX - cardW / 2 + 14, y - (mobile ? 8 : 9));
    ctx.fillStyle = "rgba(134,239,172,0.9)";
    ctx.fillText("→ " + done, baseX - cardW / 2 + 14, y + (mobile ? 9 : 10));
    ctx.restore();
  });

  chip(
    ctx,
    mobile ? cx : w * 0.76,
    baseY + 3 * (cardH + 12) + 6,
    "no app to install — it's already in your chats",
    "#ffedd5",
    "rgba(60,36,10,0.9)",
    ease(range(p, 0.9, 1)),
    mobile ? 9.5 : 11,
  );

  // ambient embers
  const r2 = seeded(3);
  for (let i = 0; i < (mobile ? 16 : 30); i++) {
    const x = r2() * w;
    const y = r2() * h;
    const tw = Math.sin(t * 0.7 + i * 2.1) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(245,166,90,${0.04 + tw * 0.07})`;
    ctx.fillRect(x, y, 1.6, 1.6);
  }
};
