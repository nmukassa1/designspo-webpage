"use client";
import { gsap } from "gsap";
import { useEffect } from "react";

function NavButton() {
  useEffect(() => {
    const timeline = gsap.timeline();
    const button = document.querySelector(".mobile-nav-button");
    if (!button) return;

    const handleClick = () => {
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
    };

    button.addEventListener("click", handleClick);

    // ✅ Cleanup
    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <button className="mobile-nav-button sm:hidden h-[68px] w-[68px] bg-[#262626] text-white overflow-hidden fixed bottom-[40px] left-1/2 -translate-x-1/2 transition ease-in duration-300 z-99 rounded-full text-center">
      Tags
    </button>
  );
}

export default NavButton;
