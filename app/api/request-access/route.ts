import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// Pilot-access requests. Every submission is stored in the shared DB (so a
// request can never be lost, even if email is down or unconfigured) and, when
// RESEND_API_KEY is set, a notification is emailed to the lab.

export const runtime = "nodejs";

const TO = process.env.ACCESS_REQUEST_TO || "contact@arcgenesis.ai";
// Resend's shared sender works with no domain setup; swap to a verified
// arcgenesis.ai sender once the domain is verified in Resend.
const FROM = process.env.ACCESS_REQUEST_FROM || "ARC GENESIS <onboarding@resend.dev>";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

async function notify(r: {
  name: string;
  email: string;
  organisation: string;
  purpose: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { emailed: false, reason: "RESEND_API_KEY not set" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: r.email,
        subject: `Pilot access request — ${r.name}`,
        text:
          `New pilot access request\n\n` +
          `Name:         ${r.name}\n` +
          `Email:        ${r.email}\n` +
          `Organisation: ${r.organisation || "(not given)"}\n\n` +
          `Purpose:\n${r.purpose}\n\n` +
          `To approve: add ${r.email} as a Google test user, then send them the sign-in link.\n`,
      }),
    });
    if (!res.ok) return { emailed: false, reason: `resend ${res.status}` };
    return { emailed: true };
  } catch (e) {
    return { emailed: false, reason: String(e).slice(0, 120) };
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // honeypot: real people never fill this hidden field
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const organisation = clean(body.organisation, 160);
  const purpose = clean(body.purpose, 2000);

  if (!name || !email || !purpose) {
    return NextResponse.json(
      { ok: false, error: "Please fill your name, email and what you want to build." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const pool = getPool();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO access_requests (name, email, organisation, purpose)
         VALUES ($1, $2, $3, $4)`,
        [name, email, organisation || null, purpose],
      );
    } catch (e) {
      console.error("[access-request] store failed:", e);
      // fall through: still try to notify so the request isn't lost
    }
  } else {
    console.warn("[access-request] DATABASE_URL not set — not stored");
  }

  const mail = await notify({ name, email, organisation, purpose });
  if (!mail.emailed) console.warn("[access-request] not emailed:", mail.reason);

  return NextResponse.json({ ok: true });
}
