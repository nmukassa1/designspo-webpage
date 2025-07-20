import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/supabaseClient";

const AuthContext = createContext({
  userId: "" as string | null,
  accessToken: "" as string | null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    createClient().then((client) => {
      // Fetch the user data
      client.auth.getUser().then(({ data: { user } }) => {
        // console.log("User:", user);
        setUserId(user?.id ?? null); // Update userId if available
      });

      // Fetch current session
      client.auth.getSession().then(({ data: { session } }) => {
        const { access_token, expires_in, expires_at } = session || {};
        setAccessToken(access_token || null);
      });
    });
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
