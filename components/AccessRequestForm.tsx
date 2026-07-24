"use client";

import { useState } from "react";

// The pilot-access form. Creates the person's ACTUAL account (pending approval):
// posts to /api/request-access, which validates and forwards the credentials
// server-side to the app's auth (app.arcgenesis.ai) — the password is bcrypt-hashed
// there and never stored on the site's side. The owner approves in the local
// ledger; approval emails the person their sign-in link automatically.

type State = "idle" | "sending" | "sent" | "error";

export default function AccessRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setState("error");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords don't match — type them again.");
      setState("error");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          password,
          confirm,
          organisation: fd.get("organisation"),
          purpose: fd.get("purpose"),
          website: fd.get("website"), // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setSentTo(String(fd.get("email") || ""));
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-8 text-center">
        <div className="text-lg font-semibold">Request received.</div>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          We approve every account personally. The moment you are in, you will
          get an email{sentTo ? ` at ${sentTo}` : ""} with your sign-in link —
          you will sign in with the email and password you just chose.
        </p>
        <a
          href="https://app.arcgenesis.ai/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
        >
          Already approved? Sign in
        </a>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/30";
  const label = "mb-2 block text-xs font-medium uppercase tracking-wide text-muted";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={field}
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="organisation" className={label}>
            Organisation <span className="normal-case text-muted/70">(optional)</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            className={field}
            placeholder="Firm, institution or independent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className={label}>
            Choose a password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={field}
            placeholder="At least 8 characters"
          />
        </div>
        <div>
          <label htmlFor="confirm" className={label}>
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={field}
            placeholder="Same password again"
          />
        </div>
      </div>
      <p className="text-xs text-muted/80">
        This becomes your sign-in for app.arcgenesis.ai once we approve you. It is
        stored encrypted — nobody, including us, can read it back.
      </p>

      <div>
        <label htmlFor="purpose" className={label}>
          What do you want to build?
        </label>
        <textarea
          id="purpose"
          name="purpose"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="Tell us who you are and what you intend to use the models for."
        />
      </div>

      {/* honeypot, hidden from people */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {state === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        >
          {state === "sending" ? "Sending…" : "Submit request"}
        </button>
        <a
          href="https://app.arcgenesis.ai/login"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
        >
          Already have an account? Sign in
        </a>
      </div>
    </form>
  );
}
