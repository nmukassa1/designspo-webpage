"use server";
import { api } from "./api";
import { CollectionsType, Tag } from "./types/types";

function formatTagsQuery(tags: string[] | string | null): String[] | string {
  let formattedTags;
  if (tags === null) {
    formattedTags = "";
  } else {
    const tagPairs = Array.isArray(tags)
      ? tags.map((tag) => `tag=${tag}`)
      : [`tag=${tags}`];
    formattedTags = tagPairs.join("&");
  }
  return formattedTags; // Ensure the function returns a value
}

export const getCollections = async (
  userId: string | null,
  tags: string[] | string | null,
  page: number | undefined,
  accessToken: string | null
): Promise<CollectionsType> => {
  try {
    const tagQuery = formatTagsQuery(tags);

    const query = `page=${page}&${tagQuery}`;

    const response = await api.get(`/screenshots/${userId}?${query}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Return the result directly
  } catch (err) {
    console.log("Error getting screenshots", err);
    return { screenshots: [], totalPages: 0 }; // Return an empty array in case of error
  }
};

export const getTags = async (
  userId: string | null,
  accessToken: string | null
): Promise<Tag[]> => {
  try {
    const response = await api.get("/tags/" + userId, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result: Tag[] = response.data;
    // console.log(result);
    return result; // Return the result
  } catch (err) {
    console.log(err);
    return []; // Return an empty array in case of error
  }
};
