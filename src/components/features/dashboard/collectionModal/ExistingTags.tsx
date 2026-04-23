import { useAuthContext } from "@/app/context/AuthContext";
import { ScreenshotTag } from "@/app/types/types";
import { useState } from "react";
import { useRemoveTagFromCollectionMutation } from "@/domains/screenshots/query";

function ExistingTags({
  tags,
  screenShotId,
}: {
  tags: ScreenshotTag[];
  screenShotId: number;
}) {
  const { userId } = useAuthContext();
  const { mutate } = useRemoveTagFromCollectionMutation();

  const [activeTagId, setActiveTagId] = useState<number | null>(null);

  const handleRemoveTag = (id: number) => {
    setActiveTagId(id);
    mutate(
      { tagId: id, screenshotId: screenShotId },
      {
        onError: () => {
          console.error("Error removing tag from collection.");
        },
        onSettled: () => setActiveTagId(null),
      },
    );
  };

  return (
    <>
      {/* <div className="h-[3px] bg-white mt-4 mb-6"></div> */}
      {tags.map((tag) => (
        <li key={tag.tag.id} className=" text-lg relative">
          <TagActionAnimation activeTagId={activeTagId} tagId={tag.tag.id} />
          <button
            type="button"
            onClick={() => userId && handleRemoveTag(tag.tag.id)}
            className="relative z-20 flex w-full items-center rounded-md bg-muted px-4 py-4 text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            disabled={activeTagId !== null}
          >
            <div
              className="checkbox mr-2 size-4 rounded-sm bg-primary"
              aria-hidden
            />
            <span>{tag.tag.name}</span>
          </button>
        </li>
      ))}
    </>
  );
}

export default ExistingTags;

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
        <span className="absolute left-0 top-0 h-full w-full animate-progress bg-[linear-gradient(45deg,_rgba(255,0,0,0.3)_25%,_transparent_25%,_transparent_50%,_rgba(255,0,0,0.3)_50%,_rgba(255,0,0,0.3)_75%,_transparent_75%,_transparent)] bg-[length:40px_40px] z-10 rounded-md" />
      )}
    </>
  );
}
