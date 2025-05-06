import { createClient } from "@/app/supabase/superbaseServer";
import { redirect } from "next/navigation";
import DashboardPageClient from "./DashboardPageClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <DashboardPageClient userId={data.user.id} />;
}
