import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import Reveal from "./Reveal";

// Simple shell for the standalone pages (About, Features, Learn, Blogs).
export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-5 pt-36 pb-16 sm:px-8">
          <Reveal>
            <div className="text-sm font-medium text-accent">{eyebrow}</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>
          </Reveal>
        </section>
        {children && (
          <section className="mx-auto max-w-4xl px-5 pb-28 sm:px-8">
            {children}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
