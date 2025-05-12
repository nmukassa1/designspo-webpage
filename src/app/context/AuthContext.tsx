import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  userId: "" as string | null,
});

export const AuthProvider = ({
  children,
  authId,
}: {
  children: React.ReactNode;
  authId: string | null;
}) => {
  const userId = authId;

  return (
    <AuthContext.Provider
      value={{
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
