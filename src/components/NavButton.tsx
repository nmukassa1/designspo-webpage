"use client";
import { loadGsap } from "@/lib/gsap-loader";
import { useEffect } from "react";

function NavButton() {
  useEffect(() => {
    const button = document.querySelector(".mobile-nav-button");
    if (!button) return;

    const handleClick = () => {
      loadGsap().then((gsap) => {
        const timeline = gsap.timeline();
        timeline
          .to(".mobile-nav-button", {
            duration: 0.5,
            ease: "power2.inOut",
            width: "90%",
          })
          .to(
            ".tag-links-container",
            {
              duration: 0.2,
              ease: "power2.inOut",
              height: "90dvh",
            },
            "-=0.3"
          );
      });
    };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <button
      type="button"
      className="mobile-nav-button fixed bottom-10 left-1/2 z-[99] h-[68px] w-[68px] -translate-x-1/2 overflow-hidden rounded-full bg-foreground text-center text-background transition duration-300 ease-in sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Tags
    </button>
  );
}

export default NavButton;
