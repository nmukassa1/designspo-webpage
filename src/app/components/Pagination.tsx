"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDashboardContext } from "../context/DashboardContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCollections } from "@/lib/api/collections";
import { useAuthContext } from "../context/AuthContext";

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
          >
            <button className="bg-[#262626] p-2 rounded-sm text-white">
              <ChevronLeft />
            </button>
          </Link>
        )}

        {pageNumber < totalPages && (
          <Link
            href={`/dashboard?${tagQuery ? `tag=${tagQuery}&` : ""}page=${
              pageNumber + 1
            }`}
            onMouseEnter={() => prefetchPage(pageNumber + 1)}
            onFocus={() => prefetchPage(pageNumber + 1)}
          >
            <button className="bg-[#262626] p-2 rounded-sm text-white">
              <ChevronRight />
            </button>
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
