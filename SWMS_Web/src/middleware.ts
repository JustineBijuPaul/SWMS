import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based route protection
    if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
      if (token?.role !== 'ADMIN' && token?.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url));
      }
    }

    if (path.startsWith('/worker') && path !== '/admin/workforce') {
      if (token?.role !== 'WORKER' && token?.role !== 'ADMIN' && token?.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url));
      }
    }

    if (path.startsWith('/contractor')) {
      if (token?.role !== 'CONTRACTOR' && token?.role !== 'ADMIN' && token?.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url));
      }
    }

    if (path.startsWith('/state-dashboard')) {
      if (token?.role !== 'STATE_ADMIN' && token?.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url));
      }
    }

    if (path.startsWith('/central-dashboard')) {
      if (token?.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/citizen/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/worker/:path*',
    '/contractor/:path*',
    '/state-dashboard/:path*',
    '/central-dashboard/:path*',
    '/report/:path*',
    '/notifications/:path*',
  ],
};
