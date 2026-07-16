import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Edge runtime — Edge-safe config only. The NextAuth wrapper runs the
// `authorized` callback (gating /account etc.) and then this function.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const host = (req.headers.get("host") || "").toLowerCase();
  // trace.arcgenesis.ai serves the private, password-gated georef tracer.
  if (host.startsWith("trace.") && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/trace-portal";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
});

export const config = {
  // everything except the auth API, static assets and the favicon
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
