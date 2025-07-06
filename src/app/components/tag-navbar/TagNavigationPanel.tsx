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
          <h3 className="text-sm text-gray-600">Tags:</h3>
          <div className="flex items-center z-50 pb-2">
            <TagListPanel />
            <NewTag />
          </div>
        </>
      )}
    </div>
  );
}
