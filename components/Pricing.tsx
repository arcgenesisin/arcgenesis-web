import Link from "next/link";
import Reveal from "./Reveal";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "₹500",
    cadence: "/ month",
    blurb: "Talk to the regulation and test the water.",
    features: [
      "Unlimited conversation about rules & regulation",
      "1 plot assessment with location — free, per Google account",
      "Access to all three engines (single run)",
    ],
    cta: "Start for ₹500",
  },
  {
    name: "Professional",
    price: "₹2,000",
    cadence: "/ month",
    blurb: "For the practitioner running real files.",
    features: [
      "10 projects per month",
      "Site potential, valuation & property search",
      "Downloadable reports",
      "Priority processing",
    ],
    highlight: true,
    cta: "Get Professional",
  },
  {
    name: "Studio",
    price: "₹10,000",
    cadence: "/ month",
    blurb: "For firms and teams at volume.",
    features: [
      "100 projects per month",
      "Everything in Professional",
      "Team workspace",
      "Bulk / batch runs",
    ],
    cta: "Get Studio",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <Reveal>
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
          Enter at any depth
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          One product, priced by how much land you put through it. The first
          plot assessment is free with a Google sign-in.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 90}>
            <div
              className={`flex h-full flex-col rounded-3xl border p-7 ${
                t.highlight
                  ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-[0_0_60px_rgba(99,102,241,0.15)]"
                  : "border-white/10 bg-card"
              }`}
            >
              {t.highlight && (
                <span className="mb-4 w-fit rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {t.price}
                </span>
                <span className="text-sm text-muted">{t.cadence}</span>
              </div>

              <Link
                href="/login"
                className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
                  t.highlight
                    ? "bg-white text-black"
                    : "border border-white/15 text-foreground hover:bg-white/5"
                }`}
              >
                {t.cta}
              </Link>

              <ul className="mt-7 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-muted">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
