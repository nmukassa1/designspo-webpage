import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/supabaseServer";
import ExtensionConnectClient from "./ExtensionConnectClient";

export const metadata: Metadata = {
  title: "Designspo - Connect extension",
};

export default async function ExtensionConnectPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login?next=/extension/connect");
  }

  return <ExtensionConnectClient email={user.email ?? null} />;
}
