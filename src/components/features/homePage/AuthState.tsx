"use client";

import { createClient } from "@/app/supabase/supabaseClient";
import { signOutAndRedirectToLogin } from "@/lib/auth/sign-out-client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileNavMenu from "@/components/layout/MobileNavMenu";
import { Menu } from "lucide-react";

function AuthState({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // Header stays mounted across App Router navigations — re-read session on route change.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOutAndRedirectToLogin();
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/dashboard"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              Profile
            </Link>
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
      {isLoggedIn && (
        <>
          <MobileNavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          <button
            className="rounded-xl border border-border bg-card p-2 transition-all hover:shadow-md sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </button>
        </>
      )}
    </>
  );
}

export default AuthState;
