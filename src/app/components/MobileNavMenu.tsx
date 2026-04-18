"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { signOutAndRedirectToLogin } from "@/lib/auth/sign-out-client";

function MobileNavMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const handleLogout = async () => {
    setIsOpen(false);
    await signOutAndRedirectToLogin();
  };

  return (
    <div
      className={`mobile-nav-menu h-screen w-screen bg-white fixed top-0 ${
        isOpen ? "right-0" : "-right-[100%]"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="button-wrapper">
        <button onClick={() => setIsOpen(!isOpen)}>
          <X />
        </button>
      </div>

      <div className="mobile-nav-menu-link-wrapper">
        <Link href="/dashboard" onClick={() => setIsOpen(!isOpen)}>
          Dashboard
        </Link>

        <Link href="/dashboard/profile" onClick={() => setIsOpen(!isOpen)}>
          Profile
        </Link>

        <button
          type="button"
          className="cursor-pointer"
          onClick={() => void handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MobileNavMenu;
