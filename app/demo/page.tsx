import Logo from "@/components/Logo";
import LiveBackground from "@/components/LiveBackground";

// Unlisted demo page (noindex): two doors — the live product (Pune-fenced)
// and the product video. This is the link we hand to reviewers (Sarvam etc.).
export const metadata = {
  title: "Demo — ARC GENESIS",
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
          The Site Potential Engine.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Drop a pin, and the engine reads the georeferenced Development Plan at
          that point — zone, roads, reservations — then solves the buildable
          envelope under UDCPR and prices the whole project.
        </p>

        {/* the two doors */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={LIVE_DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            ⚡ Product — live demo
          </a>
          <a
            href="#video"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            ▶ Product video
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-xs text-muted">
          The live demo runs the real engine against our georeferenced{" "}
          <b className="text-foreground">Pune city DP</b> — pin anywhere in
          Pune, Vision assesses your plot, and the full report generates: 2D
          plan, 3D massing, charges, financials. The demo is fenced to Pune; the
          platform covers all of India. It streams live from our lab — give it a
          breath if it queues.
        </p>

        {/* the film */}
        <div
          id="video"
          className="mt-12 overflow-hidden rounded-2xl border border-white/12 bg-black/40 backdrop-blur"
        >
          <video
            src="/demo/site-potential-demo.mp4"
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full"
          />
          <div className="border-t border-white/10 p-4">
            <p className="text-sm text-muted">
              One complete run, 2½ minutes: a 20 × 40 m plot located on the DP,
              read by Vision, road marked, solved in 2D and 3D, priced — every
              tab of the report.
            </p>
          </div>
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
