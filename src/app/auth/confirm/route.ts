import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/supabase/supabaseServer";
import { safeRedirectPath } from "@/lib/safe-redirect";

/**
 * Landing route for Supabase email links (signup confirmation, password recovery).
 * Email templates should link to
 * `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=<type>&next=<path>`.
 * PKCE `?code=` links (default templates with `redirectTo`) are also accepted.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeRedirectPath(
    searchParams.get("next"),
    type === "recovery" ? "/reset-password" : "/dashboard",
  );

  const supabase = await createClient();

  let error: unknown = new Error("Missing token_hash or code");
  if (tokenHash && type) {
    ({ error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash }));
  } else if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  }

  if (!error) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const failure = new URL("/login", request.url);
  failure.searchParams.set("error", "link_invalid");
  return NextResponse.redirect(failure);
}
