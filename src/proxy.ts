import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('better-auth.session_token');

  const isLoggedIn = !!session;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/devices') ||
    request.nextUrl.pathname.startsWith('/sectors') ||
    request.nextUrl.pathname.startsWith('/installations');

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/devices/:path*',
    '/sectors/:path*',
    '/installations/:path*',
  ],
};
