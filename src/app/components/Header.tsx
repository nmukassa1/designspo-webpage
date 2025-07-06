"use client";
import BrandName from "./BrandName";
import { signOut } from "../authActions/actions";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileNavMenu from "./MobileNavMenu";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <BrandName href="/dashboard" />

      <div className="ml-auto mr-[20px] flex items-center gap-2 pointer-events-none">
        <span>Beta</span>
        <div className="h-2.5 w-2.5 bg-amber-600 rounded-full animate-pulse"></div>
      </div>

      <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <div className="hidden sm:flex items-center gap-8">
        <Link href="/dashboard/profile">Profile</Link>

        <form action={signOut}>
          <button type="submit" className="cursor-pointer">
            Logout
          </button>
        </form>
      </div>

      <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
