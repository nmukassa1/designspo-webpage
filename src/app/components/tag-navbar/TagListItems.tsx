"use client";

import Link from "next/link";
import { useTagContext } from "../../context/TagContext";
import { useEffect, useRef, useState } from "react";
import { useDashboardContext } from "@/app/context/DashboardContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import { getCollections } from "@/lib/api/collections";
import { loadGsap } from "@/lib/gsap-loader";

function TagListItems() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  const [, setHoveredTag] = useState<number | null>(null);
  const { tags } = useTagContext();
  const { tagQuery } = useDashboardContext();

  const [activeLinkName, setActiveLinkName] = useState<string | null>(null);

  const prefetchTag = (tagName: string) => {
    queryClient.prefetchQuery({
      queryKey: ["collections", userId, tagName, 1],
      queryFn: () => getCollections(userId, tagName, 1, accessToken),
      staleTime: 1000 * 60 * 5,
    });
  };

  const prefetchAll = () => {
    queryClient.prefetchQuery({
      queryKey: ["collections", userId, "", 1],
      queryFn: () => getCollections(userId, "", 1, accessToken!),
      staleTime: 1000 * 60 * 5,
    });
  };

  const toggleMenu = () => {
    if (window.innerWidth > 640) return;
    const run = async () => {
      const gsap = await loadGsap();
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
    void run();
  };

  const navRef = useRef<HTMLUListElement>(null);
  const gradientBlock = useRef<HTMLDivElement>(null);

  const [showGradient, setShowGradient] = useState<
    "opacity-0" | "opacity-100" | undefined
  >(undefined);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    setInitialGradient();

    navRef.current?.addEventListener("scroll", toggleGradient);
    window.addEventListener("resize", setInitialGradient);

    return () => {
      navRef.current?.removeEventListener("scroll", toggleGradient);
      window.removeEventListener("resize", setInitialGradient);
    };

    function setInitialGradient() {
      const gradientElement = gradientBlock.current;
      if (!gradientElement) return;

      const scrollWidth = navRef.current?.scrollWidth;
      const clientWidth = navRef.current?.clientWidth;

      if (clientWidth === scrollWidth) {
        gradientElement.style.zIndex = "-10";
        gradientElement.style.opacity = "0";
      } else {
        gradientElement.style.zIndex = "10";
        gradientElement.style.opacity = "1";
      }
    }

    function toggleGradient() {
      const gradientElement = gradientBlock.current;
      if (!gradientElement) return;

      const scrollLeft = navRef.current?.scrollLeft;
      const scrollWidth = navRef.current?.scrollWidth;
      const clientWidth = navRef.current?.clientWidth;

      const isAtEnd =
        (scrollLeft ?? 0) + (clientWidth ?? 0) >= (scrollWidth ?? 0) - 5;

      if (isAtEnd) {
        gradientElement.style.zIndex = "-10";
        gradientElement.style.opacity = "0";
      } else {
        gradientElement.style.zIndex = "10";
        gradientElement.style.opacity = "1";
      }
    }
  }, [tags]);

  useEffect(() => {
    setActiveLinkName(tagQuery);
  }, [tagQuery]);

  return (
    <ul
      ref={navRef}
      className="text-lg h-full fontColor overflow-scroll flex gap-2 items-center"
    >
      {/* ALL */}
      <li
        className={`${
          activeLinkName === "" ? "bg-black text-white" : ""
        } hover:bg-black hover:text-white text-black border-1 border-black rounded-full`}
      >
        <Link
          href="/dashboard"
          prefetch
          onMouseEnter={prefetchAll}
          onFocus={prefetchAll}
          className="block py-2 px-3"
          onClick={toggleMenu}
        >
          All
        </Link>
      </li>

      {tags.map((tag) => (
        <li
          key={tag.id}
          className={`flex shrink-0 justify-between items-center hover:bg-black hover:text-white rounded-full text-black border-1 border-black ${
            activeLinkName === tag.name ? "bg-black text-white" : ""
          }`}
        >
          <Link
            href={`/dashboard?tag=${tag.name}`}
            prefetch
            onMouseEnter={() => prefetchTag(tag.name)}
            onFocus={() => prefetchTag(tag.name)}
            className="block py-2 px-3 transition linear duration-300 w-full"
            onClick={toggleMenu}
          >
            {tag.name}
          </Link>
        </li>
      ))}

      <div
        ref={gradientBlock}
        className={`tag-navbar-ul-gradient ${showGradient} transition-all ease-in-out duration-200`}
      />
    </ul>
  );
}

export default TagListItems;
