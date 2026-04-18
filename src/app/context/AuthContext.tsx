import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/supabaseClient";

const AuthContext = createContext({
  userId: "" as string | null,
  accessToken: "" as string | null,
});

export const AuthProvider = ({
  children,
  initialUserId = null,
  initialAccessToken = null,
}: {
  children: React.ReactNode;
  initialUserId?: string | null;
  initialAccessToken?: string | null;
}) => {
  const [userId, setUserId] = useState<string | null>(initialUserId);
  const [accessToken, setAccessToken] = useState<string | null>(
    initialAccessToken,
  );

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setAccessToken(session?.access_token ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
