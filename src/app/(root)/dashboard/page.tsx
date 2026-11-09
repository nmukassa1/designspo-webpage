import DashboardPageClient from "./DashboardPageClient";
import { createClient } from "@/app/supabase/supabaseServer";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { tag: rawTag, page: rawPage } = await searchParams;

  const tag = rawTag ?? "";
  const page = rawPage ? Math.max(1, Number(rawPage)) : 1;

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/login");
  }

  return (
    <DashboardPageClient
      initialUserId={user.id}
      initialTag={tag}
      initialPage={page}
    />
  );
}
