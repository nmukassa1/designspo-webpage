import { Collections as jj, Screenshot, searchParams } from "../types/types";
import Card from "./Card";
import Pagination from "./Pagination";

interface CollectionsProps {
  collections: jj | [];
  pageQuery?: number;
  userId: string;
}

async function Collections({
  collections,
  pageQuery = 1,
  userId,
}: CollectionsProps) {
  if (!Array.isArray(collections) && collections.screenshots) {
    const { screenshots, totalPages } = collections;

    if (!screenshots) return;

    // Reverse the collections array to render from the last element first
    const reversedCollections = screenshots.reverse();

    return (
      <div>
        <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {reversedCollections.map((collection: Screenshot) => (
            <Card key={collection.id} item={collection} userId={userId} />
          ))}
        </ul>

        <Pagination pageQuery={pageQuery} totalPages={totalPages} />
      </div>
    );
  }

  return null;
}

export default Collections;
