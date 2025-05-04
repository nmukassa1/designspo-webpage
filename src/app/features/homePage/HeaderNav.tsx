"use client";

import { signOut } from "@/app/authActions/actions";
import { createClient } from "@/app/supabase/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

function HeaderNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const supabase = await createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <div className="flex gap-6">
      {isLoggedIn ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/profile">Profile</Link>
          <form onSubmit={handleLogout}>
            <button type="submit" className="cursor-pointer">
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default HeaderNav;
