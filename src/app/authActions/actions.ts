"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/superbaseServer";

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  redirect("/login");
}
