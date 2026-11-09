import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/supabaseClient";

/** Access tokens are attached by the shared HTTP client, so only the user ID lives here. */
const AuthContext = createContext({
  userId: "" as string | null,
});

export const AuthProvider = ({
  children,
  initialUserId = null,
}: {
  children: React.ReactNode;
  initialUserId?: string | null;
}) => {
  const [userId, setUserId] = useState<string | null>(initialUserId);

  // Keep client state aligned with SSR props when navigating between routes.
  useEffect(() => {
    setUserId(initialUserId ?? null);
  }, [initialUserId]);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
