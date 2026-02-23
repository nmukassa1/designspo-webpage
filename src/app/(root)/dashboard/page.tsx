import DashboardPageClient from "./DashboardPageClient";
import { createClient as createServerSupabaseClient } from "@/app/supabase/superbaseServer";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  const tag = (searchParams.tag ?? null) as string | null;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const supabase = await createServerSupabaseClient();
  const [
    {
      data: { user },
    },
    {
      data: { session },
    },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.getSession(),
  ]);

  const initialUserId = user?.id ?? null;
  const initialAccessToken = session?.access_token ?? null;

  return (
    <DashboardPageClient
      tag={tag}
      page={page}
      initialUserId={initialUserId}
      initialAccessToken={initialAccessToken}
    />
  );
}
