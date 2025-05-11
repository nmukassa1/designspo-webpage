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
}>({
  collections: undefined,
  tagQuery: "",
  pageNumber: 1,
  isLoading: false,
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
  const { userId } = useAuthContext();

  const [collections, setCollections] = useState<CollectionsType | undefined>(
    undefined
  );
  const [tagQuery, setTagQuery] = useState<string>(tagParam ?? "");
  const [pageNumber, setPageNumber] = useState<number>(pageQuery ?? 1);

  const { data, isLoading, isError } = useQuery<CollectionsType>({
    queryKey: ["collections", userId, tagQuery, pageNumber],
    queryFn: () => getCollections(userId, tagQuery, pageNumber),
    staleTime: 1000 * 60 * 5, // 5 mins
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      console.log("Data fetched from the server:", data);

      setCollections(data);
    }
  }, [data]);

  useEffect(() => {
    if (tagParam !== undefined && tagParam !== null) {
      console.log("Tag param changed:", tagParam);

      setTagQuery(tagParam);
    }
    if (pageQuery !== undefined) {
      console.log("Page query changed:", pageQuery);
      setPageNumber(pageQuery);
    }
  }, [tagParam, pageQuery]);

  return (
    <DashboardContext.Provider
      value={{
        collections,
        tagQuery,
        pageNumber,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
