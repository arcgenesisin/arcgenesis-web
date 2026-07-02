import PageShell from "@/components/PageShell";

export const metadata = { title: "Blogs — ARC GENESIS" };

const posts = [
  {
    title: "How we georeference a development plan automatically",
    date: "Coming soon",
    excerpt:
      "From ink on a scanned plan to a plot you can measure on satellite — the pipeline that reads roads, zones and boundaries.",
  },
  {
    title: "Reading FSI from the rule, not from memory",
    date: "Coming soon",
    excerpt:
      "Why we parse the UDCPR text for the plot in front of you instead of hard-coding a number.",
  },
  {
    title: "Matching a gut number to 12 million parcels",
    date: "Coming soon",
    excerpt:
      "The cadastral bridge that turns a survey number into a georeferenced, rate-linked parcel.",
  },
];

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Notes from building land intelligence"
      intro="Deep dives into the methods behind the platform. New posts land here as we ship."
    >
      <div className="grid gap-5">
        {posts.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-white/25"
          >
            <div className="text-xs text-muted">{p.date}</div>
            <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
