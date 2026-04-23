"use client";

import { createContext, useContext } from "react";
import { Tag } from "../types/types";
import { useTagsQuery } from "@/domains/tags/query";

const TagContext = createContext<{
  tags: Tag[];
  isFetching: boolean;
}>({
  tags: [],
  isFetching: false,
});

export const TagProvider = ({
  children,
  initialUserId,
  initialAccessToken,
}: {
  children: React.ReactNode;
  initialUserId: string | null;
  initialAccessToken: string | null;
}) => {
  const { data, isFetching } = useTagsQuery(initialUserId, initialAccessToken);

  return (
    <TagContext.Provider
      value={{
        tags: data ?? [],
        isFetching,
      }}
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
