import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname === '/';
  const isGoogleCallback = request.nextUrl.pathname === '/auth/google';

  // If trying to access auth page while logged in, redirect to profile
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile/developer', request.url));
  }

  // If trying to access protected pages without token, redirect to auth
  if (!token && !isAuthPage && !isGoogleCallback) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/auth/google'],
};
