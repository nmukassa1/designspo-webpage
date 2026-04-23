"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import { deleteTagByNameRequest, getTags, postTag } from "@/lib/api/tags";
import { queryKeys } from "@/lib/query/keys";

export function useTagsQuery(
  initialUserId: string | null,
  initialAccessToken: string | null,
) {
  const { userId: authUserId, accessToken: authAccessToken } = useAuthContext();
  const userId = authUserId ?? initialUserId;
  const accessToken = authAccessToken ?? initialAccessToken;

  return useQuery({
    queryKey: queryKeys.tags.byUser(userId, accessToken),
    queryFn: () => getTags(userId, accessToken),
    enabled: !!userId && !!accessToken,
  });
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: (name: string) => {
      if (!userId) throw new Error("User ID is required to add a tag.");
      return postTag(name, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}

export function useDeleteTagByNameMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  return useMutation({
    mutationFn: (tagName: string) => {
      if (!userId) throw new Error("User ID is required to delete a tag.");
      return deleteTagByNameRequest(tagName, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
      onSuccess?.();
    },
  });
}

