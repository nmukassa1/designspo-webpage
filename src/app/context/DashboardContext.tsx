"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CollectionsType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../queries";
import { useAuthContext } from "./AuthContext";
import { useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const tagQuery = searchParams.get("tag") ?? "";
  const pageNumber = searchParams.get("page")
    ? Math.max(1, Number(searchParams.get("page")))
    : 1;

  const { data, isPending, isFetching } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagQuery, pageNumber],
    queryFn: () => getCollections(userId, tagQuery, pageNumber, accessToken!),
    // enabled: !!userId && !!accessToken,
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
