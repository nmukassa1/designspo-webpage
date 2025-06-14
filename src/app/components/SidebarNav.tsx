"use client";
import Link from "next/link";
import { useState } from "react";
import { Trash } from "lucide-react";
import { deleteTag } from "../mutations";
import { signOut } from "../authActions/actions";
import CreateATagPlaceholder from "./EmptyTagPlaceholder";
import { useAuthContext } from "../context/AuthContext";
import { useTagContext } from "../context/TagContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewTag from "./NewTag";

function SidebarNav() {
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const { userId } = useAuthContext();
  const { tags } = useTagContext();

  function toggleMenu() {
    const menu = document.querySelector("aside");
    if (menu?.classList.contains("translate-x-[-100%]")) {
      menu?.classList.toggle("translate-x-[0]");
    }
  }

  const [activeLinkId, setActiveLinkId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (tagId: number) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      return deleteTag(tagId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
    },
  });

  return (
    <nav className="h-full flex flex-col overflow-scroll -z-20">
      {tags.length === 0 ? (
        <CreateATagPlaceholder />
      ) : (
        <ul className="text-lg fontColor overflow-scroll">
          <li
            className={`${
              activeLinkId === null ? "bg-[#262626] text-white" : ""
            } px-4 `}
          >
            <Link
              href="/dashboard"
              className={`block py-2  ${
                activeLinkId === null ? "" : "hover:bg-white"
              } transition linear duration-300 $`}
              onClick={() => {
                setActiveLinkId(null);
                toggleMenu();
              }}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className={`flex justify-between items-center px-4  ${
                activeLinkId === tag.id ? "bg-[#262626] text-white" : ""
              }`}
              onMouseEnter={() => {
                // if (tag.id !== activeLinkId) {
                setHoveredTag(tag.id);
                // }
              }}
              onMouseLeave={() => setHoveredTag(null)}
            >
              <Link
                href={`/dashboard?tag=${tag.name}`}
                className={`block py-2  ${
                  tag.id === activeLinkId ? "" : "hover:bg-white"
                } transition linear duration-300 w-full`}
                onClick={() => {
                  setActiveLinkId(tag.id);
                  toggleMenu();
                }}
              >
                {tag.name}
              </Link>
              {hoveredTag === tag.id && (
                <button
                  className="text-red-500 lg:grid hidden bg-red-100 hover:bg-red-300 cursor-pointer rounded-full w-6 h-6  place-content-center"
                  onClick={async () => {
                    if (userId) {
                      const result = mutate(tag.id);
                    } else {
                      console.error("User ID is null. Cannot delete tag.");
                    }
                  }}
                >
                  <Trash size={16} />
                </button>
              )}
              <button
                className="text-red-500 bg-red-100 lg:hidden cursor-pointer rounded-full w-6 h-6 grid place-content-center"
                onClick={async () => {
                  if (userId) {
                    const result = mutate(tag.id);
                  } else {
                    console.error("User ID is null. Cannot delete tag.");
                  }
                }}
              >
                <Trash size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* <div className="lg:hidden flex gap-4 justify-center grow-1 items-center">
        <Link href="/dashboard/profile" onClick={toggleMenu}>
          Profile
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <button type="submit" className="cursor-pointer">
            Logout
          </button>
        </form>
      </div> */}
    </nav>
  );
}

export default SidebarNav;
