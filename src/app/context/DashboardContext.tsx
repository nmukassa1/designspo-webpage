"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/domains/screenshots/api";
import { CollectionsType } from "../types/types";
import { useSearchParams } from "next/navigation";
import { keepPreviousData } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { queryKeys } from "@/domains/query-keys";

const DashboardContext = createContext<{
  collections: CollectionsType | undefined;
  tagQuery: string;
  pageNumber: number;
  isFetching: boolean;
  isLoading: boolean;
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isFetching: false,
  isLoading: false,
});

export const DashboardProvider = ({
  children,
  initialUserId,
  initialTag = "",
  initialPage = 1,
}: {
  children: React.ReactNode;
  initialUserId: string | null;
  initialTag?: string;
  initialPage?: number;
}) => {
  const searchParams = useSearchParams();

  const tagQuery = searchParams.get("tag") ?? initialTag;
  const pageNumber = searchParams.get("page")
    ? Math.max(1, Number(searchParams.get("page")))
    : initialPage;

  const { userId: authUserId } = useAuthContext();
  // Prefer live client session; fall back to SSR for first paint.
  const userId = authUserId ?? initialUserId;

  const { data, isFetching, isLoading } = useQuery<CollectionsType>({
    queryKey: queryKeys.collections.list(userId, tagQuery, pageNumber),
    queryFn: () => getCollections(userId, tagQuery, pageNumber),
    enabled: !!userId,

    // 🔥 Makes pagination & tag switching instant
    placeholderData: keepPreviousData,
  });

  return (
    <DashboardContext.Provider
      value={{
        collections: data,
        tagQuery,
        pageNumber,
        isFetching,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
