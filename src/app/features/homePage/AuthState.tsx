"use client";

import { signOut } from "@/app/authActions/actions";
import { createClient } from "@/app/supabase/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import MobileNavMenu from "@/app/components/MobileNavMenu";
import { Menu } from "lucide-react";

function AuthState({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // For ADMIN USE!!!

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div className="hidden sm:flex gap-6">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/profile">Profile</Link>
            <form onSubmit={handleLogout}>
              <button type="submit" className="cursor-pointer">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      {isLoggedIn && (
        <>
          <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>
        </>
      )}
    </>
  );
}

export default AuthState;
