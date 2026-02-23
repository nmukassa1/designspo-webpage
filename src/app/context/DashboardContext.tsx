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
  // loadingMessage: string;
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isLoading: false,
  // loadingMessage: "",
});

export const DashboardProvider = ({
  children,
  tagParam,
  pageQuery,
  initialCollections,
}: {
  children: React.ReactNode;
  tagParam?: string | null;
  pageQuery?: number;
  initialCollections?: CollectionsType;
}) => {
  const { userId, accessToken } = useAuthContext();
  const [tagQuery, setTagQuery] = useState<string>(tagParam ?? "");
  const [pageNumber, setPageNumber] = useState<number>(pageQuery ?? 1);

  const { data, isLoading } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagQuery, pageNumber, accessToken],
    queryFn: () => getCollections(userId, tagQuery, pageNumber, accessToken),
    initialData: initialCollections,
    staleTime: 1000 * 60 * 5, // 5 mins
    enabled: !!userId,
  });

  // Effect to handle tag and page query parameters
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


  return (
    <DashboardContext.Provider
      value={{
        collections: data,
        tagQuery,
        pageNumber,
        isLoading,
        // loadingMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
