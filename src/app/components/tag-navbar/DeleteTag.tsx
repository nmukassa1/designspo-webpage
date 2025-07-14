import { useAuthContext } from "@/app/context/AuthContext";
import { deleteTagByName } from "@/app/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function DeleteTag({ tagName }: { tagName: string }) {
  const queryClient = useQueryClient();
  const navigate = useRouter();

  const { userId, accessToken } = useAuthContext(); // Assuming you have a context to get the user ID

  const { mutate } = useMutation({
    mutationFn: (tagName: string) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      return deleteTagByName(tagName, userId, accessToken || ""); // Ensure accessToken is provided
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
      navigate.push("/dashboard"); // Redirect to the home page after deletion
    },
  });

  return (
    <div className="fixed right-[-37px] top-1/2 -translate-y-1/2 -rotate-[90deg] rounded-t-[5px] overflow-hidden bg-[#393535]">
      <button
        className="h-full w-full py-[5px] px-[16px] text-white"
        onClick={() => {
          if (!userId) throw new Error("User ID is required to delete a tag.");
          mutate(tagName);
        }}
      >
        Delete Tag
      </button>
    </div>
  );
}

export default DeleteTag;
