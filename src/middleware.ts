// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/profile',
  '/profile/developer',
  '/profile/developer/create',
];
const authRoutes = ['/', '/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If accessing auth routes with a token, redirect to profile
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/profile/developer', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
