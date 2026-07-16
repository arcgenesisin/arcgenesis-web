import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Edge-safe config: providers + route-gating only. No Node-only imports here —
// this file is loaded by middleware.ts on the Edge runtime.

const PROTECTED = ["/account"];

// Least-privilege Drive scope: ARC only ever touches files it creates for the
// user. The SAME Google grant that logs them in also authorizes filing into
// their Drive — one consent, one identity, shared with the internal engine.
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";

export default {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // offline + consent so Google returns a refresh_token we can store
          // (encrypted) and the engine can act on the user's Drive on demand.
          scope: `openid email profile ${DRIVE_SCOPE}`,
          access_type: "offline",
          prompt: "consent",
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
