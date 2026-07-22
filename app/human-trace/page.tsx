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
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0e14",
          color: "#e7eaf0",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <form
          onSubmit={unlock}
          style={{
            width: 360,
            background: "#151923",
            border: "1px solid #2b3140",
            borderRadius: 10,
            padding: 24,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
            ARC GENESIS · Human Trace
          </div>
          <div style={{ fontSize: 12, color: "#8993a5", marginBottom: 16 }}>
            Remote corridor tracer for the DP/RP georef loop. Enter the access
            token you were given.
          </div>
          <input
            autoFocus
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Access token"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#0b0e14",
              border: "1px solid #30384a",
              color: "#e7eaf0",
              borderRadius: 6,
              padding: "10px 12px",
              fontSize: 13,
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              border: "1px solid #3b82f6",
              color: "#fff",
              borderRadius: 6,
              padding: "10px 12px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Open tracer
          </button>
          <div style={{ fontSize: 11, color: "#6b7589", marginTop: 12, lineHeight: 1.5 }}>
            First load shows a one-time tunnel reminder page, enter the tunnel password
            (the host&apos;s public IP) once, then trace normally. Your traces flow straight into
            the live v6 georef board.
          </div>
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
