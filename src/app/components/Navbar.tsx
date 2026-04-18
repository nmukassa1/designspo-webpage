"use client";

import Link from "next/link";
import { signOutAndRedirectToLogin } from "@/lib/auth/sign-out-client";

function Navbar() {
  const handleLogout = async () => {
    await signOutAndRedirectToLogin();
  };

  return (
    <nav className=" items-center gap-8 flex ml-auto lg:mr-0">
      <Link href="/dashboard/profile">Profile</Link>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => void handleLogout()}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
