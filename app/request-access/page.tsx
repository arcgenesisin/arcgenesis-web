import PageShell from "@/components/PageShell";

export const metadata = { title: "Get started, ARC GENESIS" };

// THE ONE FRONT DOOR. Every "Get started" button on the site points here, so this page is what
// turns a visitor into an account. The actual authentication lives on app.arcgenesis.ai (that is
// where the session cookie belongs) — this page is the branded handoff, so there is exactly ONE
// auth implementation, not two.
//
// Google consent here is IDENTITY ONLY (name + email). Drive and Calendar access belong to the
// Assistant and are requested later, at the moment someone connects it — keeping sign-in free of
// sensitive scopes and following Google's incremental-authorisation guidance.
const APP = "https://app.arcgenesis.ai";

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li>
      <span className="font-mono text-xs text-accent">{n}</span> &nbsp;{children}
    </li>
  );
}

export default function GetStartedPage() {
  return (
    <PageShell
      eyebrow="Get started"
      title="One account, every engine."
      intro="Sign in to open your workspace. Development potential, property search and valuation — all from the same account."
      center
    >
      <div className="mx-auto max-w-md">
        <a
          href={`${APP}/auth/google`}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          <GoogleG />
          Continue with Google
        </a>

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-white/12" />
          or
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <a
          href={`${APP}/signup`}
          className="flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-white/5"
        >
          Sign up with email
        </a>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <a className="underline hover:text-foreground" href={`${APP}/login`}>
            Sign in
          </a>
        </p>

        <p className="mt-8 text-center text-xs leading-relaxed text-muted">
          Signing in with Google shares only your name and email address. If you
          later use the Assistant on WhatsApp or Telegram, we ask separately for
          access to file documents into your own Google Drive — never before you
          need it.
        </p>
      </div>

      {/* the steps stay left-aligned inside a centred column — a centred numbered list is unreadable */}
      <div className="mx-auto mt-14 max-w-xl border-t border-white/10 pt-8 text-left">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          How it works
        </h2>
        <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
          <Step n="01">
            You sign in — with Google, or an email and password.
          </Step>
          <Step n="02">
            Your workspace opens straight away. Choose the plan that fits, on the{" "}
            <a className="underline hover:text-foreground" href="/pricing">
              pricing page
            </a>
            .
          </Step>
          <Step n="03">
            The engines unlock the moment your payment is confirmed. Cancel any
            time.
          </Step>
        </ol>
      </div>
    </PageShell>
  );
}
