import Sidebar from "@/app/components/Sidebar";
import { TagProvider } from "@/app/context/TagContext";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";
import { createClient } from "@/app/supabase/superbaseServer";
import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export default async function Profile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return <ProfilePageClient userId={data.user.id} />;
}
