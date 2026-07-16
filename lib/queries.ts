import { getPool } from "./db";

// Read/write helpers for the shared identity DB, scoped to the signed-in user.
// The user row itself is created at sign-in by persistGoogleUser; here we only
// resolve it (by google_sub) and manage channel links.

export type Channel = {
  channel: string;
  platform_user_id: string;
  linked_at: string;
};

async function userIdByGoogleSub(googleSub: string): Promise<string | null> {
  const pool = getPool();
  if (!pool) return null;
  const { rows } = await pool.query(
    `SELECT id FROM users WHERE google_sub = $1`,
    [googleSub],
  );
  return rows[0]?.id ?? null;
}

// Mint a one-time code the user sends to a chat bot (Telegram/WhatsApp) to bind
// that channel to this account. Reuses a still-valid unused code so refreshing
// the page doesn't spawn a pile of codes.
export async function mintLinkCode(googleSub: string): Promise<string | null> {
  const pool = getPool();
  if (!pool) return null;
  const userId = await userIdByGoogleSub(googleSub);
  if (!userId) return null;

  const existing = await pool.query(
    `SELECT code FROM link_codes
      WHERE user_id = $1 AND used_at IS NULL AND expires_at > now()
      ORDER BY expires_at DESC LIMIT 1`,
    [userId],
  );
  if (existing.rows[0]?.code) return existing.rows[0].code as string;

  const code = "ARC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  await pool.query(
    `INSERT INTO link_codes (code, user_id, expires_at)
     VALUES ($1, $2, now() + interval '24 hours')`,
    [code, userId],
  );
  return code;
}

export async function getChannels(googleSub: string): Promise<Channel[]> {
  const pool = getPool();
  if (!pool) return [];
  const userId = await userIdByGoogleSub(googleSub);
  if (!userId) return [];
  const { rows } = await pool.query(
    `SELECT channel, platform_user_id, linked_at
       FROM channel_identities
      WHERE user_id = $1 ORDER BY linked_at`,
    [userId],
  );
  return rows as Channel[];
}
