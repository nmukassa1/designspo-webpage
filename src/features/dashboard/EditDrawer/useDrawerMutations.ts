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
    mutationFn: async ({
      tagId,
      screenshotId,
    }: {
      tagId: number;
      screenshotId: number;
    }) => {
      return await addTagToCollection(
        tagId,
        screenshotId,
        userId || "",
        accessToken || ""
      );
    },
    onSuccess: () => {
      invalidate(); // Refresh query cache
    },
  });

  const { mutate: removeTag } = useMutation({
    mutationFn: async ({
      tagId,
      screenshotId,
    }: {
      tagId: number;
      screenshotId: number;
    }): Promise<any> => {
      return await deleteTagFromCollection(
        tagId,
        screenshotId,
        userId || "",
        accessToken || ""
      );
    },
    onSuccess: () => {
      invalidate(); // Refresh query cache
    },
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
