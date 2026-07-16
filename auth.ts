import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { persistGoogleUser } from "@/lib/persistUser";

// Full config (Node runtime). JWT sessions — no NextAuth DB adapter, so login
// works on any host including Vercel. On sign-in the jwt callback upserts the
// user + their encrypted Google/Drive tokens into the SHARED identity DB (the
// same one the internal engine reads), when DATABASE_URL is configured.

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, account, profile }) {
      if (profile) {
        token.sub = (profile.sub as string) ?? token.sub;
        token.picture = (profile.picture as string) ?? token.picture;
        token.name = (profile.name as string) ?? token.name;
        token.email = (profile.email as string) ?? token.email;
      }
      // `account` is present only on the initial sign-in — the only time Google
      // hands us the refresh token. Persist then.
      if (account) {
        await persistGoogleUser(
          {
            sub: (profile?.sub as string) ?? (token.sub as string),
            email: (profile?.email as string) ?? (token.email as string),
            name: (profile?.name as string) ?? (token.name as string | null),
          },
          {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            scope: account.scope,
          },
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // google_sub — used to resolve the user for channel-linking.
        (session.user as { googleSub?: string }).googleSub = token.sub as string;
        session.user.image = (token.picture as string) ?? session.user.image;
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
      }
      return session;
    },
  },
});
