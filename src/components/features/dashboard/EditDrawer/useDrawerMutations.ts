import {
  useAddTagToCollectionMutation,
  useDeleteScreenshotMutation,
  useRemoveTagFromCollectionMutation,
  useUpdateDescriptionMutation,
} from "@/domains/screenshots/query";

export const useDrawerMutations = () => {
  const { mutate: addTag } = useAddTagToCollectionMutation();
  const { mutate: removeTag } = useRemoveTagFromCollectionMutation();
  const { mutate: updateDescriptionMutation } = useUpdateDescriptionMutation();
  const { mutate: deleteScreenshotMutation } = useDeleteScreenshotMutation();

  return {
    addTag,
    removeTag,
    updateDescription: updateDescriptionMutation,
    deleteScreenshot: deleteScreenshotMutation,
  };
};
