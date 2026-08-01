import PageShell from "@/components/PageShell";

export const metadata = { title: "Privacy Policy, ARC GENESIS" };

// The privacy policy required by Meta (app Live mode), Google (OAuth consent
// publishing) and plain honesty. Written to match what the platform actually
// does, update it when data practices change.

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
      intro="What ARC GENESIS collects, why, where it lives, and how you delete it, in plain language."
    >
      <div className="max-w-3xl">
        <p className="text-sm text-muted">
          Effective date: 28 July 2026 · Operated by <strong>ARC GENESIS</strong>{" "}
          (sole proprietorship), Aurangabad, Maharashtra, India · Contact:{" "}
          <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
            contact@arcgenesis.ai
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
            any documents, images or files you send, that is the product: we
            read them, classify them and organise them for you.
          </p>
          <p>
            <strong>Google Drive access you grant.</strong> We request the
            narrowest Drive permission Google offers (<code>drive.file</code>):
            we can only see and manage files our own app creates for you, never
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
            chat channels to one account, and operate subscriptions. We use
            AI models (see the sharing section below) to read and classify the
            documents you send. We do not sell your personal data. We do
            <strong> not</strong> use Google Workspace data (Drive, Calendar), or
            the documents you send us, to develop, improve, or train generalized
            AI or machine-learning models.
          </p>
        </S>

        <S title="Where your data lives">
          <p>
            <strong>Documents you upload live in your own Google Drive</strong>, in
            folders our app creates. We keep the search index, document metadata,
            your account record and conversation history in our database
            (managed Postgres hosted on Neon). Google OAuth tokens are stored
            encrypted (AES-256-GCM) and all traffic uses TLS.
          </p>
          <p>
            Three things are held by us rather than in your Drive, and we would
            rather name them than leave them unsaid. <strong>Reports we generate</strong>{" "}
            stay with us so that your project history and search still work if you
            disconnect Drive; you can save a copy to your own Drive at any time.{" "}
            <strong>A firm logo</strong> you upload for branded reports is kept so we
            can place it on the documents you asked us to produce. <strong>A profile
            picture</strong> is not stored at all: we use the photo from your Google
            sign-in, or your initials.
          </p>
          <p>
            If you send a document before your Drive is connected, we may hold that
            file briefly while you complete the connection, and it moves to your Drive
            as soon as it is ready.
          </p>
        </S>

        <S title="Google user data, Limited Use">
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

        <S title="How we protect your data">
          <p>
            <strong>In transit:</strong> all traffic to and from ARC GENESIS is
            encrypted with TLS/HTTPS.
          </p>
          <p>
            <strong>At rest:</strong> your Google OAuth tokens are stored
            encrypted with AES-256-GCM; your search index and document metadata
            sit in an access-restricted managed Postgres database (Neon).
          </p>
          <p>
            <strong>Least privilege:</strong> we request only{" "}
            <code>drive.file</code> (files our app creates for you) and,
            optionally, <code>calendar.events</code> (events we create). We are
            technically unable to read your other Drive files or calendar entries.
          </p>
          <p>
            <strong>Access control:</strong> access is limited to the automated
            systems that run the service; no staff browse your data, and our
            administrative tools are restricted to our own machines and are not
            reachable from the internet.
          </p>
          <p>
            <strong>Index, not vault:</strong> your documents remain in your own
            Google Drive; we keep only pointers and metadata, so there is no
            second copy of your files held by us.
          </p>
        </S>

        <S title="Who we share Google user data with">
          <p>
            We do <strong>not</strong> sell your Google user data, share it for
            advertising, or disclose it to data brokers. We disclose it only to
            the service providers below, and only to the extent needed to run the
            feature you asked for:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Google</strong> (Drive, Calendar and the Gemini API). We
              use these to store and retrieve the files our app creates in your
              Drive, create the calendar events you ask for, and, through the
              Gemini API, run the chat assistant that answers your questions
              about your documents.
            </li>
            <li>
              <strong>Sarvam AI</strong> (document reader). The specific
              documents you send us, including any file we retrieve from your
              Google Drive at your request, are sent to Sarvam AI&rsquo;s
              document-processing API so their text can be read and classified.
              Sarvam processes them only to return that result to us and may not
              use your data for its own purposes.
            </li>
            <li>
              <strong>The messaging platform you use</strong>, either Meta
              (WhatsApp Business Platform) or Telegram. This is used only to
              deliver a file back to you when you request it.
            </li>
            <li>
              <strong>Neon</strong> (managed database host). This stores your
              account record, the search index and document metadata. Your actual
              files stay in your own Google Drive, not here.
            </li>
            <li>
              <strong>Cloudflare</strong> (network) and our own servers, which
              route traffic and operate the service.
            </li>
          </ul>
          <p>
            Each provider receives only what is needed for its role, and none is
            permitted to use your Google user data for its own purposes. We do not
            use Google Workspace data (Drive, Calendar) to develop, improve, or
            train generalized AI or machine-learning models.
          </p>
        </S>

        <S title="Retention and deletion">
          <p>
            We keep your data while your account is active. Deleting a document
            in the product soft-deletes it and it is purged within 30 days. You
            can request full account deletion at any time, see{" "}
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
            <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
              contact@arcgenesis.ai
            </a>
            .
          </p>
        </S>
      </div>
    </PageShell>
  );
}
