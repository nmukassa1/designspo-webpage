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
      className={`fixed right-4 top-[76px] z-[1200] w-56 rounded-2xl border border-border bg-card p-3 shadow-xl transition-all duration-200 sm:hidden ${
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="mb-2 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-border bg-background p-1.5"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1 text-foreground">
        <Link
          href="/dashboard"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-secondary"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/profile"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-secondary"
        >
          Profile
        </Link>

        <button
          type="button"
          className="mt-1 cursor-pointer rounded-lg bg-primary px-3 py-2 text-left text-sm font-medium text-primary-foreground"
          onClick={() => void handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MobileNavMenu;
