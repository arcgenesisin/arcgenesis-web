import Link from "next/link";
import LiveBackground from "./LiveBackground";

const sources = [
  "Development & Master Plans",
  "Cadastral records · 7/12 · CTS · RoR",
  "Building bye-laws & regulation",
  "Circle rate / Ready-Reckoner",
  "State land-record portals",
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

      <div className="relative z-10 mt-16 mb-10 w-full max-w-4xl sm:mt-24">
        <p className="mb-6 text-sm text-muted">
          Reading the real record — anywhere in India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted/80">
          {sources.map((s) => (
            <span key={s} className="font-medium tracking-wide">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
