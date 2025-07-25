"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDashboardContext } from "../context/DashboardContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Pagination() {
  const { pageNumber = 1, collections } = useDashboardContext();
  const totalPages = collections?.totalPages || 1;
  const searchParams = useSearchParams();

  const [tagQuery, setTagQuery] = useState("");

  // get the current page query
  useEffect(() => {
    setTagQuery(searchParams.get("tag") || "");
  }, [searchParams.toString()]);

  return (
    <div className="mt-8 mx-auto flex items-center flex-col">
      <div className="flex items-center gap-4">
        {pageNumber > 1 && (
          <Link
            href={`/dashboard?${tagQuery ? `tag=${tagQuery}&` : ""}page=${
              pageNumber - 1
            }`}
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
