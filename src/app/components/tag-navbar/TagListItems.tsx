import Link from "next/link";
import { useTagContext } from "../../context/TagContext";
import { useEffect, useRef, useState } from "react";

function TagListItems() {
  const [, setHoveredTag] = useState<number | null>(null);
  const { tags } = useTagContext();

  const [activeLinkId, setActiveLinkId] = useState<number | null>(null);

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
      className="text-lg h-full fontColor overflow-scroll flex gap-2 items-center"
    >
      <li
        className={`${
          activeLinkId === null ? "bg-black text-white" : ""
        } hover:bg-black hover:text-white text-black border-1 border-black rounded-full`}
      >
        <Link
          href="/dashboard"
          className="block py-2 px-3"
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
          className={`flex shrink-0 justify-between items-center hover:bg-black  hover:text-white rounded-full text-black border-1 border-black  ${
            activeLinkId === tag.id ? "bg-black text-white" : ""
          }`}
          onMouseEnter={() => {
            setHoveredTag(tag.id);
          }}
          onMouseLeave={() => setHoveredTag(null)}
        >
          <Link
            href={`/dashboard?tag=${tag.name}`}
            className={`block py-2 px-3 transition linear duration-300 w-full`}
            onClick={() => {
              setActiveLinkId(tag.id);
              toggleMenu();
            }}
          >
            {tag.name}
          </Link>
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
