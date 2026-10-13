// login API (app/api/login/route.js) · updated 13.10.2026 15:55 (Asia/Jerusalem)
import { NextResponse } from 'next/server';
import { COOKIE, gateToken, checkCredentials, gateConfigured } from '../../../lib/gate';

export async function POST(req) {
  if (!gateConfigured()) return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  let body = {};
  try { body = await req.json(); } catch (e) {}
  if (!checkCredentials(body.email, body.pass)) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await gateToken(), {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
