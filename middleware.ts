import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect root to /es
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - dashboard (admin panel)
     * - login (login page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|dashboard|login).*)",
  ],
};
