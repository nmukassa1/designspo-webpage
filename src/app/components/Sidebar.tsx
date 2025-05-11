"use client";
import { getTags } from "../queries";
import NewTag from "./NewTag";
import SidebarNav from "./SidebarNav";
import { Tag } from "../types/types";
import SkeletonSidebar from "./sidebar/SkeletonSidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { useTagContext } from "../context/TagContext";

function Sidebar() {
  const { isLoading } = useTagContext();

  return (
    <>
      {isLoading ? (
        <SkeletonSidebar />
      ) : (
        <aside className="flex flex-col h-full bg-white lg:bg-transparent overflow-scroll px-4 fixed lg:w-[18%] lg:translate-x-[0] translate-x-[-100%] w-full text-center lg:text-left transition ease-in duration-300 z-99">
          <SidebarNav />
          <NewTag />
        </aside>
      )}
    </>
  );
}

export default Sidebar;
