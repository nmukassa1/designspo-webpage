import { Trash } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import { useTagContext } from "../../context/TagContext";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../../mutations";

function TagListItems() {
  const [, setHoveredTag] = useState<number | null>(null);
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

  const navRef = useRef<HTMLUListElement>(null);
  const gradientBlock = useRef<HTMLDivElement>(null);

  const [showGradient, setShowGradient] = useState<
    "opacity-0" | "opacity-100" | undefined
  >(undefined);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    // Set the initial state of the gradient
    setInitialGradient();

    navRef.current?.addEventListener("scroll", () => {
      toggleGradient();
    });

    window.addEventListener("resize", () => {
      setInitialGradient();
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleGradient);
      window.removeEventListener("resize", setInitialGradient);
    };

    // Functions
    function setInitialGradient() {
      const gradientElement = gradientBlock.current;
      if (!gradientElement) return;

      const scrollWidth = navRef.current?.scrollWidth;
      const clientWidth = navRef.current?.clientWidth;

      if (clientWidth === scrollWidth) {
        // setShowGradient("opacity-0")
        gradientElement.style.zIndex = "-10";
        gradientElement.style.opacity = "0";
      } else {
        // setShowGradient("opacity-100");
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

  return (
    <ul
      ref={navRef}
      className="text-lg h-full fontColor overflow-scroll flex gap-4 items-center"
    >
      <li className={`${activeLinkId === null ? "underline" : ""}`}>
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
          className={`flex shrink-0 justify-between items-center ${
            activeLinkId === tag.id ? "underline" : ""
          }`}
          onMouseEnter={() => {
            setHoveredTag(tag.id);
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

          {/* <button
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
          </button> */}
        </li>
      ))}

      {/* Gradient */}
      <div
        ref={gradientBlock}
        className={`tag-navbar-ul-gradient ${showGradient} transition-all ease-in-out duration-200`}
      />
    </ul>
  );
}

export default TagListItems;
