// import { supabase } from "@/app/supabase/supabaseClient";
import { createClient } from "@/app/supabase/superbaseServer";
import Dashboard from "../../components/Dashboard";
import { searchParams } from "../../types/types";
import { redirect } from "next/navigation";
import { UserProvider } from "@/app/provider/UserProvider";

interface DashboardPageProps {
  searchParams: searchParams;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // console.log(await searchParams);

  return (
    // <UserProvider userId={data.user.id}>
    <div className="">
      <Dashboard searchParams={searchParams} userId={data.user.id} />
    </div>
    // </UserProvider>
  );
}
