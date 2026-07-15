import Reveal from "./Reveal";

// The moat, told as chapters. One idea per scene, silence between.
const chapters = [
  {
    n: "01",
    line: "We taught a machine to read India's plans.",
    sub: "The first AI model to georeference every Development Plan in the country — Regional Plans included. Drop a pin; the plan that governs it is already on the map.",
  },
  {
    n: "02",
    line: "We wrote the building code into an engine.",
    sub: "A location-aware site-potential engine with every regulatory compliance built in. It answers with the number — and the rule that binds it.",
  },
  {
    n: "03",
    line: "We made geometry generative.",
    sub: "Floor plates and layouts generated inside the legal envelope. Not a template — the buildable form of your plot.",
  },
];

export default function Chapters() {
  return (
    <section id="chapters" className="relative">
      {chapters.map((c) => (
        <div
          key={c.n}
          className="mx-auto flex min-h-[82vh] max-w-4xl flex-col items-center justify-center px-6 text-center"
        >
          <Reveal>
            <div className="font-mono text-sm tracking-[0.4em] text-muted/60">
              {c.n}
            </div>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              {c.line}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {c.sub}
            </p>
          </Reveal>
        </div>
      ))}
      <div className="mx-auto flex min-h-[40vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="text-2xl font-medium tracking-tight text-foreground/90 sm:text-3xl">
            All of it, in a chat.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
