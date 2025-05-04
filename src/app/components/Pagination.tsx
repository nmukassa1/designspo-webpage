import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function Pagination({
  pageQuery,
  totalPages,
}: {
  pageQuery: number;
  totalPages: number;
}) {
  return (
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
  );
}

export default Pagination;
