import { useRef, useEffect } from "react";
import { useTagContext } from "../context/TagContext";
import SkeletonSidebar from "./sidebar/SkeletonSidebar";
import { X } from "lucide-react";
import SidebarNav from "./SidebarNav";
import NewTag from "./NewTag";
import { gsap } from "gsap";

export default function Sidebar() {
  const { isLoading } = useTagContext();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP animation for closing the sidebar
  useEffect(() => {
    if (!buttonRef.current) return;

    const timeline = gsap.timeline();

    const handleClick = () => {
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

    const buttonEl = buttonRef.current;
    buttonEl.addEventListener("click", handleClick);

    // Cleanup
    return () => buttonEl.removeEventListener("click", handleClick);
  }, [isLoading]); // Re-run effect when isLoading changes

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      if (window.innerWidth >= 640 && container?.style.height === "0px") {
        container.style.height = ""; // Let Tailwind's sm:h-[68px] take over
      }
    };

    window.addEventListener("resize", handleResize);

    // Run once on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonSidebar />
      ) : (
        <div
          ref={containerRef}
          className="tag-links-container flex flex-col sm:flex-row h-0 sm:h-[68px] w-[90%] sm:w-3/4 rounded-[41px] sm:rounded-full   bg-[#262626] text-white overflow-hidden fixed bottom-[40px] left-1/2 -translate-x-1/2 transition-all ease-in duration-300 z-[99999]"
        >
          <button
            ref={buttonRef}
            className="close-tags-container-button sm:hidden w-fit ml-auto mt-4 mr-6"
          >
            <X />
          </button>
          <SidebarNav />
          <NewTag />
        </div>
      )}
    </>
  );
}
