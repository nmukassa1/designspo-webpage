import { useTagContext } from "@/app/context/TagContext";
import NewTag from "../NewTag";
import TagNavigationSkeleton from "./TagNavigationSkeleton";
import TagListPanel from "./TagListPanel";

export default function TagNavigationPanel() {
  const { isFetching } = useTagContext();
  return (
    <div className="tag-navbar-container relative">
      {isFetching && !isFetching && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
      {isFetching ? (
        <TagNavigationSkeleton />
      ) : (
        <>
          <h3 className="text-sm text-gray-600">Tags:</h3>
          <div className="flex items-center z-50 pb-2 mt-2">
            <TagListPanel />
            <NewTag />
          </div>
        </>
      )}
    </div>
  );
}
