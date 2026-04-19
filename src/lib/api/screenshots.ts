import { api } from "./client";
import type { CollectionsType } from "@/app/types/types";
import type { UpdateDescriptionResponse } from "@/app/types/api";
import { formatTagsQuery } from "./format-tags-query";
import axios from "axios";

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
    if (axios.isAxiosError(err)) {
      console.error(
        "getCollections failed",
        err.response?.status,
        err.response?.data ?? err.message
      );
    } else {
      console.error("getCollections failed", err);
    }
    return { screenshots: [], totalPages: 0 };
  }
}

export async function patchAddTagToCollection(
  tagId: number,
  screenshotId: number,
  userId: string,
  accessToken: string
) {
  return api.patch(
    `/screenshots/addTag`,
    { tagId, screenshotId, userId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export async function patchRemoveTagFromCollection(
  tagId: number,
  screenshotId: number | undefined,
  userId: string,
  accessToken: string
) {
  return api.patch(
    `/screenshots/removeTag`,
    { tagId, screenshotId, userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function deleteScreenshotRequest(
  screenshotId: number | undefined,
  userId: string,
  accessToken: string
) {
  return api.delete(`/screenshots/`, {
    data: {
      screenshotId,
      userId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function patchScreenshotDescription(
  screenShotId: number,
  description: string,
  userId: string,
  accessToken: string
): Promise<UpdateDescriptionResponse> {
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
  return res.data;
}
