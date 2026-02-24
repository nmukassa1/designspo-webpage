"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/app/supabase/superbaseServer";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    return { error: error.message };
  }

  // Set user_id and access_token in secure cookies
  (
    await // Set user_id and access_token in secure cookies
    cookies()
  ).set({
    name: "user_id",
    value: user?.user?.id || "",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  (await cookies()).set({
    name: "access_token",
    value: user?.session?.access_token || "",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
