"use client";
import BrandName from "./BrandName";
import { Menu } from "lucide-react";
import { useState } from "react";
import AuthState from "../features/homePage/AuthState";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="">
      <BrandName href="/" />

      <div className="ml-auto mr-[20px] flex items-center gap-2 pointer-events-none">
        <span>Beta</span>
        <div className="h-2.5 w-2.5 bg-amber-600 rounded-full animate-pulse"></div>
      </div>

      <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <AuthState isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
