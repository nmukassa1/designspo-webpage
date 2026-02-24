/* 
FETCH USER & SESSION
FETCH COLLECTIONS AND TAGS IF USER IS LOGGED IN
PASS ALL DATA TO CLIENT COMPONENT
*/

import DashboardPageClient from "./DashboardPageClient";
import { createClient as createServerSupabaseClient } from "@/app/supabase/superbaseServer";
import { getCollections, getTags } from "@/app/queries";

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
  ] = await Promise.all([supabase.auth.getUser(), supabase.auth.getSession()]);

  const initialUserId = user?.id ?? null;
  const initialAccessToken = session?.access_token ?? null;

  let initialCollections = undefined;
  let initialTags = undefined;

  if (initialUserId && initialAccessToken) {
    const [collections, tags] = await Promise.all([
      getCollections(initialUserId, tag, page, initialAccessToken),
      getTags(initialUserId, initialAccessToken),
    ]);
    initialCollections = collections;
    initialTags = tags;
  }

  return (
    <DashboardPageClient
      tag={tag}
      page={page}
      initialUserId={initialUserId}
      initialAccessToken={initialAccessToken}
      initialCollections={initialCollections}
      initialTags={initialTags}
    />
  );
}
