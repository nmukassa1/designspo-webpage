import { createClient } from "@/app/supabase/superbaseServer";
import DashboardPageClient from "./DashboardPageClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  return <DashboardPageClient />;
}
