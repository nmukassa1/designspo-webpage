// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/app/supabase/superbaseServer";

const protectedRoutes = ["/dashboard", "/dashboard/:path*"];

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const url = request.nextUrl;
  const { data } = await supabase.auth.getSession();

  const sessionCookie = request.cookies.get("otp_token");
  const sessionValue = sessionCookie?.value;
  const isLoginPage = url.pathname === "/login";
  const isProtected = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // 🔒 Block access to /login if no valid OTP token
  if (isLoginPage && sessionValue !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
    console.error("No valid OTP token, blocking /login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔒 Block access to protected pages if no Supabase session
  if (isProtected && !data.session) {
    console.error("No Supabase session, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ All conditions passed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
