import type { NextRequest } from "next/server";
import { authMiddleware } from "./src/app/supabase/supabaseMiddleware";

/** Refreshes Supabase cookies on dashboard navigation; protects `/dashboard/*`. */
export async function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
