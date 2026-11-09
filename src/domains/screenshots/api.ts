import axios from "axios";
import type { CollectionsType } from "@/app/types/types";
import type { UpdateDescriptionResponse } from "@/app/types/api";
import { api } from "@/domains/shared/http-client";
import { formatTagsQuery } from "@/domains/screenshots/format-tags-query";

/** Client-side API fetch for TanStack Query (no server-action round trip). */
export async function getCollections(
  userId: string | null,
  tags: string[] | string | null,
  page: number | undefined,
): Promise<CollectionsType> {
  try {
    const tagQuery = formatTagsQuery(tags);
    const query = `page=${page}&${tagQuery}`;
    const response = await api.get(`/screenshots/${userId}?${query}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "getCollections failed",
        err.response?.status,
        err.response?.data ?? err.message,
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
) {
  return api.patch(`/screenshots/addTag`, { tagId, screenshotId, userId });
}

export async function patchRemoveTagFromCollection(
  tagId: number,
  screenshotId: number | undefined,
  userId: string,
) {
  return api.patch(`/screenshots/removeTag`, { tagId, screenshotId, userId });
}

export async function deleteScreenshotRequest(
  screenshotId: number | undefined,
  userId: string,
) {
  return api.delete(`/screenshots/`, {
    data: {
      screenshotId,
      userId,
    },
  });
}

export async function patchScreenshotDescription(
  screenShotId: number,
  description: string,
  userId: string,
): Promise<UpdateDescriptionResponse> {
  const res = await api.patch("/screenshots/update-description", {
    id: screenShotId,
    description: description.trim(),
    userId,
  });
  return res.data;
}
