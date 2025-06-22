"use client";
import Sidebar from "@/app/components/Sidebar";
import Collections from "@/app/components/Collections";
import { useSearchParams } from "next/navigation";
import { DashboardProvider } from "@/app/context/DashboardContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import NavButton from "@/app/components/NavButton";

interface DashboardPageClientProps {
  userId: string;
}

export default function DashboardPageClient({
  userId,
}: DashboardPageClientProps) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  return (
    <AuthProvider authId={userId}>
      <DashboardProvider tagParam={tag} pageQuery={page}>
        <TagProvider>
          <div id="dashboard" className="pb-[130px]">
            <Sidebar />
            <div className="h-full px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                All your design inspirations in one spot
              </h1>
              <Collections />
            </div>
          </div>
        </TagProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}
