import { useTagContext } from "../../context/TagContext";
import NewTag from "../NewTag";
import TagNavigationSkeleton from "./TagNavigationSkeleton";
import TagListPanel from "./TagListPanel";

export default function TagNavigationPanel() {
  const { isLoading } = useTagContext();
  return (
    <div className="tag-navbar-container">
      {isLoading ? (
        <TagNavigationSkeleton />
      ) : (
        <>
          <div className="flex items-center overflow-scroll z-[99999]">
            <TagListPanel />
            <NewTag />
          </div>
        </>
      )}
    </div>
  );
}
