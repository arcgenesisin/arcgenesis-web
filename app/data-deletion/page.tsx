import PageShell from "@/components/PageShell";

export const metadata = { title: "Data Deletion — ARC GENESIS" };

// Meta requires a public data-deletion instructions URL for Live apps.
// These instructions are the real procedure — keep them true.

export default function DataDeletionPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Data Deletion Instructions"
      intro="How to have every piece of your data removed from ARC GENESIS."
    >
      <div className="max-w-3xl space-y-6 text-[15px] leading-relaxed text-muted">
        <ol className="list-decimal space-y-4 pl-5">
          <li>
            Email{" "}
            <a className="underline hover:text-foreground" href="mailto:ai.arcgenesis@gmail.com">
              ai.arcgenesis@gmail.com
            </a>{" "}
            with the subject <strong>&ldquo;Delete my data&rdquo;</strong> — from
            the email address you signed in with, or include the phone number /
            handle of a chat channel you linked (WhatsApp or Telegram), so we can
            locate your account.
          </li>
          <li>
            We will confirm the request and delete, within <strong>30 days</strong>:
            your account record, linked channel identities, conversation history,
            document index and metadata, and stored Google tokens.
          </li>
          <li>
            Files our app filed into <strong>your own Google Drive</strong> are
            under your control — we don&rsquo;t delete your Drive contents unless
            you ask us to remove the folders our app created. You can also revoke
            our Drive access instantly at{" "}
            <a
              className="underline hover:text-foreground"
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noreferrer"
            >
              myaccount.google.com/permissions
            </a>
            .
          </li>
          <li>We reply confirming completion once the deletion is done.</li>
        </ol>
        <p>
          This page serves as the data-deletion callback instructions for our
          integrations with Meta platforms (WhatsApp) and other channels.
        </p>
      </div>
    </PageShell>
  );
}
