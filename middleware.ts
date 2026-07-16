import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Self-contained: routes the trace.arcgenesis.ai subdomain to the private, password-gated
// georef tracer. No NextAuth dependency, so it deploys safely without the (in-progress) auth
// system. The NextAuth version is saved at middleware.nextauth.backup.ts — restore it once the
// account system + its env (AUTH_SECRET / Google / DATABASE_URL) are configured on Vercel.
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();
  if (host.startsWith("trace.")) {
    const url = req.nextUrl.clone();
    url.pathname = "/trace-portal";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// Only the root of the trace subdomain is rewritten; the main site + /api/trace-auth pass through.
export const config = { matcher: ["/"] };
