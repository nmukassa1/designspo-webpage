"use client";

import { signOut } from "@/app/authActions/actions";
import { createClient } from "@/app/supabase/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  const [adminCookieExist, setAdminCookieExist] = useState<boolean>(false);
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
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("otp_token"));

    console.log("Cookies:", cookies);

    if (cookies) {
      setAdminCookieExist(true);
    } else {
      setAdminCookieExist(false);
    }
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
          <>{adminCookieExist && <Link href="/login">Login</Link>}</>
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
