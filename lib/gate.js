// gate (lib/gate.js) · updated 13.10.2026 15:50 (Asia/Jerusalem)
// Server-only login gate. Credentials come from Vercel env (GATE_EMAIL / GATE_PASS) with a fallback.
export const COOKIE = 'splan_gate';
export const GATE_EMAIL = (process.env.GATE_EMAIL || 'yaronlivne11@gmail.com').trim().toLowerCase();
export const GATE_PASS = process.env.GATE_PASS || '1808';
const SECRET = process.env.GATE_SECRET || 'splan-yaron-livne-2026';

export async function gateToken() {
  const data = new TextEncoder().encode(`${GATE_EMAIL}:${GATE_PASS}:${SECRET}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function checkCredentials(email, pass) {
  return String(email || '').trim().toLowerCase() === GATE_EMAIL && String(pass || '') === GATE_PASS;
}
