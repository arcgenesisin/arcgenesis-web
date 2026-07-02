import Link from "next/link";
import LiveBackground from "./LiveBackground";
import Reveal from "./Reveal";

export default function SignupCta() {
  return (
    <section className="relative mx-4 my-10 overflow-hidden rounded-[32px] border border-white/10 px-6 py-20 sm:mx-auto sm:max-w-6xl sm:px-8 sm:py-24">
      <LiveBackground className="opacity-80" />
      <Reveal className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Your first plot is on us
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Sign in with Google and run one full plot assessment — with its
            location, plan and potential — completely free. See what ARC GENESIS
            knows about your land before you pay a rupee.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Continue with Google
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#pricing"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-foreground hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted">
            No card required for the free assessment.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
