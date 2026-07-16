"use client";

import { useState } from "react";

export default function PasswordGate({ configured }: { configured: boolean }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/trace-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) location.reload();
      else setErr("Incorrect password.");
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05060a",
        color: "#e7eaf0",
        fontFamily: "system-ui, Segoe UI, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={submit}
        style={{ width: 340, background: "#0b0d15", border: "1px solid #1e2431", borderRadius: 12, padding: 24 }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>ARC GENESIS · Georef Tracer</div>
        <div style={{ fontSize: 12, color: "#8993a5", marginBottom: 16 }}>
          Private access. Enter the password you were given.
        </div>
        <input
          autoFocus
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: "#05060a",
            border: "1px solid #2b3140",
            color: "#e7eaf0",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            marginBottom: 10,
          }}
        />
        {err && <div style={{ color: "#fca5a5", fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            background: "#2563eb",
            border: "1px solid #3b82f6",
            color: "#fff",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? "Checking…" : "Enter"}
        </button>
        {!configured && (
          <div style={{ fontSize: 11, color: "#6b7589", marginTop: 12, lineHeight: 1.5 }}>
            Access isn&apos;t configured yet (missing server env). Ask the admin to set
            TRACE_GATE_PASSWORD, TRACE_GATE_TICKET, TRACE_TUNNEL_URL and TRACE_TOKEN.
          </div>
        )}
      </form>
    </main>
  );
}
