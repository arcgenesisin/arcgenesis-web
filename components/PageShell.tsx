import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import Reveal from "./Reveal";

// Simple shell for the standalone pages (About, Features, Learn, Blogs).
// `center` is opt-in: long-form pages (privacy, terms, about) read better left-aligned, but a short
// focused page like sign-in wants its heading and actions centred on the page.
export default function PageShell({
  eyebrow,
  title,
  intro,
  center = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section
          className={`mx-auto max-w-4xl px-5 pt-36 pb-16 sm:px-8 ${center ? "text-center" : ""}`}
        >
          <Reveal>
            <div className="text-sm font-medium text-accent">{eyebrow}</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className={`mt-5 max-w-2xl text-lg text-muted ${center ? "mx-auto" : ""}`}>
              {intro}
            </p>
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
