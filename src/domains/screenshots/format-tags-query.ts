export const formatTagsQuery = (tags: string[] | string | null): string => {
  if (!tags) return "";
  if (Array.isArray(tags)) return tags.map((tag) => `tag=${tag}`).join("&");
  return `tag=${tags}`;
};

