"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/supabaseServer";
import { deleteAccountRequest } from "@/lib/api/account";
import {
  deleteScreenshotRequest,
  patchAddTagToCollection,
  patchRemoveTagFromCollection,
  patchScreenshotDescription,
} from "@/lib/api/screenshots";
import {
  deleteTagByNameRequest,
  postTag,
} from "@/lib/api/tags";

export async function deleteTagByName(
  tagName: string,
  userId: string,
  accessToken: string
) {
  try {
    const result = await deleteTagByNameRequest(tagName, userId, accessToken);
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function addTag(
  name: string,
  userId: string,
  accessToken: string
) {
  try {
    const result = await postTag(name, userId, accessToken);
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function addTagToCollection(
  tagId: number,
  screenshotId: number,
  userId: string,
  accessToken: string
) {
  try {
    const result = await patchAddTagToCollection(
      tagId,
      screenshotId,
      userId,
      accessToken
    );

    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTagFromCollection(
  tagId: number,
  screenshotId: number | undefined,
  userId: string,
  accessToken: string
) {
  try {
    const result = await patchRemoveTagFromCollection(
      tagId,
      screenshotId,
      userId,
      accessToken
    );
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error("Error removing tag: ", error);
  }
}

export async function deleteScreenshot(
  screenshotId: number | undefined,
  userId: string,
  accessToken: string
) {
  try {
    const result = await deleteScreenshotRequest(
      screenshotId,
      userId,
      accessToken
    );
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export const updatePassword = async (
  password: string
): Promise<string | any> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: password,
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
  accessToken: string
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

export const updateDescription = async (
  screenShotId: number,
  description: string,
  userId: string,
  accessToken: string
) => {
  try {
    return await patchScreenshotDescription(
      screenShotId,
      description,
      userId,
      accessToken
    );
  } catch (error) {
    console.error("Error updating description:", error);
    throw error;
  }
};
