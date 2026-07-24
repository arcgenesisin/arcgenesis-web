import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// Pilot-access requests. This now creates the person's ACTUAL (pending) account:
// the credentials are forwarded server-side to the app's auth system, which
// bcrypt-hashes the password — the site NEVER stores or logs it. If the app is
// unreachable, the request (without the password) falls back into the shared
// access_requests table so it is never lost, and the lab is notified by email
// either way (RESEND_API_KEY permitting).

export const runtime = "nodejs";

const TO = process.env.ACCESS_REQUEST_TO || "contact@arcgenesis.ai";
const FROM = process.env.ACCESS_REQUEST_FROM || "ARC GENESIS <contact@arcgenesis.ai>";
const APP_SIGNUP = process.env.ARC_APP_SIGNUP_URL || "https://app.arcgenesis.ai/auth/signup";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// mirror of the app's error codes → human messages shown on the form
const APP_ERRORS: Record<string, string> = {
  bad_email: "That email address doesn't look right.",
  bad_phone: "That phone number doesn't look right — digits only, e.g. +91 98765 43210.",
  weak_password: "Password must be at least 8 characters.",
  common_password: "That password is too easy to guess — pick something more personal.",
  pw_is_email: "Your password can't contain your own email — pick something else.",
  pw_mismatch: "The two passwords don't match — type them again.",
  rate_limited: "Too many attempts right now — wait a minute and retry.",
};

async function notify(r: {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  purpose: string;
  stored: string;
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
        subject: `Pilot access request, ${r.name}`,
        text:
          `New pilot access request\n\n` +
          `Name:         ${r.name}\n` +
          `Email:        ${r.email}\n` +
          `Phone:        ${r.phone}\n` +
          `Organisation: ${r.organisation || "(not given)"}\n\n` +
          `Purpose:\n${r.purpose}\n\n` +
          `Status: ${r.stored}\n` +
          `To approve: open the admin ledger (localhost:3001/auth/admin) and click Approve —\n` +
          `the sign-in email goes out to them automatically.\n`,
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
  const phone = clean(body.phone, 40).replace(/[\s\-().]/g, "");
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  const confirm = typeof body.confirm === "string" ? body.confirm.slice(0, 200) : "";
  const organisation = clean(body.organisation, 160);
  const purpose = clean(body.purpose, 2000);

  if (!name || !email || !purpose) {
    return NextResponse.json(
      { ok: false, error: "Please fill your name, email and what you want to build." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: APP_ERRORS.bad_email }, { status: 400 });
  }
  if (!/^\+?\d{8,15}$/.test(phone) || /^(\d)\1+$/.test(phone.replace("+", ""))) {
    return NextResponse.json({ ok: false, error: APP_ERRORS.bad_phone }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ ok: false, error: APP_ERRORS.weak_password }, { status: 400 });
  }
  if (password !== confirm) {
    return NextResponse.json({ ok: false, error: APP_ERRORS.pw_mismatch }, { status: 400 });
  }

  // ── forward the signup to the app (server-side; the only place the password goes) ──
  let forwarded = false;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 10_000);
    const res = await fetch(APP_SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirm, phone, name, organisation, purpose, source: "website" }),
      signal: ctl.signal,
    });
    clearTimeout(t);
    if (res.ok) {
      forwarded = true;
    } else {
      const data = await res.json().catch(() => ({} as { error?: string }));
      if (res.status === 409) {
        return NextResponse.json(
          { ok: false, error: "You already have an account with this email — sign in at app.arcgenesis.ai/login." },
          { status: 409 },
        );
      }
      const msg = APP_ERRORS[String(data.error || "")];
      if (msg) return NextResponse.json({ ok: false, error: msg }, { status: res.status });
      // unknown app-side failure → fall through to the lead fallback below
      console.error("[access-request] app signup failed:", res.status, data.error);
    }
  } catch (e) {
    console.error("[access-request] app unreachable:", String(e).slice(0, 120));
  }

  // ── fallback lead (NO password): only when the account could not be created,
  //    so the request is never lost and shows in the owner's ledger 🌐 section ──
  if (!forwarded) {
    const pool = getPool();
    if (pool) {
      try {
        const ins = () =>
          pool.query(
            `INSERT INTO access_requests (name, email, phone, organisation, purpose)
             VALUES ($1, $2, $3, $4, $5)`,
            [name, email, phone, organisation || null, purpose],
          );
        try {
          await ins();
        } catch (e) {
          if ((e as { code?: string }).code === "42703") {
            await pool.query(`ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS phone text`);
            await ins();
          } else throw e;
        }
      } catch (e) {
        console.error("[access-request] fallback store failed:", e);
      }
    }
  }

  const mail = await notify({
    name, email, phone, organisation, purpose,
    stored: forwarded
      ? "account created (PENDING) — waiting for your Approve in the ledger"
      : "app unreachable — saved as a lead only (no account yet), follow up by email",
  });
  if (!mail.emailed) console.warn("[access-request] not emailed:", mail.reason);

  return NextResponse.json({ ok: true });
}
