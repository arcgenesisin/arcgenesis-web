import PageShell from "@/components/PageShell";

export const metadata = { title: "About — ARC GENESIS" };

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="We turn the land record into an answer"
      intro="India's land intelligence is real but scattered — development plans, cadastral maps, ready-reckoner rates, building regulation. ARC GENESIS reads all of it and puts one honest answer in front of you."
    >
      <div className="prose-invert space-y-6 text-muted">
        <p>
          The principle behind the platform is simple:{" "}
          <span className="text-foreground">
            AI reads and judges; deterministic code extracts and computes.
          </span>{" "}
          We never ask a model to invent a coordinate or a rate — every
          plan-specific number is measured from the record itself.
        </p>
        <p>
          We started with Maharashtra: georeferencing development plans,
          matching survey and gut numbers to 12+ million cadastral parcels, and
          wiring the UDCPR feasibility engine to real approved projects. That
          same spine now powers the three engines you can use here.
        </p>
        <p>
          The bar we hold ourselves to is human parity — the platform should
          trace every road, plot, zone and boundary the way a careful person
          would, and stand behind the number it produces.
        </p>
      </div>
    </PageShell>
  );
}
