"use client";

import { useState } from "react";

// The pilot-access form. Posts to /api/request-access, which stores the request
// in the shared DB and notifies the lab. Deliberately short: four fields.

type State = "idle" | "sending" | "sent" | "error";

export default function AccessRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          organisation: fd.get("organisation"),
          purpose: fd.get("purpose"),
          website: fd.get("website"), // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
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
          We read every application. If your work fits the pilot, we will enable
          your email for access and send you a sign-in link.
        </p>
        <a
          href="https://app.arcgenesis.ai/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
        >
          Already have an account? Sign in
        </a>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/30";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
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
          <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
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
          <label htmlFor="organisation" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
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

      <div>
        <label htmlFor="purpose" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
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
