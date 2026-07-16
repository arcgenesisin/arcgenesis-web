import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Full config (Node runtime). JWT sessions — no database adapter yet, so
// login works on any host including Vercel. When a reachable users DB exists,
// a persist step goes in the jwt callback (see DocBridge's persistGoogleUser).

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, profile }) {
      if (profile) {
        token.picture = (profile.picture as string) ?? token.picture;
        token.name = (profile.name as string) ?? token.name;
        token.email = (profile.email as string) ?? token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = (token.picture as string) ?? session.user.image;
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
      }
      return session;
    },
  },
});
