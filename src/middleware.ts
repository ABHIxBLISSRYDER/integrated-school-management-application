// Clerk middleware utilities for protecting routes and matching URLs
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Create an array of route matchers with allowed roles
// Each matcher corresponds to a route defined in routeAccessMap
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),             // Function to match this route
  allowedRoles: routeAccessMap[route],              // Roles allowed to access this route
}));

console.log(matchers); // Debug log of route matchers

// Main Clerk middleware
export default clerkMiddleware((auth, req) => {
  // Get session data from Clerk
  const { sessionClaims } = auth();

  // Extract user role from session metadata
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Loop through each route matcher
  for (const { matcher, allowedRoles } of matchers) {
    // If request matches a protected route and user is not authorized
    if (matcher(req) && !allowedRoles.includes(role!)) {
      // Redirect the user to their role-based dashboard or fallback page
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }

  // If all checks pass, allow request to continue normally
});

// Middleware config: defines which routes the middleware should apply to
export const config = {
  matcher: [
    // Apply to all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always apply middleware to API routes
    "/(api|trpc)(.*)",
  ],
};
