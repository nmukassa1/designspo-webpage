"use server";

import { supabase } from "@/app/supabase";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Replace this with real auth logic (e.g., Supabase, DB lookup, etc.)
  if (typeof email === "string" && typeof password === "string") {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log("✅ Login successful!", data);
      //   redirect("/dashboard");
      return { sucsess: true, redirect: "/dashboard" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Login failed" };
    }
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}
