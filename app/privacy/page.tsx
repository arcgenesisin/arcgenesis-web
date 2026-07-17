import PageShell from "@/components/PageShell";

export const metadata = { title: "Privacy Policy — ARC GENESIS" };

// The privacy policy required by Meta (app Live mode), Google (OAuth consent
// publishing) and plain honesty. Written to match what the platform actually
// does — update it when data practices change.

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

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What ARC GENESIS collects, why, where it lives, and how you delete it — in plain language."
    >
      <div className="max-w-3xl">
        <p className="text-sm text-muted">
          Effective date: 17 July 2026 · Operated by <strong>ARC GENESIS</strong>{" "}
          (sole proprietorship), Aurangabad, Maharashtra, India · Contact:{" "}
          <a className="underline hover:text-foreground" href="mailto:arcgenesis.in@gmail.com">
            arcgenesis.in@gmail.com
          </a>
        </p>

        <S title="What this covers">
          <p>
            This policy covers the ARC GENESIS platform: the website
            (arcgenesis.ai), signing in with Google, and our AI assistant ARC AI, reachable
            over chat channels such as WhatsApp and Telegram (and, as they come
            online, other messaging platforms).
          </p>
        </S>

        <S title="What we collect">
          <p>
            <strong>Account information.</strong> When you sign in with Google we
            receive your name, email address and profile photo.
          </p>
          <p>
            <strong>Documents and messages you send us.</strong> When you message
            ARC AI on a linked chat channel, we receive those messages and
            any documents, images or files you send — that is the product: we
            read them, classify them and organise them for you.
          </p>
          <p>
            <strong>Google Drive access you grant.</strong> We request the
            narrowest Drive permission Google offers (<code>drive.file</code>):
            we can only see and manage files our own app creates for you — never
            your wider Drive. Optionally, if you grant calendar access, we can
            create events for you.
          </p>
          <p>
            <strong>Technical basics.</strong> Standard server logs (IP address,
            timestamps, pages requested) needed to run and secure the service.
          </p>
        </S>

        <S title="How we use it">
          <p>
            To provide the service: file your documents into your own Google
            Drive, build your searchable index, answer your questions, link your
            chat channels to one account, and operate subscriptions. We may use
            AI models (see processors below) to read and classify the documents
            you send. We do not sell your personal data, and we do not use your
            documents to train models.
          </p>
        </S>

        <S title="Where your data lives">
          <p>
            <strong>Your documents live in your own Google Drive</strong> — in
            folders our app creates. We keep the search index, document metadata,
            your account record and conversation history in our database
            (managed Postgres hosted on Neon). Google OAuth tokens are stored
            encrypted (AES-256-GCM) and all traffic uses TLS.
          </p>
        </S>

        <S title="Google user data — Limited Use">
          <p>
            Our use of information received from Google APIs adheres to the{" "}
            <a
              className="underline hover:text-foreground"
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements. Google user data is used
            only to provide the features described here, is never sold, never
            used for advertising, and never read by humans except with your
            consent, for security, or as required by law.
          </p>
        </S>

        <S title="Service providers we rely on">
          <p>
            Google (sign-in, Drive, Calendar), Meta (WhatsApp Business Platform),
            Telegram (bot API), Anthropic (AI document reading and replies),
            Vercel (website hosting), Neon (database), Cloudflare (DNS/network).
            Each receives only what is needed to perform its role.
          </p>
        </S>

        <S title="Retention and deletion">
          <p>
            We keep your data while your account is active. Deleting a document
            in the product soft-deletes it and it is purged within 30 days. You
            can request full account deletion at any time — see{" "}
            <a className="underline hover:text-foreground" href="/data-deletion">
              Data Deletion Instructions
            </a>
            . Files in your own Google Drive are yours and remain under your
            control regardless of us.
          </p>
        </S>

        <S title="Your choices">
          <p>
            You can revoke our Google access anytime at{" "}
            <a
              className="underline hover:text-foreground"
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noreferrer"
            >
              myaccount.google.com/permissions
            </a>
            , unlink a chat channel by asking us, or request deletion. The
            service is not directed at children under 13.
          </p>
        </S>

        <S title="Changes and contact">
          <p>
            If this policy changes materially we will update this page and its
            effective date. Questions or requests:{" "}
            <a className="underline hover:text-foreground" href="mailto:arcgenesis.in@gmail.com">
              arcgenesis.in@gmail.com
            </a>
            .
          </p>
        </S>
      </div>
    </PageShell>
  );
}
