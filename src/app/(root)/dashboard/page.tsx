import { createClient } from "@/app/supabase/superbaseServer";
import { redirect } from "next/navigation";
import DashboardPageClient from "./DashboardPageClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  // Check for session for protect route
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Session Error:", sessionError);
    redirect("/login");
  }

  return <DashboardPageClient />;
}
