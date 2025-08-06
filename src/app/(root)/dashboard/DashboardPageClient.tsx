"use client";
import React, { Suspense } from "react";
import Collections from "@/app/components/Collections";
import { useSearchParams } from "next/navigation";
import { DashboardProvider } from "@/app/context/DashboardContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import TagNavigationPanel from "@/app/components/tag-navbar/TagNavigationPanel";
import DeleteTag from "@/app/components/tag-navbar/DeleteTag";
import { EditDrawerProvider } from "@/app/components/EditDrawer/EditDrawerContext";
import EditDrawer from "@/app/components/EditDrawer/EditDrawer";

function SearchParamsWrapper({
  children,
}: {
  children: (params: { tag: string | null; page: number }) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  return <>{children({ tag, page })}</>;
}

export default function DashboardPageClient() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper>
          {({ tag, page }) => (
            <DashboardProvider tagParam={tag} pageQuery={page}>
              <TagProvider>
                <EditDrawerProvider>
                  <div id="dashboard" className="pb-8">
                    <div className="h-full px-4">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Your design library.
                      </h1>
                      <TagNavigationPanel />
                      <Collections />
                      <EditDrawer />
                      {tag && <DeleteTag tagName={tag} />}
                    </div>
                  </div>
                </EditDrawerProvider>
              </TagProvider>
            </DashboardProvider>
          )}
        </SearchParamsWrapper>
      </Suspense>
    </AuthProvider>
  );
}
