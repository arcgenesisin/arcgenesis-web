import PageShell from "@/components/PageShell";

export const metadata = { title: "Learn — ARC GENESIS" };

const topics = [
  {
    q: "What is a Development Plan (DP)?",
    a: "A statutory map for a planning area showing zones, reservations and proposed roads. It governs what you can build where.",
  },
  {
    q: "What is FSI / BUA?",
    a: "Floor Space Index is the ratio of permissible built-up floor area to plot area. Buildable-up area (BUA) is what that translates to on your specific plot.",
  },
  {
    q: "What is a 7/12 extract / CTS number?",
    a: "Rural land records (7/12) and urban City Survey numbers identify a parcel and its rights — the starting point for any title check.",
  },
  {
    q: "What is ASR / ready-reckoner rate?",
    a: "Government-notified minimum land and construction rates by location, used as the floor for valuation and stamp duty.",
  },
];

export default function LearnPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="The land vocabulary, decoded"
      intro="Short, plain-language explainers for the terms you'll meet while assessing a plot."
    >
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-card">
        {topics.map((t) => (
          <div key={t.q} className="p-6">
            <h3 className="font-semibold">{t.q}</h3>
            <p className="mt-2 text-sm text-muted">{t.a}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
