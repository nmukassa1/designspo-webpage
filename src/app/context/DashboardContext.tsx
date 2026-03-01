"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../queries";
import { CollectionsType } from "../types/types";

const DashboardContext = createContext<{
  collections: CollectionsType | undefined;
  tagQuery: string;
  pageNumber: number;
  isFetching: boolean;
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isFetching: false,
});

export const DashboardProvider = ({
  children,
  initialUserId,
  initialAccessToken,
  tagParam = "",
  pageQuery = 1,
}: {
  children: React.ReactNode;
  initialUserId: string | null;
  initialAccessToken: string | null;
  tagParam?: string;
  pageQuery?: number;
}) => {
  const userId = initialUserId;
  const accessToken = initialAccessToken;

  const { data, isFetching } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagParam, pageQuery],
    queryFn: () => getCollections(userId, tagParam, pageQuery, accessToken!),
    enabled: !!userId && !!accessToken,
  });

  return (
    <DashboardContext.Provider
      value={{
        collections: data,
        tagQuery: tagParam,
        pageNumber: pageQuery,
        isFetching,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
