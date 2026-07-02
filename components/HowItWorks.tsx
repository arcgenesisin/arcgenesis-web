import Reveal from "./Reveal";

type Step = {
  n: string;
  title: string;
  body: string;
  mock: React.ReactNode;
};

function MapMock() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/30 to-blue-500/20">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.25),0_0_0_14px_rgba(255,255,255,0.12)]" />
      <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-2 text-xs backdrop-blur">
        <div className="text-white">Gut No. 214 · Kannad, Aurangabad</div>
        <div className="text-muted">matched to DP plan overlay ✓</div>
      </div>
    </div>
  );
}

function DrawMock() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/25 to-fuchsia-500/20">
      <svg viewBox="0 0 320 240" className="absolute inset-0 h-full w-full">
        <polygon
          points="70,60 250,80 230,190 90,175"
          fill="rgba(99,102,241,0.25)"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        {[
          [70, 60],
          [250, 80],
          [230, 190],
          [90, 175],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="white" />
        ))}
      </svg>
      <div className="absolute right-4 top-4 rounded-xl bg-black/60 px-3 py-2 text-xs backdrop-blur">
        <div className="text-white">Plot area 1,842 m²</div>
        <div className="text-muted">Residential (R2) · 12 m road</div>
      </div>
    </div>
  );
}

function AskMock() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/25 to-indigo-500/20 p-6">
      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-black shadow-xl">
        I want to build a{" "}
        <span className="font-medium text-indigo-600">residential apartment</span>{" "}
        with ground-floor retail. What is the permissible potential here?
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-white/15 px-2.5 py-1">
          Site Potential
        </span>
        <span className="rounded-full border border-white/15 px-2.5 py-1">
          UDCPR
        </span>
      </div>
    </div>
  );
}

function ReportMock() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-teal-500/15 p-5">
      <div className="rounded-xl bg-black/50 p-4 text-xs backdrop-blur">
        <div className="mb-3 font-medium text-white">Development Potential — draft</div>
        {[
          ["Permissible FSI", "1.10 + 0.40 (premium)"],
          ["Buildable-up area", "2,764 m²"],
          ["Ground coverage", "40%"],
          ["Applicable charges", "₹ read from UDCPR"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between border-b border-white/5 py-1.5 last:border-0"
          >
            <span className="text-muted">{k}</span>
            <span className="text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps: Step[] = [
  {
    n: "01",
    title: "Locate anywhere in India",
    body: "Drop a pin — or type a survey / gut / CTS number — and we corroborate that point against the Development Plan, the village cadastral map, or whatever record covers that land. If it's inside India, we've got it covered.",
    mock: <MapMock />,
  },
  {
    n: "02",
    title: "Draw your plot",
    body: "Trace the boundary right on the plan overlay. We read the zone, the abutting road width and the parcel context straight from the drawing — no manual data entry.",
    mock: <DrawMock />,
  },
  {
    n: "03",
    title: "Tell us what you want to build",
    body: "Describe the development in plain language. Residential, commercial, mixed-use, a layout — the assistant maps your intent to the regulation that governs it.",
    mock: <AskMock />,
  },
  {
    n: "04",
    title: "Get the full report back",
    body: "We generate the deliverable end-to-end: development potential, a property / title search, or a valuation — grounded in the plan and the rule, ready to review and use.",
    mock: <ReportMock />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <Reveal>
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
          From a point on the map to a decision
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          One continuous flow. No stitching together portals, PDFs and
          consultants.
        </p>
      </Reveal>

      <div className="mt-20 flex flex-col gap-24">
        {steps.map((s, i) => (
          <Reveal key={s.n}>
            <div
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {s.mock}
              <div>
                <div className="mb-3 font-mono text-sm text-accent">{s.n}</div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-muted">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
