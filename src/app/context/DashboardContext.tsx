import { createContext, useContext, useEffect, useState } from "react";
import { CollectionsType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../queries";
import { useAuthContext } from "./AuthContext";

const DashboardContext = createContext<{
  collections: CollectionsType | undefined;
  tagQuery: string;
  pageNumber: number;
  isLoading: boolean;
  loadingMessage: string;
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isLoading: false,
  loadingMessage: "",
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

  const [collections, setCollections] = useState<CollectionsType | undefined>(
    undefined
  );
  const [tagQuery, setTagQuery] = useState<string>(tagParam ?? "");
  const [pageNumber, setPageNumber] = useState<number>(pageQuery ?? 1);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const { data, isLoading } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagQuery, pageNumber, accessToken],
    queryFn: () => getCollections(userId, tagQuery, pageNumber, accessToken),
    staleTime: 1000 * 60 * 5, // 5 mins
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  useEffect(() => {
    if (tagParam !== undefined && tagParam !== null) {
      setTagQuery(tagParam);
    } else {
      setTagQuery("");
    }
    if (pageQuery !== undefined) {
      setPageNumber(pageQuery);
    } else {
      setPageNumber(1);
    }
  }, [tagParam, pageQuery]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (isLoading) {
      // Start a timeout to show the loading message after 5 seconds
      timeout = setTimeout(() => {
        setLoadingMessage("Fetching data is taking longer than usual...");
      }, 5000);
    } else {
      // Clear the loading message and timeout when loading is complete
      setLoadingMessage("");
      if (timeout) {
        clearTimeout(timeout);
      }
    }

    // Cleanup timeout on unmount or when isLoading changes
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isLoading]);

  return (
    <DashboardContext.Provider
      value={{
        collections,
        tagQuery,
        pageNumber,
        isLoading,
        loadingMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
