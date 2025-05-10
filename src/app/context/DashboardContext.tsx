// scaffold a context api for the dashboard

import { createContext, useContext, useState } from "react";
import { Tag, CollectionsType } from "../types/types";

const DashboardContext = createContext<{
  collections: CollectionsType | undefined;
  setCollections: React.Dispatch<
    React.SetStateAction<CollectionsType | undefined>
  >;
  tags: Tag[] | [];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  tagParam?: string;
  setTagParam?: React.Dispatch<React.SetStateAction<string>>;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}>({
  collections: { screenshots: [], totalPages: 0 },
  setCollections: () => ({ screenshots: [], totalPages: 0 }),
  tags: [],
  setTags: () => [],
});

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collections, setCollections] = useState<CollectionsType | undefined>(
    undefined
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagParam, setTagParam] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  return (
    <DashboardContext.Provider
      value={{
        collections,
        tags,
        setCollections,
        setTags,
        tagParam,
        setTagParam,
        page,
        setPage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
