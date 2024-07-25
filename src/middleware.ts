import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const token = await getToken({req:request})
//   const url = request.nextUrl
  
//   // If user is authenticated and tries to access login-related pages, redirect to dashboard
//   if(token && (
//     url.pathname === '/sign-in' ||
//     url.pathname === '/signup' ||
//     url.pathname.startsWith('/verify') ||
//     url.pathname === '/'
//   )) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }
  
//   // If user is not authenticated and tries to access dashboard, redirect to sign-in
//   if(!token && url.pathname.startsWith('/dashboard')){
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }
  
//   // For all other cases, continue with the request
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/sign-in', '/signup', '/', '/dashboard/:path*', '/verify/:path*']
// }