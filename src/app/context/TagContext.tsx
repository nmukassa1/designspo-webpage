import { createContext, useContext, useEffect, useState } from "react";
import { Tag } from "../types/types";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../queries";

const TagContext = createContext<{
  tags: Tag[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => Promise<any>;
}>({ tags: [], isLoading: false, isFetching: false, refetch: async () => {} });

export const TagProvider = ({
  children,
  initialTags = [],
}: {
  children: React.ReactNode;
  initialTags?: Tag[];
}) => {
  const { userId, accessToken } = useAuthContext();

  const { data, isLoading, isFetching, refetch } = useQuery<Tag[]>({
    queryKey: ["tags", userId, accessToken],
    queryFn: () => getTags(userId, accessToken),
    initialData: initialTags,
    staleTime: 1000 * 60 * 5, // 5 mins,
    enabled: !!userId,
  });

  return (
    <TagContext.Provider
      value={{ tags: data ?? initialTags, isLoading, isFetching, refetch }}
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
