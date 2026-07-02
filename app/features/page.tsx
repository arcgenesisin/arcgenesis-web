import PageShell from "@/components/PageShell";

export const metadata = { title: "Features — ARC GENESIS" };

const features = [
  {
    title: "Locate any parcel in India",
    body: "Pin-drop or survey/gut/CTS number, corroborated against DP plans and cadastral maps.",
  },
  {
    title: "Draw on the plan",
    body: "Trace a boundary on the overlay; zone, road width and parcel context are read from the drawing.",
  },
  {
    title: "Site potential",
    body: "Permissible FSI, buildable-up area, coverage, setbacks and charges under UDCPR.",
  },
  {
    title: "Valuation",
    body: "Local document extraction, declared-BUA vs permissible-FSI cross-check, ASR rate wiring.",
  },
  {
    title: "Property / title search",
    body: "Urban CTS and rural 7/12 spines, cadastral parcel match, red-flag detection and a search plan.",
  },
  {
    title: "Conversational",
    body: "Ask about regulation in plain language and get grounded, source-backed answers.",
  },
];

export default function FeaturesPage() {
  return (
    <PageShell
      eyebrow="Features"
      title="Everything the land needs, in one place"
      intro="Each capability is grounded in the actual record and regulation — not a generic chatbot guessing at rules."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-white/10 bg-card p-6"
          >
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
