import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CollectionsType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../queries";
import { useAuthContext } from "./AuthContext";

const DashboardContext = createContext<{
  collections: CollectionsType | undefined;
  tagQuery: string;
  pageNumber: number;
  isPending: boolean;
  isFetching: boolean;
  // loadingMessage: string;
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isPending: false,
  isFetching: false,
  // loadingMessage: "",
});

export const DashboardProvider = ({
  children,
  tagParam,
  pageQuery,
}: {
  children: React.ReactNode;
  tagParam?: string | null;
  pageQuery?: number;
}) => {
  const { userId, accessToken } = useAuthContext();

  const tagQuery = tagParam ?? "";
  const pageNumber = pageQuery ?? 1;

  const { data, isPending, isFetching } = useQuery<CollectionsType>({
    queryKey: ["collections", tagQuery, pageNumber],
    queryFn: () => getCollections(userId, tagQuery, pageNumber, accessToken),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });

  return (
    <DashboardContext.Provider
      value={{
        collections: data,
        tagQuery,
        pageNumber,
        isPending,
        isFetching,
        // loadingMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
