import PageShell from "@/components/PageShell";
import { COVERAGE_AS_OF, GROUPS, HEADLINE, REGULATION_LAYERS } from "@/lib/coverage";

export const metadata = {
  title: "Coverage, ARC GENESIS",
  description:
    "What we actually hold for Maharashtra: 315 georeferenced Development and Regional Plan sheets, 12.6 million cadastral plots, ready reckoner rates, RERA projects and the land classification behind every answer.",
};

export default function CoveragePage() {
  return (
    <PageShell
      eyebrow="Coverage"
      title="What we actually hold."
      intro="Most platforms describe their data. Here is ours, counted rather than estimated. Everything below is Maharashtra, because Maharashtra is where our engines are audited, and we would rather be provable in one state than vague about many."
    >
      {/* headline band */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {HEADLINE.map((s) => (
          <div key={s.label} className="bg-background p-5">
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{s.value}</div>
            <div className="mt-1 text-sm font-medium">{s.label}</div>
            {s.note && <div className="mt-1 text-xs leading-relaxed text-muted">{s.note}</div>}
          </div>
        ))}
      </div>

      {/* groups */}
      <div className="mt-14 space-y-14">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-2xl font-semibold tracking-tight">{g.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{g.blurb}</p>
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {g.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] pb-3"
                >
                  <span className="text-sm text-muted">
                    {r.label}
                    {r.note && <span className="block text-xs text-muted/70">{r.note}</span>}
                  </span>
                  <span className="shrink-0 text-lg font-semibold tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* the checklist */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">What a plot is tested against</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            When the engine reads a plot, these are the proximities it checks. Each one can move a
            setback, cap a height or take land out of the buildable area entirely.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {REGULATION_LAYERS.map((l) => (
              <li key={l} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* honesty note */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
          <h2 className="text-lg font-semibold">Where this stops</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            We hold land, regulation and rate data well beyond Maharashtra, and we are georeferencing
            plans in other states now. We are not claiming those as coverage, because an engine that
            answers a question properly needs more than data: it needs the local regulation encoded
            and audited. That work is finished for Maharashtra and under way elsewhere.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            A georeferenced sheet is counted here only after independent evidence in the plan agrees
            on the same placement. Sheets a person nudged into position by hand are excluded from
            these numbers.
          </p>
          <p className="mt-4 text-xs text-muted/70">Counted from production data, {COVERAGE_AS_OF}.</p>
        </section>
      </div>
    </PageShell>
  );
}
