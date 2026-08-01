import Link from "next/link";
import Reveal from "./Reveal";
import { HEADLINE } from "@/lib/coverage";

// The evidence strip. Sits after the scenes, before the closing CTA: the film has
// just made large claims, so this is where a sceptic gets numbers they can check.
// Values live in lib/coverage.ts and are counted from production data.
export default function ProofBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <div className="text-sm font-medium text-accent">The evidence</div>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Counted, not claimed.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Every number here comes from our own production data for Maharashtra, the state our
          engines are audited for.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {HEADLINE.map((s) => (
            <div key={s.label} className="bg-background p-5 sm:p-6">
              <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm font-medium">{s.label}</div>
              {s.note && <div className="mt-1 text-xs leading-relaxed text-muted">{s.note}</div>}
            </div>
          ))}
        </div>

        <Link
          href="/coverage"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
        >
          See everything we hold
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
