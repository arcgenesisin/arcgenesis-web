import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import LiveBackground from "@/components/LiveBackground";
import { auth, signIn } from "@/auth";

export const metadata = { title: "Log in — ARC GENESIS" };

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

export default async function LoginPage() {
  const configured = !!process.env.GOOGLE_CLIENT_ID;
  // tolerate a missing AUTH_SECRET (pre-config on the host): treat as no session
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }
  if (session?.user) redirect("/account");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <LiveBackground />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/12 bg-[#0b0c12]/80 p-8 backdrop-blur-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-2xl font-semibold tracking-tight">
          Enter the conversation
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Sign in with Google. Your first plot assessment is on us.
        </p>

        {configured ? (
          <>
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/account" });
              }}
            >
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              >
                <GoogleG />
                Continue with Google
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-muted">
              By continuing you agree to our terms. We only read your name,
              email and profile photo.
            </p>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-muted">
            Google sign-in is being switched on. Check back shortly.
          </div>
        )}

        <Link
          href="/"
          className="mt-8 block text-center text-sm text-muted hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
