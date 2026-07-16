import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Edge-safe config: providers + route-gating only. No Node-only imports here —
// this file is loaded by middleware.ts on the Edge runtime.

const PROTECTED = ["/account"];

export default {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "select_account",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (PROTECTED.some((p) => path.startsWith(p))) return !!auth?.user;
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
} satisfies NextAuthConfig;
