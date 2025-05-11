"use server";
import { api } from "./api";
import { CollectionsType, Screenshot, Tag } from "./types/types";

export const getCollections = async (
  userId: string | null,
  tags: string[] | string | number | null,
  page: number | undefined
): Promise<CollectionsType> => {
  console.log("Fetching collections from the server...");
  try {
    let formattedTags;
    if (tags === null) {
      formattedTags = "";
    } else {
      const tagPairs = Array.isArray(tags)
        ? tags.map((tag) => `tag=${tag}`)
        : [`tag=${tags}`];
      formattedTags = tagPairs.join("&");
    }

    const query = `page=${page}&${formattedTags}`;

    const response = await api.get(`/screenshots/${userId}?${query}`, {
      withCredentials: true,
    });
    console.log(response.data);

    return response.data; // Return the result directly
  } catch (err) {
    console.log(err);
    return { screenshots: [], totalPages: 0 }; // Return an empty array in case of error
  }
};

export const getTags = async (userId: string | null): Promise<Tag[]> => {
  try {
    const response = await api.get("/tags/" + userId);
    const result: Tag[] = response.data;
    // console.log(result);
    return result; // Return the result
  } catch (err) {
    console.log(err);
    return []; // Return an empty array in case of error
  }
};
