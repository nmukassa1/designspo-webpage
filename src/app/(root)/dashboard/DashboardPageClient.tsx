"use client";

import dynamic from "next/dynamic";
import { DashboardProvider } from "@/app/context/DashboardContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import Collections from "@/features/dashboard/Collections";
import TagNavigationPanel from "@/features/dashboard/tag-navbar/TagNavigationPanel";
import DeleteTag from "@/features/dashboard/tag-navbar/DeleteTag";
import { EditDrawerProvider } from "@/features/dashboard/EditDrawer/EditDrawerContext";

const EditDrawer = dynamic(
  () => import("@/features/dashboard/EditDrawer/EditDrawer"),
  { ssr: false }
);

export default function DashboardPageClient({
  initialUserId,
  initialAccessToken,
  initialTag,
  initialPage,
}: {
  initialUserId: string | null;
  initialAccessToken: string | null;
  initialTag: string;
  initialPage: number;
}) {
  return (
    <AuthProvider
      initialUserId={initialUserId}
      initialAccessToken={initialAccessToken}
    >
      <DashboardProvider
        initialUserId={initialUserId}
        initialAccessToken={initialAccessToken}
        initialTag={initialTag}
        initialPage={initialPage}
      >
        <TagProvider
          initialUserId={initialUserId}
          initialAccessToken={initialAccessToken}
        >
          <EditDrawerProvider>
            <div id="dashboard" className="pb-8">
              <div className="h-full px-4">
                <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-6xl">
                  Your design library.
                </h1>
                <TagNavigationPanel />
                <Collections />
                <EditDrawer />
                <DeleteTag />
              </div>
            </div>
          </EditDrawerProvider>
        </TagProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}
