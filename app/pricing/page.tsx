import PageShell from "@/components/PageShell";

export const metadata = { title: "Pricing, ARC GENESIS" };

type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

// Mirrors the billing catalogue the checkout actually charges (dashboard/auth.js PLANS).
const plans: Plan[] = [
  {
    name: "Single Project",
    price: "₹1,000",
    cadence: "one-time, per project",
    blurb: "One project, shared across all three engines. Pay only when you need it — no monthly commitment.",
    features: [
      "All three engines: Potential · Search · Valuation",
      "One project",
      "Pay per project, no subscription",
    ],
  },
  {
    name: "Professional",
    price: "₹2,500",
    cadence: "/ month",
    blurb: "For the practitioner with live files.",
    features: [
      "All three engines",
      "10 projects a month",
      "Arc AI project assistant included",
      "Downloadable reports",
    ],
    highlight: true,
  },
  {
    name: "Studio",
    price: "₹10,000",
    cadence: "/ month",
    blurb: "For firms moving volume.",
    features: [
      "All three engines",
      "100 projects a month",
      "Arc AI project assistant included",
      "ARC GENESIS chatbot on WhatsApp & Telegram",
    ],
  },
  {
    name: "Assistant",
    price: "₹500",
    cadence: "/ month",
    blurb: "Just the chatbot — your documents, over chat.",
    features: [
      "ARC GENESIS chatbot on WhatsApp & Telegram",
      "Send documents, filed into your own Google Drive",
      "Timed reminders on your Google Calendar",
    ],
  },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-7 ${
        p.highlight
          ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-transparent"
          : "border-white/10 bg-card"
      }`}
    >
      {p.highlight && (
        <span className="mb-4 w-fit rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
          Most chosen
        </span>
      )}
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.blurb}</p>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
        <span className="text-sm text-muted">{p.cadence}</span>
      </div>
      <a
        href="/request-access"
        className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
          p.highlight
            ? "bg-white text-black"
            : "border border-white/15 text-foreground hover:bg-white/5"
        }`}
      >
        Get started
      </a>
      <ul className="mt-7 space-y-3 text-sm">
        {p.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-muted">
            <span className="mt-0.5 text-accent">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Simple, honest pricing"
      intro="One product, priced by how much land you put through it. Prices are in Indian Rupees."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <PlanCard key={p.name} p={p} />
        ))}
      </div>

      <div className="mt-12 max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted">
        <p>
          Monthly plans renew automatically each month by UPI Autopay or card
          mandate, and you can cancel anytime — see our{" "}
          <a className="underline hover:text-foreground" href="/refund">
            Refund &amp; Cancellation Policy
          </a>
          . Payments are processed securely by Razorpay (UPI, cards and
          netbanking). GST is not currently applicable.
        </p>
        <p>
          Questions about a plan? Write to{" "}
          <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
            contact@arcgenesis.ai
          </a>{" "}
          or see the{" "}
          <a className="underline hover:text-foreground" href="/terms">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
