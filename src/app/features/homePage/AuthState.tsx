"use client";

import { signOut } from "@/app/authActions/actions";
import { createClient } from "@/app/supabase/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MobileNavMenu from "@/app/components/MobileNavMenu";

function AuthState({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function checkLoginStatus() {
      const supabase = await createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session Data:", session);

      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLoginStatus();
  }, [params]);

  const handleLogout = async () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="hidden sm:flex gap-6">
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
      {isLoggedIn && <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default AuthState;
