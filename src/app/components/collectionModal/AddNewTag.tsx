import { addTagToCollection } from "@/app/mutations";
import { getTags } from "@/app/queries";
import { ScreenshotTag } from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

function AddNewTag({
  screenShotId,
  existingTags,
  userId,
}: {
  screenShotId: number;
  existingTags: ScreenshotTag[];
  userId: string;
}) {
  const queryClient = useQueryClient();

  const { data: tags } = useQuery({
    queryKey: ["tags", userId],
    queryFn: ({ queryKey }) => getTags(queryKey[1] as string),
  });

  // Filter out existing tags
  const filteredTags = tags?.filter(
    (tag) => !existingTags.map((t) => t.tagId).includes(tag.id)
  );

  // Mutation for adding tags
  const { mutate } = useMutation({
    mutationFn: (tagId: number) =>
      addTagToCollection(tagId, screenShotId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
    },
  });

  return (
    <div className="addTags mt-6">
      <h2 className="text-xl">Add Tags</h2>
      <div className="h-[3px] bg-white mt-4 mb-6"></div>
      <ul className="flex flex-col  max-h-[130px] overflow-scroll">
        {filteredTags?.map((tag) => (
          <li
            key={tag.id}
            className="shrink-0 text-lg flex items-center gap-2  justify-between"
          >
            <button
              onClick={() => mutate(tag.id)}
              className="w-full flex justify-between px-4 py-2 hover:bg-white/10 transition-colors duration-200 ease-in-out"
            >
              <span>{tag.name}</span>
              <div className="text-green-500">
                <Check />
              </div>
            </button>
            {/* </form> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddNewTag;
