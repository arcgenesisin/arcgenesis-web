"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

// Nav auth slot: an avatar linking to /account when signed in, otherwise
// a "Log in" pill. Works on both the desktop bar and the mobile menu.
export default function AuthButton({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return (
      <span
        className={`inline-block rounded-full bg-white/10 ${
          mobile ? "h-11 w-full" : "h-9 w-20"
        }`}
      />
    );
  }

  if (user) {
    if (mobile) {
      return (
        <Link
          href="/account"
          onClick={onNavigate}
          className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-lg font-medium"
        >
          {user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-6 w-6 rounded-full" />
          )}
          {user.name?.split(" ")[0] ?? "Account"}
        </Link>
      );
    }
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 rounded-full border border-white/15 px-2 py-1 pr-4 transition-colors hover:border-white/30"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-7 w-7 rounded-full" />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs">
            {user.name?.[0] ?? "?"}
          </span>
        )}
        <span className="text-sm font-medium">
          {user.name?.split(" ")[0] ?? "Account"}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/request-access"
      onClick={onNavigate}
      className={
        mobile
          ? "mt-2 rounded-full bg-white px-5 py-3 text-center text-lg font-medium text-black"
          : "hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03] md:inline-flex"
      }
    >
      Request access
    </Link>
  );
}
