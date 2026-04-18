import { api } from "./client";
import type { CollectionsType, Tag } from "@/app/types/types";

function formatTagsQuery(tags: string[] | string | null): string {
  if (tags === null) {
    return "";
  }
  const tagPairs = Array.isArray(tags)
    ? tags.map((tag) => `tag=${tag}`)
    : [`tag=${tags}`];
  return tagPairs.join("&");
}

/** Client-side API fetch for TanStack Query (no server-action round trip). */
export async function getCollections(
  userId: string | null,
  tags: string[] | string | null,
  page: number | undefined,
  accessToken: string | null
): Promise<CollectionsType> {
  try {
    const tagQuery = formatTagsQuery(tags);
    const query = `page=${page}&${tagQuery}`;
    const response = await api.get(`/screenshots/${userId}?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error getting screenshots", err);
    return { screenshots: [], totalPages: 0 };
  }
}

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
