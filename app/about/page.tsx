import PageShell from "@/components/PageShell";

export const metadata = { title: "About — ARC GENESIS" };

const principles = [
  {
    title: "AI proposes. Code decides.",
    body: "Vision models read plans and documents; language models translate your words. But every number that matters — a placement, an FSI, a valuation line — is computed by deterministic code and corroborated before it's accepted. We never ask a model to invent a coordinate or a rate.",
  },
  {
    title: "No invented figures.",
    body: "Every rule in our regulation engine is a literal from the code, a value derived from one (marked with its source), or a flagged heuristic under review. Every report can cite the rule that binds each number.",
  },
  {
    title: "Human parity is the bar.",
    body: "A careful person can trace every road and parcel on a scanned plan, and can defend every line of a valuation. Until the machine can do the same — measured, not felt — it isn't done. Versions are scored against human-traced ground truth, and the number decides.",
  },
  {
    title: "Judged the way you'd judge it.",
    body: "Georeferencing is accepted by looking at the warped plan over satellite imagery, not by a proxy metric. When our own coverage numbers turned out hollow, we retracted them in our own logs. Claims we can't defend don't ship.",
  },
];

const built = [
  ["The first AI to georeference India's Development & Regional Plans", "four ML models + deterministic corroboration, judged on the raster"],
  ["12.67 million cadastral parcels", "the survey-number bridge between plans, records and rates"],
  ["The development code as software", "a rules engine that cites its bindings, reconciled against a frozen oracle"],
  ["A generative geometry engine", "floor plates, cores and layouts born inside the legal envelope"],
  ["A national rate library", "the ready reckoner crawled and unified across states"],
  ["The paper trail, industrialised", "title records fetched, read and reconciled into one report"],
  ["BPMS tracing & auto-submission", "a ~500-field permission wizard, walked by a bot, checked by the code"],
  ["ARC AI", "one memory behind every chat you already use"],
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Architects who taught machines to read the ground."
      intro="ARC GENESIS began with a simple frustration: everything that decides what Indian land can become — the plan, the code, the rate, the record — exists, but it exists as scattered paper. We are architects and engineers who spent years turning that paper into one machine you can talk to."
    >
      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            What we believe
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Land decisions are too consequential for confident guessing —
            human or artificial. So the system is built on rules that keep it
            honest:
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-card p-6"
              >
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            What we&apos;ve built
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Not a roadmap — a record. Each of these is running today, and each
            has its own story in the{" "}
            <a href="/blogs" className="text-foreground underline underline-offset-4">
              blogs
            </a>
            .
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            {built.map(([what, how], i) => (
              <div
                key={what}
                className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                  i % 2 ? "bg-white/[0.02]" : "bg-card"
                }`}
              >
                <span className="text-sm font-medium">{what}</span>
                <span className="text-sm text-muted sm:text-right">{how}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            Why one conversation
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-muted">
            <p>
              A land decision is never one question. What is this plot zoned?
              What may I build? What is it worth? Is the title clean? Who filed
              what, when? Today those answers live with four different
              consultants, three portals and a filing cabinet.
            </p>
            <p>
              We built the engines first — years of them — and then put one
              chat in front of all of it. Ask the way you&apos;d ask your
              architect, valuer or lawyer. Switch the mode, and a different
              expert takes the seat — carrying everything the others already
              know about your land.
            </p>
            <p className="text-foreground">
              The land has always had the answers. Now it has a voice.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
