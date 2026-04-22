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
      className={`mobile-nav-menu fixed top-0 h-screen w-screen bg-background ${
        isOpen ? "right-0" : "-right-[100%]"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="button-wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-border bg-card p-2"
        >
          <X />
        </button>
      </div>

      <div className="mobile-nav-menu-link-wrapper text-foreground">
        <Link
          href="/dashboard"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full px-5 py-2 transition-all hover:bg-secondary"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/profile"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full px-5 py-2 transition-all hover:bg-secondary"
        >
          Profile
        </Link>

        <button
          type="button"
          className="cursor-pointer rounded-full bg-primary px-5 py-2 text-primary-foreground"
          onClick={() => void handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MobileNavMenu;
