"use server";
import { revalidatePath } from "next/cache";
import { api } from "./api";
import { createClient } from "./supabase/superbaseServer";
// import { supabase } from "./supabase/supabaseClient";

export async function deleteTag(tagId: number, userId: string) {
  try {
    const result = await api.delete(`/tags/`, {
      data: {
        tagId,
        userId,
      },
    });
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTagByName(tagName: string, userId: string) {
  try {
    const result = await api.delete(`/tags/delete/`, {
      data: {
        tagName,
        userId,
      },
    });
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function addTag(name: string, userId: string) {
  try {
    const result = await api.post(`/tags/`, {
      name,
      userId,
    });
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function addTagToCollection(
  tagId: number,
  screenshotId: number,
  userId: string
) {
  try {
    const result = await api.patch(`/screenshots/addTag`, {
      tagId,
      screenshotId,
      userId,
    });
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTagFromCollection(
  tagId: number,
  screenshotId: number,
  userId: string
) {
  console.log(tagId, screenshotId, userId);

  try {
    const result = await api.patch(`/screenshots/removeTag`, {
      tagId,
      screenshotId,
      userId,
    });
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteScreenshot(
  screenshotId: number,
  userId: string,
  accessToken: string
) {
  try {
    const result = await api.delete(`/screenshots/`, {
      data: {
        screenshotId,
        userId,
        accessToken,
      },
    });
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
