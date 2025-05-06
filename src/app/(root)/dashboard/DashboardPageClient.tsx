"use client";
import Sidebar from "@/app/components/Sidebar";
import Collections from "@/app/components/Collections";
import ExmptyCollectionPlaceholder from "@/app/components/EmptyCollectionPlaceholder";
import { useSearchParams } from "next/navigation";
import { Screenshot } from "@/app/types/types";
import SkeletonCard from "@/app/components/Card/SkeletonCard";
import { getCollections } from "@/app/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface DashboardPageClientProps {
  userId: string;
}

export default function DashboardPageClient({
  userId,
}: DashboardPageClientProps) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const queryClient = useQueryClient();

  const {
    data: collections = [] as Screenshot[],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["collections", userId, tag, page],
    queryFn: () => getCollections(userId, tag ?? "", page),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });

  console.log(
    "Cached data:",
    queryClient.getQueryData(["collections", userId, tag, page])
  );

  return (
    <div id="dashboard">
      <Sidebar userId={userId} />
      <div className="h-full px-4 lg:ml-[18%]">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          All your design inspirations in one spot
        </h1>

        {isLoading ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ul>
        ) : Array.isArray(collections) && collections.length === 0 ? (
          <ExmptyCollectionPlaceholder />
        ) : (
          <Collections
            collections={collections}
            pageQuery={page}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}
