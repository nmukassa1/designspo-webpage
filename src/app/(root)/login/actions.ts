"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/supabaseServer";
import { safeRedirectPath } from "@/lib/safe-redirect";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    return { error: error.message };
  }

  // Session is persisted via @supabase/ssr cookie handlers on createServerClient
  revalidatePath("/", "layout");
  redirect(safeRedirectPath(formData.get("next") as string | null));
}
