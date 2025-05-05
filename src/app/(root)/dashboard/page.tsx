import { createClient } from "@/app/supabase/superbaseServer";
import { searchParams } from "../../types/types";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Collections from "@/app/components/Collections";
import { getCollections } from "@/app/queries";
import CollectionsPlaceholder from "@/app/components/CollectionsPlaceholder";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const searchQuery = await searchParams;
  const resolvedSearchQuery = searchQuery;
  const tagQuery = resolvedSearchQuery.tag;
  const pageQuery = searchQuery.page ? Number(searchQuery.page) : 1;

  const collections = await getCollections(data.user.id, tagQuery, pageQuery);

  // console.log(await searchParams);

  return (
    <div className="">
      <div id="dashboard" className="">
        <Sidebar userId={data.user.id} />
        <div className="h-full px-4 lg:ml-[18%]">
          <h1 className="text-4xl md:text-6xl font-bold">
            All your design inspirations in one spot
          </h1>
          {Array.isArray(collections) && collections.length === 0 ? (
            <CollectionsPlaceholder />
          ) : (
            <Collections
              collections={collections}
              pageQuery={pageQuery}
              userId={data.user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
