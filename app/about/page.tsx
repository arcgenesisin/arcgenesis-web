import PageShell from "@/components/PageShell";

export const metadata = { title: "About — ARC GENESIS" };

// The lab page. Exact copy — a research-program manifesto. Each "We are…" line
// is one line of the programme; the closing lines are the stance.

const PROGRAMME = [
  "We are researching machine-learning systems that extract, understand and georeference Development and Regional Plans across India.",
  "We are encoding building regulations into deterministic engines linked directly to their clauses.",
  "We are connecting cadastral, ownership, registration, transaction and regulatory records across India’s diverse state systems.",
  "We are building verifiable intelligence for title, planning, development potential and land valuation.",
  "We are making all of it accessible through a simple conversation.",
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="The lab"
      title="An AI research lab for India’s land bureaucracy."
      intro="This is for every Indian — not just those who know which office, professional or intermediary to approach."
    >
      <div className="max-w-3xl">
        <ol className="mt-4 space-y-6 border-l border-white/10 pl-6">
          {PROGRAMME.map((line, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-accent" />
              <p className="text-lg leading-relaxed text-foreground/90">{line}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Our team includes machine-learning researchers, architects and town
            planners. Domain experts audit our work. Every answer states what
            was measured, assessed or assumed.
          </p>
        </div>

        <p className="mt-12 text-sm font-medium tracking-wide text-foreground/80">
          Independent. Bootstrapped. Building from Maharashtra outward.
        </p>
      </div>
    </PageShell>
  );
}
