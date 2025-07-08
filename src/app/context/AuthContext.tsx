import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/supabaseClient";

const AuthContext = createContext({
  userId: "" as string | null,
  accessToken: "" as string | null,
});

export const AuthProvider = ({
  children,
  authId,
}: {
  children: React.ReactNode;
  authId: string | null;
}) => {
  const [userId, setUserId] = useState<string | null>(authId);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Resolve the Supabase client
    createClient().then((client) => {
      // Fetch the user data
      client.auth.getUser().then(({ data: { user } }) => {
        console.log("User:", user);
        setUserId(user?.id || authId); // Update userId if available
      });

      // Fetch current session
      client.auth.getSession().then(({ data: { session } }) => {
        console.log("Session:", session);
        setAccessToken(session?.access_token || null);
      });
    });
  }, [authId]);

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
