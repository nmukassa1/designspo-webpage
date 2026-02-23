import { useDashboardContext } from "../context/DashboardContext";
import { Screenshot } from "../types/types";
import Card from "./Card";
import Pagination from "./Pagination";
import SkeletonCard from "./Card/SkeletonCard";
import ExmptyCollectionPlaceholder from "./EmptyCollectionPlaceholder";

function Collections() {
  const { collections, isLoading, isFetching } = useDashboardContext();

  const renderCards = (items: Screenshot[]) => (
    <div className="relative">
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-2">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <p className="text-sm text-gray-600">Updating...</p>
          </div>
        </div>
      )}
      <ul className={`mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6 ${isFetching && !isLoading ? 'opacity-60' : ''}`}>
        {items.map((item: Screenshot) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );

  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </ul>
    );
  }
  return (
    <>
      {collections && collections.screenshots.length > 0 ? (
        <>
          {renderCards(collections.screenshots)}
          <Pagination />
        </>
      ) : (
        <>
          <ExmptyCollectionPlaceholder />
        </>
      )}
    </>
  );
}

export default Collections;
