// logout API (app/api/logout/route.js) · updated 13.10.2026 15:50 (Asia/Jerusalem)
import { NextResponse } from 'next/server';
import { COOKIE } from '../../../lib/gate';

export async function GET(req) {
  const res = NextResponse.redirect(new URL('/login', req.url));
  res.cookies.set(COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
