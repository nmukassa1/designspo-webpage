import { useDashboardContext } from "../context/DashboardContext";
import { Screenshot } from "../types/types";
import Card from "./Card";
import Pagination from "./Pagination";
import SkeletonCard from "./Card/SkeletonCard";
import ExmptyCollectionPlaceholder from "./EmptyCollectionPlaceholder";

function Collections() {
  const { collections, isLoading } = useDashboardContext();

  const renderCards = (items: Screenshot[]) => (
    <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
      {items.map((item: Screenshot) => (
        <Card key={item.id} item={item} />
      ))}
    </ul>
  );

  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {loadingMessage && (
          <div className="absolute w-full bg-[#262626] text-white text-center py-6 top-[80px] left-0">
            {loadingMessage}
          </div>
        )} */}
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
