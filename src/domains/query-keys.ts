export const queryKeys = {
  tags: {
    all: ["tags"] as const,
    byUser: (userId: string | null, accessToken?: string | null) =>
      ["tags", userId, accessToken ?? null] as const,
  },
  collections: {
    all: ["collections"] as const,
    byUser: (userId: string | null) => ["collections", userId] as const,
    list: (
      userId: string | null,
      tagQuery: string,
      pageNumber: number,
      accessToken?: string | null,
    ) =>
      ["collections", userId, tagQuery, pageNumber, accessToken ?? null] as const,
  },
};

