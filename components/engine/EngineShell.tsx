import Link from "next/link";
import SiteNav from "@/components/SiteNav";

// Chrome for an engine interface page: main nav + a product sub-header with a
// sign-in gate note. The interface renders but its run-actions are gated.
export default function EngineShell({
  name,
  glyph,
  accent,
  blurb,
  children,
}: {
  name: string;
  glyph: string;
  accent: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      {/* spacer for the fixed nav so the sticky sub-header sits below it */}
      <div className="h-16" aria-hidden />
      <div className="sticky top-16 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="flex w-full items-center gap-2 px-4 py-3 sm:gap-3 sm:px-10">
          <Link
            href="/#products"
            className="shrink-0 text-sm text-muted hover:text-foreground"
          >
            <span className="hidden sm:inline">← Engines</span>
            <span className="sm:hidden">←</span>
          </Link>
          <span className="hidden text-white/20 sm:inline">/</span>
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${accent} text-sm text-white`}
          >
            {glyph}
          </span>
          <span className="min-w-0 truncate font-medium">{name}</span>
          <span className="hidden text-sm text-muted lg:inline">· {blurb}</span>
          <Link
            href="/login"
            className="ml-auto shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black transition-transform hover:scale-[1.03] sm:px-4"
          >
            Sign in<span className="hidden sm:inline"> to run</span>
          </Link>
        </div>
      </div>
      <main className="flex-1 px-4 py-6 sm:px-10 sm:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </>
  );
}
