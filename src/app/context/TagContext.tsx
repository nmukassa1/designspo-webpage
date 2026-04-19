"use client";

import { createContext, useContext } from "react";
import { Tag } from "../types/types";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/tags";

const TagContext = createContext<{
  tags: Tag[];
  isFetching: boolean;
}>({
  tags: [],
  isFetching: false,
});

export const TagProvider = ({
  children,
  initialUserId,
  initialAccessToken,
}: {
  children: React.ReactNode;
  initialUserId: string | null;
  initialAccessToken: string | null;
}) => {
  const { userId: authUserId, accessToken: authAccessToken } = useAuthContext();

  const userId = authUserId ?? initialUserId;
  const accessToken = authAccessToken ?? initialAccessToken;

  const { data, isFetching } = useQuery<Tag[]>({
    queryKey: ["tags", userId, accessToken],
    queryFn: () => getTags(userId, accessToken!),
    enabled: !!userId && !!accessToken,
  });

  return (
    <TagContext.Provider
      value={{
        tags: data ?? [],
        isFetching,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
};
