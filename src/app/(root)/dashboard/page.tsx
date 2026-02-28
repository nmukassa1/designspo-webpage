import DashboardPageClient from "./DashboardPageClient";
import { cookies } from "next/headers";
import { getCollections, getTags } from "@/app/queries";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { tag: rawTag, page: rawPage } = await searchParams;

  const tag = rawTag ?? null;
  const page = rawPage ? Math.max(1, Number(rawPage)) : 1;

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value ?? null;
  const accessToken = cookieStore.get("access_token")?.value ?? null;

  const queryClient = new QueryClient();

  if (userId && accessToken) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["collections", tag, page],
        queryFn: () => getCollections(userId, tag, page, accessToken),
      }),
      queryClient.prefetchQuery({
        queryKey: ["tags", userId],
        queryFn: () => getTags(userId, accessToken),
      }),
    ]);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardPageClient
        tag={tag}
        page={page}
        initialUserId={userId}
        initialAccessToken={accessToken}
      />
    </HydrationBoundary>
  );
}
