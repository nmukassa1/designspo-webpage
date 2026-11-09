"use server";
import { createClient } from "@/app/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const origin = (await headers()).get("origin");
  const { error } = await supabase.auth.signUp({
    ...data,
    options: origin
      ? { emailRedirectTo: `${origin}/auth/confirm?next=/dashboard` }
      : undefined,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/confirmation");
}
