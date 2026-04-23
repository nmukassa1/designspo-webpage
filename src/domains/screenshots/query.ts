"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import { queryKeys } from "@/domains/query-keys";
import {
  deleteScreenshotRequest,
  patchAddTagToCollection,
  patchRemoveTagFromCollection,
  patchScreenshotDescription,
} from "@/domains/screenshots/api";

type TagMutationInput = {
  tagId: number;
  screenshotId: number;
};

export function useAddTagToCollectionMutation() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: async ({ tagId, screenshotId }: TagMutationInput) => {
      if (!userId) throw new Error("User ID is required to add a tag.");
      return patchAddTagToCollection(tagId, screenshotId, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.byUser(userId),
      });
    },
  });
}

export function useRemoveTagFromCollectionMutation() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: async ({ tagId, screenshotId }: TagMutationInput) => {
      if (!userId) throw new Error("User ID is required to remove a tag.");
      return patchRemoveTagFromCollection(
        tagId,
        screenshotId,
        userId,
        accessToken || "",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.byUser(userId),
      });
    },
  });
}

export function useDeleteScreenshotMutation() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: async (screenshotId: number) => {
      if (!userId) throw new Error("User ID is required to delete a screenshot.");
      return deleteScreenshotRequest(screenshotId, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.byUser(userId),
      });
    },
  });
}

export function useUpdateDescriptionMutation() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: async ({ id, description }: { id: number; description: string }) => {
      if (!userId) throw new Error("User ID is required to update description.");
      return patchScreenshotDescription(id, description, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.byUser(userId),
      });
    },
  });
}

