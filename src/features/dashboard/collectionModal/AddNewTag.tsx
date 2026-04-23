import { useTagContext } from "@/app/context/TagContext";
import { ScreenshotTag } from "@/app/types/types";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAddTagToCollectionMutation } from "@/lib/query/screenshots";

function AddNewTag({
  screenShotId,
  existingTags,
}: {
  screenShotId: number;
  existingTags: ScreenshotTag[];
}) {
  const { tags } = useTagContext();

  const [activeTagId, setActiveTagId] = useState<number | null>(null);

  const filteredTags = tags?.filter(
    (tag) => !existingTags.map((t) => t.tagId).includes(tag.id)
  );

  const { mutate } = useAddTagToCollectionMutation();

  const handleAddTag = (tagId: number) => {
    setActiveTagId(tagId);
    mutate(
      { tagId, screenshotId: screenShotId },
      {
        onSettled: () => setActiveTagId(null),
      },
    );
  };

  return (
    <>
      {filteredTags?.map((tag) => (
        <li
          key={tag.id}
          className="shrink-0 text-lg flex items-center gap-2 justify-between relative"
        >
          <TagActionAnimation tagId={tag.id} activeTagId={activeTagId} />
          <button
            type="button"
            onClick={() => handleAddTag(tag.id)}
            className="relative z-20 flex w-full items-center rounded-md px-4 py-4 text-foreground transition-colors duration-200 hover:bg-muted disabled:opacity-60"
            disabled={activeTagId !== null} // optional: disable all during loading
          >
            <div
              className="checkbox mr-2 size-4 rounded-sm border-2 border-border"
              aria-hidden
            />
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
