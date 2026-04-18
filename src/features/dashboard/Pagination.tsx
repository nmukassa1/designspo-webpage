"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDashboardContext } from "@/app/context/DashboardContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCollections } from "@/lib/api/screenshots";
import { useAuthContext } from "@/app/context/AuthContext";

function Pagination() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  const { pageNumber = 1, collections } = useDashboardContext();
  const totalPages = collections?.totalPages || 1;
  const searchParams = useSearchParams();

  const [tagQuery, setTagQuery] = useState("");

  useEffect(() => {
    setTagQuery(searchParams.get("tag") || "");
  }, [searchParams.toString()]);

  const prefetchPage = (page: number) => {
    queryClient.prefetchQuery({
      queryKey: ["collections", userId, tagQuery, page],
      queryFn: () => getCollections(userId, tagQuery, page, accessToken!),
      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <div className="mt-8 mx-auto flex items-center flex-col">
      <div className="flex items-center gap-4">
        {pageNumber > 1 && (
          <Link
            href={`/dashboard?${tagQuery ? `tag=${tagQuery}&` : ""}page=${
              pageNumber - 1
            }`}
            onMouseEnter={() => prefetchPage(pageNumber - 1)}
            onFocus={() => prefetchPage(pageNumber - 1)}
            className="inline-flex items-center justify-center rounded-sm bg-foreground p-2 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </Link>
        )}

        {pageNumber < totalPages && (
          <Link
            href={`/dashboard?${tagQuery ? `tag=${tagQuery}&` : ""}page=${
              pageNumber + 1
            }`}
            onMouseEnter={() => prefetchPage(pageNumber + 1)}
            onFocus={() => prefetchPage(pageNumber + 1)}
            className="inline-flex items-center justify-center rounded-sm bg-foreground p-2 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Next page"
          >
            <ChevronRight className="size-5" aria-hidden />
          </Link>
        )}
      </div>
      <span>
        Page {pageNumber} of {totalPages}
      </span>
    </div>
  );
}

export default Pagination;
