import { deleteTag } from "@/app/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DeleteTag({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (tagId: number) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      return deleteTag(tagId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
    },
  });

  return (
    <div className="fixed right-[-37px] top-1/2 -translate-y-1/2 -rotate-[90deg] rounded-t-[5px] overflow-hidden bg-[#393535]">
      <button
        className="h-full w-full py-[5px] px-[16px] text-white"
        onClick={() => {
          if (!userId) throw new Error("User ID is required to delete a tag.");
          console.log("Delete tag clicked");
        }}
      >
        Delete Tag
      </button>
    </div>
  );
}

export default DeleteTag;
