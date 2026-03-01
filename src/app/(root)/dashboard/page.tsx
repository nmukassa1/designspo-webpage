import DashboardPageClient from "./DashboardPageClient";
import { cookies } from "next/headers";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { tag: rawTag, page: rawPage } = await searchParams;

  const tag = rawTag ?? "";
  const page = rawPage ? Math.max(1, Number(rawPage)) : 1;

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value ?? null;
  const accessToken = cookieStore.get("access_token")?.value ?? null;

  return (
    <DashboardPageClient
      initialUserId={userId}
      initialAccessToken={accessToken}
      initialTag={tag}
      initialPage={page}
    />
  );
}
