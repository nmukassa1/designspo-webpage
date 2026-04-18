import { api } from "./client";
import type { Tag } from "@/app/types/types";

export async function getTags(
  userId: string | null,
  accessToken: string | null
): Promise<Tag[]> {
  try {
    const response = await api.get("/tags/" + userId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function deleteTagByNameRequest(
  tagName: string,
  userId: string,
  accessToken: string
) {
  return api.delete(`/tags/delete/`, {
    data: { tagName, userId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function postTag(
  name: string,
  userId: string,
  accessToken: string
) {
  return api.post(
    `/tags/`,
    { name, userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
