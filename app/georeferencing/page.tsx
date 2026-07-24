import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import GeorefExplorer from "@/components/GeorefExplorer";

export const metadata = {
  title: "Georeferencing, ARC GENESIS",
  description:
    "Development and Regional Plan sheets placed back onto the real world, automatically. A sample of 138 Maharashtra plans, each provable against live satellite imagery.",
  // Unlisted: reachable only by direct link (shared privately with reviewers),
  // kept out of search engines and the site's own navigation.
  robots: "noindex, nofollow",
};

export default function GeoreferencingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-5 pt-36 pb-10 sm:px-8">
          <Reveal>
            <div className="text-sm font-medium text-accent">Georeferencing</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Every planning sheet, back on the real world.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              India draws its Development and Regional Plans as flat scans, tied to no map and no
              coordinates. Our pipeline reads a raw sheet and sets it back onto the earth on its own,
              then checks the placement against independent evidence before it will accept it.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Below is a sample of 138 Maharashtra plans it located this way. Pick any one and slide
              between the placed sheet and live satellite imagery to judge the fit yourself.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-[1800px] px-4 pb-16 sm:px-6 lg:px-8">
          <Reveal>
            <GeorefExplorer />
          </Reveal>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-28 sm:px-8">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h2 className="text-lg font-semibold">How a placement earns its place</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                A sheet is accepted only when at least two independent signals inside it, the road
                network, water bodies, rail lines and survey numbers, agree on the very same fit.
                One channel alone is never enough. Anything a person nudged into position by hand is
                left out of this set entirely, so what you see here is the pipeline&rsquo;s own work.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                The residual is the typical distance between where the plan says a feature sits and
                where satellite imagery shows it on the ground, measured in metres. The best here
                land near two metres, roughly the width of a footpath.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted/70">
                What you are looking at are review-resolution previews and the acceptance record for
                each plan. The transforms, control points, full-resolution rasters and the statewide
                board behind them stay with us.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
