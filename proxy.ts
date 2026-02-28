import type { NextRequest } from "next/server";
import { authMiddleware } from "./src/app/supabase/supabaseMiddleware";

export function proxy(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

