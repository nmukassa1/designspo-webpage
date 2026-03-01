"use client";
import React from "react";
import Collections from "@/app/components/Collections";
import type { CollectionsType, Tag } from "@/app/types/types";
import { DashboardProvider } from "@/app/context/DashboardContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import TagNavigationPanel from "@/app/components/tag-navbar/TagNavigationPanel";
import DeleteTag from "@/app/components/tag-navbar/DeleteTag";
import { EditDrawerProvider } from "@/app/components/EditDrawer/EditDrawerContext";
import EditDrawer from "@/app/components/EditDrawer/EditDrawer";

export default function DashboardPageClient({
  initialUserId,
  initialAccessToken,
  initialTags,
}: {
  initialUserId: string | null;
  initialAccessToken: string | null;
  initialCollections?: CollectionsType;
  initialTags?: Tag[];
}) {
  return (
    <AuthProvider
      initialUserId={initialUserId}
      initialAccessToken={initialAccessToken}
    >
      <DashboardProvider>
        <TagProvider initialTags={initialTags}>
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
