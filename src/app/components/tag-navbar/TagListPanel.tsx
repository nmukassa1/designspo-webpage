"use client";
import CreateATagPlaceholder from "../EmptyTagPlaceholder";
import { useTagContext } from "../../context/TagContext";
import RenderNavTags from "./TagListItems";
import TagListItems from "./TagListItems";

function TagListPanel() {
  const { tags } = useTagContext();
  return (
    <nav className="tag-navbar overflow-scroll h-full relative mr-6">
      {tags.length === 0 ? <CreateATagPlaceholder /> : <TagListItems />}
    </nav>
  );
}

export default TagListPanel;
