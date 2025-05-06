"use server";
import { api } from "./api";
import { Collections, Screenshot, Tag } from "./types/types";

export const getCollections = async (
  userId: string,
  tags: string[] | string | number | undefined,
  page: number
): Promise<Collections | []> => {
  console.log("Fetching collections from the server...");
  try {
    let formattedTags;
    if (tags === undefined) {
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
    return []; // Return an empty array in case of error
  }
};

export const getTags = async (userId: string): Promise<Tag[]> => {
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
