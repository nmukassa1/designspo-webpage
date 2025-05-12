import { useAuthContext } from "@/app/context/AuthContext";
import { useTagContext } from "@/app/context/TagContext";
import { addTagToCollection } from "@/app/mutations";
import { ScreenshotTag } from "@/app/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useState } from "react";

function AddNewTag({
  screenShotId,
  existingTags,
}: {
  screenShotId: number;
  existingTags: ScreenshotTag[];
}) {
  const { userId } = useAuthContext();
  const { tags } = useTagContext();
  const queryClient = useQueryClient();

  const [activeTagId, setActiveTagId] = useState<number | null>(null);

  const filteredTags = tags?.filter(
    (tag) => !existingTags.map((t) => t.tagId).includes(tag.id)
  );

  const { mutate } = useMutation({
    mutationFn: async (tagId: number) => {
      if (!userId) throw new Error("User ID is required to add a tag.");
      setActiveTagId(tagId); // show loading for this tag
      return await addTagToCollection(tagId, screenShotId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections", userId] });
      setActiveTagId(null); // reset after success
    },
    onError: () => {
      setActiveTagId(null); // reset on error too
    },
  });

  return (
    <div className="addTags mt-6">
      <h2 className="text-xl">Add Tags</h2>
      <div className="h-[3px] bg-white mt-4 mb-6"></div>
      <ul className="flex flex-col max-h-[130px] overflow-scroll">
        {filteredTags?.map((tag) => (
          <li
            key={tag.id}
            className="shrink-0 text-lg flex items-center gap-2 justify-between relative"
          >
            {activeTagId === tag.id && (
              <span className="absolute left-0 top-0 h-full w-full animate-progress bg-[linear-gradient(45deg,_rgba(0,255,0,0.3)_25%,_transparent_25%,_transparent_50%,_rgba(0,255,0,0.3)_50%,_rgba(0,255,0,0.3)_75%,_transparent_75%,_transparent)] bg-[length:40px_40px] z-10 rounded-md" />
            )}
            <button
              onClick={() => mutate(tag.id)}
              className="w-full flex justify-between px-4 py-2 hover:bg-white/10 transition-colors duration-200 ease-in-out relative z-20"
              disabled={activeTagId !== null} // optional: disable all during loading
            >
              <span>{tag.name}</span>
              <div className="text-green-500">
                <Check />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddNewTag;
