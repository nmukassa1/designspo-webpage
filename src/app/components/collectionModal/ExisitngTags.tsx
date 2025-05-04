import { deleteTagFromCollection } from "@/app/mutations";
import { ScreenshotTag, Tag } from "@/app/types/types";
import { Trash } from "lucide-react";

function ExistingTags({
  tags,
  screenShotId,
  userId,
}: {
  tags: ScreenshotTag[];
  screenShotId: number;
  userId: string;
}) {
  return (
    <div className="existingTags mt-6">
      <h2 className="text-xl">Tags</h2>
      <div className="h-[3px] bg-white mt-4 mb-6"></div>
      <ul className="flex flex-col max-h-[80px] overflow-scroll">
        {tags.map((tag) => (
          <li
            key={tag.tag.id}
            className="shrink-0 text-lg flex items-center justify-between"
          >
            <button
              onClick={() =>
                deleteTagFromCollection(tag.tag.id, screenShotId, userId)
              }
              className="w-full flex justify-between px-4 py-2 hover:bg-white/10 transition-colors duration-200 ease-in-out"
            >
              <span>{tag.tag.name}</span>
              <div className="text-red-500">
                <Trash />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExistingTags;
