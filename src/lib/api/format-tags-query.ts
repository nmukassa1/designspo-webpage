/** Builds `tag=a&tag=b` query segment for collections list requests. */
export function formatTagsQuery(tags: string[] | string | null): string {
  if (tags === null) {
    return "";
  }
  const tagPairs = Array.isArray(tags)
    ? tags.map((tag) => `tag=${tag}`)
    : [`tag=${tags}`];
  return tagPairs.join("&");
}
