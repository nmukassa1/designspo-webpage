import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  addTagToCollection,
  deleteTagFromCollection,
  updateDescription,
  deleteScreenshot,
} from "@/app/mutations";

export const useDrawerMutations = () => {
  const { userId, accessToken } = useAuthContext();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["collections", userId] });
  };

  const { mutate: addTag } = useMutation({
    mutationFn: (tagId: number) =>
      addTagToCollection(tagId, undefined, userId || "", accessToken || ""),
    onSuccess: invalidate,
  });

  const { mutate: removeTag } = useMutation({
    mutationFn: (tagId: number) =>
      deleteTagFromCollection(
        tagId,
        undefined,
        userId || "",
        accessToken || ""
      ),
    onSuccess: invalidate,
  });

  const { mutate: updateDescriptionMutation } = useMutation({
    mutationFn: async ({
      id,
      description,
    }: {
      id: number;
      description: string;
    }) => {
      const res = await updateDescription(
        id,
        description,
        userId || "",
        accessToken || ""
      );
      console.log("Update description response:", res);

      return res;
    },
    onSuccess: invalidate,
  });

  const { mutate: deleteScreenshotMutation } = useMutation({
    mutationFn: (id: number) =>
      deleteScreenshot(id, userId || "", accessToken || ""),
    onSuccess: invalidate,
  });

  return {
    addTag,
    removeTag,
    updateDescription: updateDescriptionMutation,
    deleteScreenshot: deleteScreenshotMutation,
  };
};
