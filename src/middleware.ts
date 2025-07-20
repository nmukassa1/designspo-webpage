// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/app/supabase/superbaseServer";

const protectedRoutes = ["/dashboard", "/dashboard/:path*"];

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const url = request.nextUrl;
  const { data } = await supabase.auth.getSession();

  if (
    !data.session &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    console.error("No session found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If session exists or the route is not protected, continue
  console.log("Session exists, continuing");
  return NextResponse.next();
}

export const config = {
  // matcher: ["/((?!_next|favicon.ico).*)"], // Match all routes except Next internals
  matcher: ["/dashboard", "/dashboard/:path*"],
};
