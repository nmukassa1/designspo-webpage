"use client";
import BrandName from "@/components/BrandName";
// import { Menu } from "lucide-react";
import { useState } from "react";
import AuthState from "@/components/features/homePage/AuthState";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 flex h-[var(--headerHeight)] items-center border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <BrandName href="/" />

      <div className="ml-auto mr-5 flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground pointer-events-none">
        <span>Beta</span>
        <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></div>
      </div>

      {/* <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button> */}

      <AuthState isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
