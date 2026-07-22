import { cookies } from "next/headers";
import PasswordGate from "./PasswordGate";

// Private georef tracer portal (trace.arcgenesis.ai). Password-gated; once authed it iframes the
// local token-gated tunnel with the token injected server-side. No georef data is hosted here.
export const dynamic = "force-dynamic";

export default async function TracePortal() {
  const ticket = process.env.TRACE_GATE_TICKET || "";
  const authed = ticket && (await cookies()).get("trace_gate")?.value === ticket;

  if (!authed) return <PasswordGate configured={!!ticket && !!process.env.TRACE_GATE_PASSWORD} />;

  const base = (process.env.TRACE_TUNNEL_URL || "").replace(/\/$/, "");
  const token = process.env.TRACE_TOKEN || "";
  const src = `${base}/human_trace.html?token=${encodeURIComponent(token)}`;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0b0e14" }}>
      <iframe
        src={src}
        title="ARC GENESIS, Human Trace"
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="clipboard-read; clipboard-write; geolocation"
      />
    </div>
  );
}
