import Link from "next/link";
import LiveBackground from "./LiveBackground";

const moat = [
  {
    title: "Every DP plan in India, georeferenced",
    sub: "We gathered the nation's Development Plans and built the AI that locates and warps each onto the map — pin a point, we know the plan that governs it.",
  },
  {
    title: "The building code, turned into an engine",
    sub: "Our architects coded the regulation itself into a deterministic solver — it computes the exact FSI, envelope, parking and charges, and cites the binding rule.",
  },
  {
    title: "A geometry generator for the floor plate",
    sub: "It draws the actual layout and floor plate inside the legal envelope, with the cautions and deductions that bind it.",
  },
  {
    title: "ML that finds the ready-reckoner rate",
    sub: "Machine learning resolves the applicable ASR / ready-reckoner rate for any plot — the number valuation stands on.",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-16 text-center">
      <LiveBackground />

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-8 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-[0_0_60px_rgba(99,102,241,0.6)]">
          <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none">
            <path
              d="M4 19c3-9 5.5-13 8-13s5 4 8 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="6" r="1.7" fill="white" />
          </svg>
        </span>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          ARC GENESIS
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
          Your AI assistant for land in India. Locate any plot, read its plan,
          and know what it can become.
        </p>

        <Link
          href="/login"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Log in to start
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="relative z-10 mt-16 mb-10 w-full max-w-5xl sm:mt-24">
        <p className="mb-8 text-sm text-muted">
          Anyone can list the data. We built the machine that reads it.
        </p>
        <div className="grid gap-3 text-left sm:grid-cols-2">
          {moat.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <div className="text-sm font-semibold">{m.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
