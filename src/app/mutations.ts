"use server";
import { revalidatePath } from "next/cache";
import { api } from "./api";
import { createClient } from "./supabase/superbaseServer";
import { headers } from "next/headers";
import { UpdateDescriptionResponse } from "./types/api";
// import { supabase } from "./supabase/supabaseClient";

// export async function deleteTagById(tagId: number, userId: string) {
//   try {
//     const result = await api.delete(`/tags/`, {
//       data: {
//         tagId,
//         userId,
//       },
//     });
//     revalidatePath("/");
//     return result.status;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function deleteTagByName(
  tagName: string,
  userId: string,
  accessToken: string
) {
  try {
    const result = await api.delete(`/tags/delete/`, {
      data: { tagName, userId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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
    const result = await api.post(
      `/tags/`,
      { name, userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    revalidatePath("/");
    return result.status;
  } catch (error) {
    console.error(error);
  }
}

export async function addTagToCollection(
  tagId: number,
  screenshotId: number | undefined,
  userId: string,
  accessToken: string
) {
  try {
    const result = await api.patch(
      `/screenshots/addTag`,
      { tagId, screenshotId, userId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
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
  console.log("Delete Tag Access Toke: ", accessToken);

  try {
    const result = await api.patch(
      `/screenshots/removeTag`,
      { tagId, screenshotId, userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
    const result = await api.delete(`/screenshots/`, {
      data: {
        screenshotId,
        userId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

export const deleteAccount = async (
  userId: string,
  accessToken: string
): Promise<string | any> => {
  try {
    const supabase = await createClient();

    const { data } = await api.delete(`/auth/delete-account/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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
): Promise<UpdateDescriptionResponse> => {
  try {
    const res = await api.patch(
      "/screenshots/update-description",
      {
        id: screenShotId,
        description: description.trim(),
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error updating description:", error);
    throw error;
  }
};
