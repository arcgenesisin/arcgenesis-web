import Logo from "@/components/Logo";
import LiveBackground from "@/components/LiveBackground";

// Unlisted demo page (noindex): the engine film + the live Pune demo.
// The live demo streams from our lab through demo.arcgenesis.ai.
export const metadata = {
  title: "Live demo — ARC GENESIS",
  robots: { index: false, follow: false },
};

const LIVE_DEMO_URL = "https://demo.arcgenesis.ai";

export default function DemoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-14 sm:px-8">
      <LiveBackground />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <Logo />
          <a href="/" className="text-sm text-muted hover:text-foreground">
            arcgenesis.ai →
          </a>
        </div>

        <h1 className="mt-12 text-3xl font-semibold tracking-tight sm:text-5xl">
          The Site Potential Engine, live.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Drop a pin, and the engine reads the georeferenced Development Plan at
          that point — zone, roads, reservations — then solves the buildable
          envelope under UDCPR and prices the whole project. Below: a two-minute
          film of one run, and the live engine itself, open on Pune city.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-black/40 backdrop-blur">
          <video
            src="/demo/site-potential-demo.mp4"
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
            <p className="text-sm text-muted">
              A 20 × 40 m plot in Chh. Sambhajinagar: located on the DP, read by
              Vision, solved, priced — every tab of the report.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-400/25 bg-indigo-500/[0.07] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Live demo · Pune city DP
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            The same engine, running live against our georeferenced Pune
            Development Plan. Pin anywhere inside Pune — the DP loads over
            satellite, Vision assesses your plot, and the full report generates:
            2D plan, 3D massing, charges, financials. (Demo is fenced to Pune;
            the platform itself covers all of India. It streams from our lab, so
            give it a breath if it queues.)
          </p>
          <a
            href={LIVE_DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Launch the live demo →
          </a>
        </div>

        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} ARC GENESIS · This page is unlisted —
          shared by link only. Outputs are decision-support, not statutory
          sanction.
        </p>
      </div>
    </main>
  );
}
