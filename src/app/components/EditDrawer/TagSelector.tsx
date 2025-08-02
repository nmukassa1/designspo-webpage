import { useTagContext } from "@/app/context/TagContext";
import { useDrawerMutations } from "./useDrawerMutations";
import { useEffect, useState } from "react";
import { useEditDrawerContext } from "./EditDrawerContext";

export default function TagSelector() {
  const { tags } = useTagContext();
  const { itemSelected } = useEditDrawerContext();
  const [tagsAssociated, setTagsAssociated] = useState<Number[]>([]);
  const { addTag, removeTag } = useDrawerMutations();

  useEffect(() => {
    if (!itemSelected?.tags || !tags) {
      setTagsAssociated([]);
      return;
    }
    const tagIds = itemSelected.tags.map((tag) => tag.tagId);
    setTagsAssociated(tagIds);

    return () => {
      setTagsAssociated([]);
    };
  }, [tags, itemSelected?.tags]);

  return (
    <div>
      <h2 className="mt-4">Tags:</h2>
      <div className="flex flex-wrap gap-2 mt-2 max-h-[170px] overflow-y-scroll">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`${
              tagsAssociated.includes(tag.id)
                ? "bg-black text-white"
                : "border-1 border-black text-black"
            } px-3 py-1 rounded-full text-sm grow-0 shrink-1`}
            onClick={() => {
              const inList = tagsAssociated.includes(tag.id);
              inList ? removeTag(tag.id) : addTag(tag.id);
              setTagsAssociated((prev) =>
                inList ? prev.filter((t) => t !== tag.id) : [...prev, tag.id]
              );
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
