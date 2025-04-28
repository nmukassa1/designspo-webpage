// import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCollections } from "../queries";
import { Screenshot, searchParams } from "../types/types";
import Card from "./Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollectionsProps {
  searchParams: searchParams;
  userId: string;
}

async function Collections({ searchParams, userId }: CollectionsProps) {
  const searchQuery = searchParams;
  const tagQuery = searchQuery.tag;
  const pageQuery = searchQuery.page ? Number(searchQuery.page) : 1;

  const collections = await getCollections(
    // "8c43787a-6332-4f73-8ed3-f00a54f801e4",
    userId,
    tagQuery,
    pageQuery
  );

  if (!Array.isArray(collections) && collections.screenshots) {
    const { screenshots, totalPages } = collections;
    console.log(screenshots);

    if (!screenshots) return;

    // Reverse the collections array to render from the last element first
    const reversedCollections = screenshots.reverse();

    return (
      <div className="h-full px-4 lg:ml-[18%]">
        <h1 className="text-4xl md:text-6xl font-bold">
          All your design inspirations in one spot
        </h1>
        <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {reversedCollections.map((collection: Screenshot) => (
            <Card key={collection.id} item={collection} />
          ))}
        </ul>

        <div className="mt-8 mx-auto flex items-center flex-col">
          <div className="flex items-center gap-4">
            {pageQuery > 1 && (
              <Link href={`/dashboard?page=${pageQuery - 1}`}>
                <button className="bg-[#262626] p-2 rounded-sm text-white">
                  <ChevronLeft />
                </button>
              </Link>
            )}

            {pageQuery < totalPages && (
              <Link href={`/dashboard?page=${pageQuery + 1}`}>
                <button className="bg-[#262626] p-2 rounded-sm text-white">
                  <ChevronRight />
                </button>
              </Link>
            )}
          </div>
          <span>
            Page {pageQuery} of {totalPages}
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export default Collections;
