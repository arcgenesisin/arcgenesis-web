import { getPool } from "./db";
import { encrypt } from "./crypto";

type Profile = { sub?: string; email?: string; name?: string | null };
type OAuthAccount = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number; // epoch seconds
  scope?: string;
};

// Upsert the user and store their (encrypted) Google tokens into the shared
// identity DB. Called from the jwt callback on sign-in. No-op with a warning if
// Postgres isn't configured yet, so login never breaks pre-config.
export async function persistGoogleUser(
  profile: Profile,
  account: OAuthAccount,
): Promise<void> {
  const pool = getPool();
  if (!pool) {
    console.warn("[arc] DATABASE_URL not set — skipping token persistence");
    return;
  }
  if (!profile.sub || !profile.email) return;

  const expiresAt = account.expires_at
    ? new Date(account.expires_at * 1000)
    : new Date(Date.now() + 3600 * 1000);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO users (google_sub, email, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (google_sub)
       DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name
       RETURNING id`,
      [profile.sub, profile.email, profile.name ?? null],
    );
    const userId = rows[0].id;

    if (account.refresh_token) {
      // First consent (or re-consent) — we have a fresh refresh token.
      await client.query(
        `INSERT INTO google_credentials
           (user_id, access_token, refresh_token, scope, expires_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, now())
         ON CONFLICT (user_id) DO UPDATE SET
           access_token  = EXCLUDED.access_token,
           refresh_token = EXCLUDED.refresh_token,
           scope         = EXCLUDED.scope,
           expires_at    = EXCLUDED.expires_at,
           updated_at    = now()`,
        [
          userId,
          encrypt(account.access_token ?? ""),
          encrypt(account.refresh_token),
          account.scope ?? "",
          expiresAt,
        ],
      );
    } else {
      // Re-login without a new refresh token — refresh access token/expiry only,
      // keeping the stored refresh token intact.
      await client.query(
        `UPDATE google_credentials
           SET access_token = $2, expires_at = $3, updated_at = now()
         WHERE user_id = $1`,
        [userId, encrypt(account.access_token ?? ""), expiresAt],
      );
    }

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("[arc] token persistence failed:", e);
  } finally {
    client.release();
  }
}
