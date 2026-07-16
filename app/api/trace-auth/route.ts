import { NextResponse } from "next/server";

// Validates the shared password (server-side, env-based) and pins a session cookie.
// The actual tunnel token is never sent to the client.
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  const expected = process.env.TRACE_GATE_PASSWORD;
  const ticket = process.env.TRACE_GATE_TICKET;
  if (expected && ticket && password === expected) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("trace_gate", ticket, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
