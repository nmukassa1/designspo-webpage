"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/supabase/supabaseServer";
import { deleteAccountRequest } from "@/domains/account/api";

export const updatePassword = async (password: string): Promise<string | any> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw new Error(error.message);
    return "Password updated successfully";
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** Deletes the signed-in user's account. Identity comes from the session cookie, never the caller. */
export const deleteAccount = async (): Promise<string> => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Not signed in");

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Not signed in");

    await deleteAccountRequest(user.id, session.access_token);
    await supabase.auth.signOut({ scope: "local" });

    revalidatePath("/");
    return "Account deleted successfully";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

