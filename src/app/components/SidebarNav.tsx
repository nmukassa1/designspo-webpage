"use client";
import Link from "next/link";
import { useState } from "react";
import { Tag } from "../types/types";
import { Trash } from "lucide-react";
import { deleteTag } from "../mutations";
import { signOut } from "../authActions/actions";
import CreateATagPlaceholder from "./EmptyTagPlaceholder";

function SidebarNav({ tags }: { tags: Tag[] | [] }) {
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const userId = "8c43787a-6332-4f73-8ed3-f00a54f801e4";

  function toggleMenu() {
    const menu = document.querySelector("aside");
    if (menu?.classList.contains("translate-x-[-100%]")) {
      menu?.classList.toggle("translate-x-[0]");
    }
  }

  return (
    <nav className="h-full flex flex-col -z-20">
      {tags.length === 0 ? (
        <CreateATagPlaceholder />
      ) : (
        <ul className="text-lg fontColor overflow-scroll">
          <li>
            <Link
              href="/dashboard"
              className="block py-2  hover:bg-white transition linear duration-300"
              onClick={toggleMenu}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex justify-between items-center"
              onMouseEnter={() => setHoveredTag(tag.id)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              <Link
                href={`/dashboard?tag=${tag.name}`}
                className="block py-2 hover:bg-white transition linear duration-300 w-full"
                onClick={toggleMenu}
              >
                {tag.name}
              </Link>
              {hoveredTag === tag.id && (
                <button
                  className="text-red-500 bg-red-100 hover:bg-red-300 cursor-pointer rounded-full w-6 h-6 grid place-content-center"
                  onClick={async () => {
                    const result = await deleteTag(tag.id, userId);
                  }}
                >
                  <Trash size={16} />
                </button>
              )}
              <button
                className="text-red-500 bg-red-100 lg:hidden cursor-pointer rounded-full w-6 h-6 grid place-content-center"
                onClick={async () => {
                  const result = await deleteTag(tag.id, userId);
                }}
              >
                <Trash size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="lg:hidden flex gap-4 justify-center grow-1 items-center">
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
      </div>
    </nav>
  );
}

export default SidebarNav;
