"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Collections from "@/app/components/Collections";
import ExmptyCollectionPlaceholder from "@/app/components/EmptyCollectionPlaceholder";
import { useSearchParams } from "next/navigation";
import { Screenshot } from "@/app/types/types";
import { createClient } from "@/app/supabase/supabaseClient";
import SkeletonCard from "@/app/components/Card/SkeletonCard";
import { getCollections } from "@/app/queries";

interface DashboardPageClientProps {
  userId: string;
}

export default function DashboardPageClient({
  userId,
}: DashboardPageClientProps) {
  const [collections, setCollections] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      try {
        const data = await getCollections(userId, tag ?? "", page);
        setCollections(data as Screenshot[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    }

    fetchCollections();
  }, [tag, page]);

  return (
    <div>
      <div id="dashboard">
        <Sidebar userId={userId} />
        <div className="h-full px-4 lg:ml-[18%]">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            All your design inspirations in one spot
          </h1>

          {loading ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </ul>
          ) : collections.length === 0 ? (
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
    </div>
  );
}
