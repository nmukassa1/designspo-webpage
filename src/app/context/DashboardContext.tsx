"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/api/screenshots";
import { CollectionsType } from "../types/types";
import { useSearchParams } from "next/navigation";
import { keepPreviousData } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";

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
  initialAccessToken,
  initialTag = "",
  initialPage = 1,
}: {
  children: React.ReactNode;
  initialUserId: string | null;
  initialAccessToken: string | null;
  initialTag?: string;
  initialPage?: number;
}) => {
  const searchParams = useSearchParams();

  const tagQuery = searchParams.get("tag") ?? initialTag;
  const pageNumber = searchParams.get("page")
    ? Math.max(1, Number(searchParams.get("page")))
    : initialPage;

  const { userId: authUserId, accessToken: authAccessToken } = useAuthContext();
  // Prefer live client session (token refresh); fall back to SSR for first paint.
  const userId = authUserId ?? initialUserId;
  const accessToken = authAccessToken ?? initialAccessToken;

  const { data, isFetching, isLoading } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagQuery, pageNumber, accessToken],
    queryFn: () => getCollections(userId, tagQuery, pageNumber, accessToken!),
    enabled: !!userId && !!accessToken,

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
