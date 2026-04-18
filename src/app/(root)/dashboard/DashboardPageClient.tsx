"use client";

import { DashboardProvider } from "@/app/context/DashboardContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import Collections from "@/features/dashboard/Collections";
import TagNavigationPanel from "@/features/dashboard/tag-navbar/TagNavigationPanel";
import DeleteTag from "@/features/dashboard/tag-navbar/DeleteTag";
import { EditDrawerProvider } from "@/features/dashboard/EditDrawer/EditDrawerContext";
import EditDrawer from "@/features/dashboard/EditDrawer/EditDrawer";

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
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
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
