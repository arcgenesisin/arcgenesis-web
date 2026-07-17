import PageShell from "@/components/PageShell";

export const metadata = { title: "About — ARC GENESIS" };

// The lab page. One idea, held like a film: bureaucracy is a wall of documents
// between Indians and their own land — we build the machine that reads the
// wall, so the knowledge inside it belongs to everyone. Three acts and a crew.

function Act({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-accent">{n}</span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="The lab"
      title="Bureaucracy is a language. We taught machines to read it."
      intro="The knowledge that decides what any Indian may build, buy or inherit was never secret — it was sealed inside documents written for the few who administer them. We are breaking that seal, for everyone."
    >
      <div className="max-w-3xl">
        <Act n="ACT I" title="The wall">
          <p>
            A farmer in Vidarbha owns a field with a road drawn across it on a
            plan he has never been shown. A family in Pune buys a flat on the
            strength of a lawyer&rsquo;s letter they have no way to check. A
            small builder walks away from a good plot because finding out what
            it permits costs more than being wrong about it.
          </p>
          <p>
            None of them lack intelligence. They lack access. Between every
            Indian and their own land stands a wall of paper — Development
            Plans scanned without coordinates, building codes running to
            thousands of pages that differ city by city, ownership scattered
            across registers that do not speak to each other. Whoever can read
            the wall holds the power; everyone else pays a toll to those who
            can — in fees, in months, in decisions taken blind.
          </p>
          <p>
            That toll has a name in India: bureaucracy. It survives not on
            rules, but on the unreadability of rules.
          </p>
        </Act>

        <Act n="ACT II" title="The machine">
          <p>
            We build the machine that reads the wall — every document that
            governs land, made legible at machine speed and machine scale.
          </p>
          <p>
            We georeferenced India&rsquo;s Development and Regional Plans — the
            first to pin every scanned sheet onto the ground it governs, so a
            dropped pin anywhere in the country lands on the law of that exact
            earth. We trained vision models to read a plan at that pin the way
            a town planner reads it: zone, road, reservation, the works. We
            wrote the building codes into solvers, so what a plot can carry
            comes from the regulation itself and traces back to its clause —
            never from an opinion. We grounded valuation in what was actually
            registered, not what is being asked.
          </p>
          <p>
            And we put the whole machine behind the one interface every Indian
            already knows how to use: a conversation.
          </p>
        </Act>

        <Act n="ACT III" title="The door">
          <p>
            When reading the wall costs nothing, the wall becomes a door. The
            farmer learns about the road before the acquisition notice does.
            The family checks thirty years of title themselves, in a minute.
            The builder assesses ten plots in an afternoon and builds the
            right one. Development in India does not accelerate because rules
            get looser — it accelerates because knowing gets cheap.
          </p>
          <p>
            That is the whole project: take the knowledge that has always been
            public, and make it actually available — to the masses it was
            written about, not just the professions it was written for.
          </p>
        </Act>

        <Act n="CODA" title="The crew">
          <p>
            A small room: machine-learning researchers, architects and town
            planners working at one table. The domain people keep the models
            honest; the researchers make the domain scale. We hold every
            system to a human-parity bar — finished means it reads a plan the
            way a person can — and every number our engines produce carries
            its provenance: measured, assessed, or assumed, said out loud.
            Independent, bootstrapped, building from Maharashtra outward. We
            publish our methods in plain language on the{" "}
            <a className="underline hover:text-foreground" href="/blogs">blog</a>{" "}
            and ship them as working engines, not papers.
          </p>
          <p>
            If this problem is yours too —{" "}
            <a className="underline hover:text-foreground" href="mailto:arcgenesis.in@gmail.com">
              write to us
            </a>
            .
          </p>
        </Act>
      </div>
    </PageShell>
  );
}
