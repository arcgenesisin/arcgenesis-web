import PageShell from "@/components/PageShell";

export const metadata = { title: "About — ARC GENESIS" };

// The lab page: who we are and why. Written as what we actually are — a small
// applied-AI research group working on Indian land intelligence.

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="The lab"
      title="An applied AI lab for Indian land."
      intro="We teach machines to read the paperwork that governs every square metre of India — so that knowing what you can build, what it's worth, and who owns it stops being a privilege."
    >
      <div className="max-w-3xl">
        <S title="Why we exist">
          <p>
            The truth about Indian land is public and unreadable at the same
            time. Development Plans live as scanned sheets with no coordinates.
            Building regulations run to thousands of pages, different in every
            city. Ownership sits in registry paper, circle rates in state
            portals, permissions in forms only a practised hand can fill.
          </p>
          <p>
            That unreadability is the real bureaucracy. Whoever can read the
            documents holds the power — and everyone else pays for the
            asymmetry, in fees, in months, in decisions taken blind. We think
            this is a solvable machine-intelligence problem, not a fact of
            life.
          </p>
        </S>

        <S title="What we work on">
          <p>
            Our research programme is narrow on purpose: make every document
            that governs land in India machine-readable, place it on the earth
            it governs, and encode the rules that act on it.
          </p>
          <p>
            That has meant georeferencing India&rsquo;s Development and Regional
            Plans — we were the first to pin them, sheet by sheet, onto
            real-world coordinates; training vision models that read a plan the
            way a town planner does, at any pin; building deterministic solvers
            for the building codes, so a plot&rsquo;s buildable envelope,
            charges and feasibility come from the regulation itself, not an
            opinion; and grounding valuation in registered market records
            rather than asking prices. The interface to all of it is a
            conversation — because the person who most needs these answers will
            never learn a planner&rsquo;s software.
          </p>
        </S>

        <S title="Who we are">
          <p>
            A small, deliberately mixed team: machine-learning researchers,
            architects and town planners working at one table. The domain
            people keep the models honest; the researchers make the domain
            scale. We hold our systems to a human-parity bar — an extraction is
            finished when it reads a plan the way a person can, not when a
            metric looks good — and every claim our engines make carries its
            provenance: measured, assessed, or assumed, flagged as such.
          </p>
        </S>

        <S title="Who it's for">
          <p>
            The common citizen of India. The family buying a flat who wants to
            know the building stands on clean title. The farmer whose field
            has a road reservation drawn across it that nobody told him about.
            The small builder who cannot afford a feasibility consultant for
            every plot he considers. Land is most Indians&rsquo; largest asset
            and biggest risk — the knowledge to navigate it should not be a
            profession&rsquo;s private property.
          </p>
        </S>

        <S title="How we work">
          <p>
            We are an applied lab: we publish our methods in plain language on
            our <a className="underline hover:text-foreground" href="/blogs">blog</a>,
            and we ship them as working engines rather than papers. Evidence
            over impressions, numbers over demos, and the honest limit stated
            on every output. We are independent, bootstrapped, and building
            from Maharashtra outward to all of India.
          </p>
          <p>
            If this problem matters to you too —{" "}
            <a className="underline hover:text-foreground" href="mailto:arcgenesis.in@gmail.com">
              write to us
            </a>
            .
          </p>
        </S>
      </div>
    </PageShell>
  );
}
