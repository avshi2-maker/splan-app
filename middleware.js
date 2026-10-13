// middleware (middleware.js) · updated 13.10.2026 15:50 (Asia/Jerusalem)
// Blocks every page and data file until the visitor logs in at /login
import { NextResponse } from 'next/server';
import { COOKIE, gateToken } from './lib/gate';

export async function middleware(req) {
  const token = req.cookies.get(COOKIE)?.value;
  if (token && token === (await gateToken())) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!login|api/login|_next/static|_next/image|favicon.ico).*)'],
};
