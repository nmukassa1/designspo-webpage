import { useDashboardContext } from "@/app/context/DashboardContext";
import { Screenshot } from "@/app/types/types";
import Card from "./Card";
import Pagination from "./Pagination";
import SkeletonCard from "./Card/SkeletonCard";
import EmptyCollectionPlaceholder from "./EmptyCollectionPlaceholder";

function Collections() {
  const { collections, isFetching, isLoading } = useDashboardContext();

  const renderCards = (items: Screenshot[]) => (
    <div className="relative">
      <ul
        className={`mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6 ${isFetching && !isLoading ? "opacity-60" : ""}`}
      >
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
        <EmptyCollectionPlaceholder />
      )}
    </>
  );
}

export default Collections;
