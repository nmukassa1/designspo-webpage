// type Props = {
//   params: { id: string };
// };

import Sidebar from "@/app/components/Sidebar";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";
import { createClient } from "@/app/supabase/superbaseServer";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <PasswordForm />
    </div>
  );
}
