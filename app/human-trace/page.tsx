"use client";

import { useEffect, useState } from "react";

// The DP-plan rasters (34 GB), the v6 georef board and the annotation store all live on the
// engine machine and are exposed read/write ONLY through a token-gated tunnel. This page is a
// thin remote shell: the tracer UI itself is served by that backend, so every fetch it makes is
// same-origin with the tunnel. The shared token is typed by the tracer (never shipped in this
// bundle) and confines who can write into the georef training data.
const BACKEND =
  process.env.NEXT_PUBLIC_TRACE_URL ||
  "https://arcgenesis-trace.loca.lt";

export default function HumanTracePage() {
  const [token, setToken] = useState("");
  const [entered, setEntered] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const p = url.searchParams.get("plan") || "";
    setPlan(p);
    const saved = sessionStorage.getItem("trace_token");
    if (saved) setEntered(saved);
  }, []);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    const t = token.trim();
    if (!t) return;
    sessionStorage.setItem("trace_token", t);
    setEntered(t);
  }

  if (!entered) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <form
          onSubmit={unlock}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
        >
          <div className="text-lg font-semibold">ARC GENESIS · Human Trace</div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Remote corridor tracer for the DP/RP georef loop. Enter the access
            token you were given.
          </p>
          <input
            autoFocus
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Access token"
            className="mt-5 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/30"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Open tracer
          </button>
          <p className="mt-4 text-xs leading-relaxed text-muted/80">
            First load shows a one-time tunnel reminder page; enter the tunnel
            password (the host&rsquo;s public IP) once, then trace normally. Your
            traces flow straight into the live v6 georef board.
          </p>
        </form>
      </main>
    );
  }

  const src =
    `${BACKEND}/human_trace.html?token=${encodeURIComponent(entered)}` +
    (plan ? `&plan=${encodeURIComponent(plan)}` : "");

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0b0e14" }}>
      <iframe
        src={src}
        title="ARC GENESIS Human Trace"
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="geolocation; clipboard-read; clipboard-write"
      />
    </div>
  );
}
