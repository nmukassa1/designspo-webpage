export const queryKeys = {
  tags: {
    all: ["tags"] as const,
    byUser: (userId: string | null) => ["tags", userId] as const,
  },
  collections: {
    all: ["collections"] as const,
    byUser: (userId: string | null) => ["collections", userId] as const,
    list: (userId: string | null, tagQuery: string, pageNumber: number) =>
      ["collections", userId, tagQuery, pageNumber] as const,
  },
};
