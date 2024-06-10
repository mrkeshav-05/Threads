import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    if (!auth) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
