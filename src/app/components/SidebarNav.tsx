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
import { gsap } from "gsap";

function SidebarNav() {
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const { userId } = useAuthContext();
  const { tags } = useTagContext();

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

  const toggleMenu = () => {
    if (window.innerWidth > 640) {
      return;
    }
    const timeline = gsap.timeline();
    timeline
      .to(".tag-links-container", {
        duration: 0.2,
        ease: "power2.inOut",
        height: "0",
      })
      .to(
        ".mobile-nav-button",
        {
          duration: 0.5,
          ease: "power2.inOut",
          width: "68px",
        },
        "+=.3"
      );
  };

  return (
    <nav className="overflow-scroll h-full px-5 w-full sm:w-[86%]">
      {tags.length === 0 ? (
        <CreateATagPlaceholder />
      ) : (
        <ul className="text-lg h-full fontColor overflow-scroll flex flex-col sm:flex-row gap-4 sm:items-center">
          <li
            className={`border-b-2 sm:border-0 ${
              activeLinkId === null ? "underline" : ""
            }`}
          >
            <Link
              href="/dashboard"
              className={`block py-2  ${
                activeLinkId === null ? "" : "hover:underline"
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
              className={`flex shrink-0 justify-between items-center border-b-2 sm:border-0 ${
                activeLinkId === tag.id ? "underline" : ""
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
                  tag.id === activeLinkId ? "" : "hover:underline"
                } transition linear duration-300 w-full`}
                onClick={() => {
                  setActiveLinkId(tag.id);
                  toggleMenu();
                }}
              >
                {tag.name}
              </Link>
              {/* desktop delete button */}
              {/* {hoveredTag === tag.id && (
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
              )} */}
              {/* Mobile delete button */}
              <button
                className="text-red-500 bg-red-100 sm:hidden cursor-pointer rounded-full w-6 h-6 grid place-content-center"
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
    </nav>
  );
}

export default SidebarNav;
