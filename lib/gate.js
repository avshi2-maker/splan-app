// gate (lib/gate.js) · updated 13.10.2026 15:55 (Asia/Jerusalem)
// Server-only login gate. Credentials ONLY from Vercel env: GATE_EMAIL / GATE_PASS / GATE_SECRET.
// Missing env = gate closed for everyone (fail-closed).
export const COOKIE = 'splan_gate';
const EMAIL = (process.env.GATE_EMAIL || '').trim().toLowerCase();
const PASS = process.env.GATE_PASS || '';
const SECRET = process.env.GATE_SECRET || '';

export const gateConfigured = () => Boolean(EMAIL && PASS && SECRET);

export async function gateToken() {
  if (!gateConfigured()) return null;
  const data = new TextEncoder().encode(`${EMAIL}:${PASS}:${SECRET}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function checkCredentials(email, pass) {
  if (!gateConfigured()) return false;
  return String(email || '').trim().toLowerCase() === EMAIL && String(pass || '') === PASS;
}
