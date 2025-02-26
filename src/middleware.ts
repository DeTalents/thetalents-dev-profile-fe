import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/',
  '/dashboard',
  '/create-profile/client',
  '/create-profile/developer',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Only apply middleware logic to protected routes
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Only redirect if accessing a protected route without a token
  if (isProtectedRoute && !token) {
    // Create the redirect URL
    const redirectUrl = new URL('/login', request.url);

    // Add a parameter to prevent redirect loops
    redirectUrl.searchParams.set('from', pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // For all other routes, including /login, just proceed normally
  return NextResponse.next();
}

export const config = {
  // Be very specific about which routes the middleware applies to
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/create-profile/client',
    '/create-profile/developer',
    '/',
    '/:path',
  ],
};
