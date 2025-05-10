import { useDashboardContext } from "../context/DashboardContext";
import { CollectionsType, Screenshot } from "../types/types";
import Card from "./Card";
import SkeletonCard from "./Card/SkeletonCard";
import Pagination from "./Pagination";

interface CollectionsProps {
  // collections: CollectionsType | Screenshot[];
  pageQuery?: number;
  userId: string;
  loading?: boolean;
}

function Collections({
  // collections,
  pageQuery = 1,
  userId,
  loading = false,
}: CollectionsProps) {
  const { collections } = useDashboardContext();

  const renderCards = (items: Screenshot[]) => (
    <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <Card key={item.id} item={item} userId={userId} />
      ))}
    </ul>
  );

  const renderSkeletons = (count: number) => (
    <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  );

  if (loading) {
    return (
      <div>
        {renderSkeletons(6)}
        {/* Optional: You could add a fake Pagination skeleton */}
      </div>
    );
  }

  // If using paginated response with screenshots and totalPages
  if (collections) {
    const { screenshots, totalPages } = collections;

    return (
      <div>
        {renderCards(screenshots)}
        <Pagination pageQuery={pageQuery} totalPages={totalPages} />
      </div>
    );
  }

  // If it's just an array of screenshots (e.g. from client-side fetch)
  if (Array.isArray(collections)) {
    return <div>{renderCards(collections)}</div>;
  }

  return null;
}

export default Collections;
