import PageShell from "@/components/PageShell";
import AccessRequestForm from "@/components/AccessRequestForm";

export const metadata = { title: "Request access, ARC GENESIS" };

export default function RequestAccessPage() {
  return (
    <PageShell
      eyebrow="Pilot access"
      title="Request pilot access."
      intro="Our models are fully audited for Maharashtra. We are expanding across India now."
    >
      <div className="max-w-2xl">
        <AccessRequestForm />

        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            How it works
          </h2>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
            <li>
              <span className="font-mono text-xs text-accent">01</span> &nbsp;You
              send this request.
            </li>
            <li>
              <span className="font-mono text-xs text-accent">02</span> &nbsp;Our
              team reviews it.
            </li>
            <li>
              <span className="font-mono text-xs text-accent">03</span> &nbsp;If
              it fits the pilot, we enable your email for access and send you a
              sign-in link.
            </li>
          </ol>
        </div>
      </div>
    </PageShell>
  );
}
