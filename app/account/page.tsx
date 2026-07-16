import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { auth, signOut } from "@/auth";
import { MODES } from "@/lib/modes";

export const metadata = { title: "Your account — ARC GENESIS" };

export default async function AccountPage() {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }
  if (!session?.user) redirect("/login");
  const u = session.user;

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-5 pt-28 pb-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4">
            {u.image ? (
              <Image
                src={u.image}
                alt=""
                width={64}
                height={64}
                className="rounded-full border border-white/15"
              />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/5 text-xl">
                {u.name?.[0] ?? "?"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {u.name ?? "Welcome"}
              </h1>
              <p className="text-sm text-muted">{u.email}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Plan</div>
                <p className="mt-1 text-sm text-muted">
                  Free · one plot assessment included
                </p>
              </div>
              <Link
                href="/#pricing"
                className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
              >
                Upgrade
              </Link>
            </div>
          </div>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
            Enter a reality
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {MODES.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-card p-5"
              >
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: `rgb(${m.color[0]},${m.color[1]},${m.color[2]})`,
                      }}
                    />
                    {m.label}
                  </div>
                  <p className="mt-1 text-xs text-muted">{m.tag}</p>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs text-muted">
                  Soon
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            The conversation surface opens here next — each reality wired to its
            engine.
          </p>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="mt-12"
          >
            <button
              type="submit"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-muted hover:border-white/30 hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
