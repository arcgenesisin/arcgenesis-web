import Link from "next/link";
import Logo from "@/components/Logo";
import LiveBackground from "@/components/LiveBackground";

export const metadata = { title: "Log in — ARC GENESIS" };

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <LiveBackground />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/12 bg-[#0b0c12]/80 p-8 backdrop-blur-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Sign in to run assessments on your land. First plot is free.
        </p>

        <button
          disabled
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black opacity-90"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-black/5 text-xs font-bold">
            G
          </span>
          Continue with Google
        </button>
        <p className="mt-4 text-center text-xs text-muted">
          Authentication wiring comes next — this is the front-end shell.
        </p>

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
