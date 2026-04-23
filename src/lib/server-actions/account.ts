"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/supabase/supabaseServer";
import { deleteAccountRequest } from "@/lib/api/account";

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

export const deleteAccount = async (
  userId: string,
  accessToken: string,
): Promise<string | any> => {
  try {
    const supabase = await createClient();

    await deleteAccountRequest(userId, accessToken);
    await supabase.auth.signOut();

    revalidatePath("/");
    return "Account deleted successfully";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

