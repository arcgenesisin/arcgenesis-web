import { Pool } from "pg";

// Single shared pool against the SAME Postgres the internal engine (DocBridge)
// uses — one identity store for the client site and our side. Returns null when
// DATABASE_URL isn't configured yet, so login still works before the DB is
// wired; persistence is simply skipped with a warning until the URL is set.

let pool: Pool | null = null;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  }
  return pool;
}
