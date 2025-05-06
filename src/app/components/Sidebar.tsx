"use client";

import { useEffect, useState } from "react";
import { getTags } from "../queries";
import NewTag from "./NewTag";
import SidebarNav from "./SidebarNav";
import { Tag } from "../types/types";
import SkeletonSidebar from "./sidebar/SkeletonSidebar";

function Sidebar({ userId }: { userId: string }) {
  const [tags, setTags] = useState<Tag[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getTags(userId);
      setTags(fetchedTags);
      setLoading(false);
    }

    fetchTags();
  }, [userId]);

  return (
    <>
      {loading ? (
        <SkeletonSidebar />
      ) : (
        <aside className="flex flex-col h-full bg-white lg:bg-transparent overflow-scroll px-4 fixed lg:w-[18%] lg:translate-x-[0] translate-x-[-100%] w-full text-center lg:text-left transition ease-in duration-300 z-99">
          <SidebarNav tags={tags} />
          <NewTag />
        </aside>
      )}
    </>
  );
}

export default Sidebar;
