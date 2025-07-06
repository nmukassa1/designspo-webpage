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
    <>
      {filteredTags?.map((tag) => (
        <li
          key={tag.id}
          className="shrink-0 text-lg flex items-center gap-2 justify-between relative"
        >
          <TagActionAnimation tagId={tag.id} activeTagId={activeTagId} />
          <button
            onClick={() => mutate(tag.id)}
            className="w-full flex items-center px-4 py-4 rounded-md text-black  hover:bg-[#F6F6F6] transition-colors duration-200 ease-in-out relative z-20"
            disabled={activeTagId !== null} // optional: disable all during loading
          >
            <div className="checkbox h-4 w-4 border-2 border-black rounded-sm mr-2"></div>
            <span>{tag.name}</span>
          </button>
        </li>
      ))}
    </>
  );
}

export default AddNewTag;

function TagActionAnimation({
  activeTagId,
  tagId,
}: {
  activeTagId: number | null;
  tagId: number;
}) {
  return (
    <>
      {activeTagId === tagId && (
        <span className="absolute left-0 top-0 h-full w-full animate-progress bg-[linear-gradient(45deg,_rgba(0,255,0,0.3)_25%,_transparent_25%,_transparent_50%,_rgba(0,255,0,0.3)_50%,_rgba(0,255,0,0.3)_75%,_transparent_75%,_transparent)] bg-[length:40px_40px] z-10 rounded-md" />
      )}
    </>
  );
}
