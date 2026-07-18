import PageShell from "@/components/PageShell";

export const metadata = { title: "Terms of Service — ARC GENESIS" };

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      intro="The agreement between you and ARC GENESIS when you use the platform."
    >
      <div className="max-w-3xl">
        <p className="text-sm text-muted">
          Effective date: 17 July 2026 · <strong>ARC GENESIS</strong>, Pune,
          Maharashtra, India
        </p>

        <S title="The service">
          <p>
            ARC GENESIS provides ARC AI, an AI assistant for land and development
            intelligence in India: document organisation into your own Google
            Drive, site-potential and feasibility outputs, valuation workings and
            title-search assistance — through the website and linked chat
            channels (WhatsApp, Telegram and others as they come online).
          </p>
        </S>

        <S title="Your account">
          <p>
            You sign in with Google and may link chat channels to your account
            using one-time codes. Keep control of your Google account and linked
            numbers — activity from your linked channels is treated as yours.
            You must be able to enter a contract and be 18 or older to subscribe.
          </p>
        </S>

        <S title="Plans and payment">
          <p>
            Free tier and paid subscription plans are described on the pricing
            page. Fees are in Indian Rupees, billed in advance, and don&rsquo;t
            auto-renew into a different plan without your action. Taxes as
            applicable.
          </p>
        </S>

        <S title="The honest limits of our outputs">
          <p>
            Our reports, numbers and answers are decision-support information
            derived from public records, government data and AI reading — they
            are <strong>not</strong> statutory sanction, legal opinion, a
            registered valuation, or professional certification. Verify with the
            competent authority or a licensed professional before acting where
            law requires one. You remain responsible for decisions taken on the
            basis of our outputs.
          </p>
        </S>

        <S title="Acceptable use">
          <p>
            Don&rsquo;t misuse the service: no unlawful content, no attempting to
            access other users&rsquo; data, no reverse-engineering our systems,
            no using ARC AI to violate the terms of the chat platforms it
            runs on.
          </p>
        </S>

        <S title="Your content">
          <p>
            Documents you send remain yours. You grant us the limited rights
            needed to operate the service — to store, read, classify, index and
            file them for you. We don&rsquo;t use your documents to train models
            or sell them.
          </p>
        </S>

        <S title="Liability">
          <p>
            The service is provided &ldquo;as is.&rdquo; To the maximum extent
            permitted by law, our aggregate liability for any claim is limited to
            the fees you paid us in the three months before the claim arose.
          </p>
        </S>

        <S title="Termination, changes, law">
          <p>
            You can stop using the service and request deletion anytime (see{" "}
            <a className="underline hover:text-foreground" href="/data-deletion">
              Data Deletion
            </a>
            ). We may suspend accounts that break these terms. We&rsquo;ll post
            material changes to these terms on this page. These terms are
            governed by the laws of India; courts at Pune, Maharashtra have
            jurisdiction.
          </p>
        </S>

        <S title="Contact">
          <p>
            <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
              contact@arcgenesis.ai
            </a>
          </p>
        </S>
      </div>
    </PageShell>
  );
}
