import type { NextRequest } from "next/server";
import { authMiddleware } from "./src/app/supabase/supabaseMiddleware";

/** Refreshes Supabase session cookies on every page; protects signed-in-only routes. */
export async function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: [
    // Everything except Next internals, the backend proxy, and static files.
    "/((?!_next/static|_next/image|api/backend|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mov|mp4|txt|xml)$).*)",
  ],
};
