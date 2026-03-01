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
    // If we already have server-provided auth, no need to refetch on the client
    if (userId && accessToken) return;

    createClient().then((client) => {
      client.auth.getUser().then(({ data: { user } }) => {
        setUserId(user?.id ?? null);
      });

      client.auth.getSession().then(({ data: { session } }) => {
        const { access_token } = session || {};
        setAccessToken(access_token || null);
      });
    });
  }, [userId, accessToken]);

  // useEffect(() => {
  //   if (initialUserId && initialAccessToken) return; // already have server props
  //   createClient().then((client) => {
  //     client.auth.getSession().then(({ data: { session } }) => {
  //       setUserId(session?.user?.id ?? null);
  //       setAccessToken(session?.access_token ?? null);
  //     });
  //   });
  // }, [initialUserId, initialAccessToken]);

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
