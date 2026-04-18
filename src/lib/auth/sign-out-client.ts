"use client";

import { createClient } from "@/app/supabase/supabaseClient";

/**
 * Clears Supabase session in the browser, then performs a full page load to
 * `/login`. Full navigation avoids Next.js App Router + `router.refresh()`
 * races after auth changes ("An unexpected response was received from the server").
 */
export async function signOutAndRedirectToLogin(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  window.location.assign("/login");
}
