"use client";

// Nav auth slot. The product's real sign-in lives on app.arcgenesis.ai, so the
// marketing site points there and holds no session of its own — one login home.
const APP = "https://app.arcgenesis.ai";

export default function AuthButton({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  if (mobile) {
    return (
      <div className="mt-2 flex flex-col gap-2">
        <a
          href={`${APP}/login`}
          onClick={onNavigate}
          className="rounded-full border border-white/15 px-5 py-3 text-center text-lg font-medium"
        >
          Log in
        </a>
        <a
          href={`${APP}/signup`}
          onClick={onNavigate}
          className="rounded-full bg-white px-5 py-3 text-center text-lg font-medium text-black"
        >
          Get started
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <a
        href={`${APP}/login`}
        className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        Log in
      </a>
      <a
        href={`${APP}/signup`}
        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
      >
        Get started
      </a>
    </div>
  );
}
