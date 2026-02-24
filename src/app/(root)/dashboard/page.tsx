import DashboardPageClient from "./DashboardPageClient";
import { cookies } from "next/headers";
import { getCollections, getTags } from "@/app/queries";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  const tag = (searchParams.tag ?? null) as string | null;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  // Read user_id and access_token from cookies
  const userId = (await cookies()).get("user_id")?.value ?? null;
  const accessToken = (await cookies()).get("access_token")?.value ?? null;

  let initialCollections = undefined;
  let initialTags = undefined;

  if (userId && accessToken) {
    const [collections, tags] = await Promise.all([
      getCollections(userId, tag, page, accessToken),
      getTags(userId, accessToken),
    ]);
    initialCollections = collections;
    initialTags = tags;
  }

  return (
    <DashboardPageClient
      initialCollections={initialCollections}
      initialTags={initialTags}
      tag={tag}
      page={0}
      initialUserId={userId}
      initialAccessToken={accessToken}
    />
  );
}
