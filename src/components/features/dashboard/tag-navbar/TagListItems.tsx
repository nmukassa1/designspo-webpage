"use client";

import Link from "next/link";
import { useTagContext } from "@/app/context/TagContext";
import { useEffect, useRef, useState } from "react";
import { useDashboardContext } from "@/app/context/DashboardContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import { getCollections } from "@/domains/screenshots/api";
import { loadGsap } from "@/lib/gsap-loader";
import { queryKeys } from "@/domains/query-keys";

function TagListItems() {
  const queryClient = useQueryClient();
  const { userId, accessToken } = useAuthContext();

  const [, setHoveredTag] = useState<number | null>(null);
  const { tags } = useTagContext();
  const { tagQuery } = useDashboardContext();

  const [activeLinkName, setActiveLinkName] = useState<string | null>(null);

  const prefetchTag = (tagName: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.collections.list(userId, tagName, 1),
      queryFn: () => getCollections(userId, tagName, 1, accessToken),
      staleTime: 1000 * 60 * 5,
    });
  };

  const prefetchAll = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.collections.list(userId, "", 1),
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
      className="flex h-full items-center gap-2 overflow-scroll text-sm text-muted-foreground md:text-base"
    >
      {/* ALL */}
      <li
        className={`rounded-full border border-border transition-all ${
          activeLinkName === ""
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card text-foreground hover:bg-secondary"
        }`}
      >
        <Link
          href="/dashboard"
          prefetch
          onMouseEnter={prefetchAll}
          onFocus={prefetchAll}
          className="block px-4 py-2"
          onClick={toggleMenu}
        >
          All
        </Link>
      </li>

      {tags.map((tag) => (
        <li
          key={tag.id}
          className={`flex shrink-0 items-center justify-between rounded-full border border-border transition-all ${
            activeLinkName === tag.name
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground hover:bg-secondary"
          }`}
        >
          <Link
            href={`/dashboard?tag=${tag.name}`}
            prefetch
            onMouseEnter={() => prefetchTag(tag.name)}
            onFocus={() => prefetchTag(tag.name)}
            className="block w-full px-4 py-2 transition-all duration-200"
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
