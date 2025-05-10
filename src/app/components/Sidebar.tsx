"use client";

import { useEffect, useState } from "react";
import { getTags } from "../queries";
import NewTag from "./NewTag";
import SidebarNav from "./SidebarNav";
import { Tag } from "../types/types";
import SkeletonSidebar from "./sidebar/SkeletonSidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Sidebar({ userId }: { userId: string }) {
  // const [tags, setTags] = useState<Tag[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const {
    data: tags = [] as Tag[],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags", userId],
    queryFn: () => getTags(userId),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });

  console.log("Cached tag data:", queryClient.getQueryData(["tags", userId]));

  // useEffect(() => {
  //   async function fetchTags() {
  //     const fetchedTags = await getTags(userId);
  //     setTags(fetchedTags);
  //     setLoading(false);
  //   }

  //   fetchTags();
  // }, [userId]);

  return (
    <>
      {isLoading ? (
        <SkeletonSidebar />
      ) : (
        <aside className="flex flex-col h-full bg-white lg:bg-transparent overflow-scroll px-4 fixed lg:w-[18%] lg:translate-x-[0] translate-x-[-100%] w-full text-center lg:text-left transition ease-in duration-300 z-99">
          <SidebarNav tags={tags} userId={userId} />
          <NewTag />
        </aside>
      )}
    </>
  );
}

export default Sidebar;
