"use client";

import Sidebar from "@/app/components/Sidebar";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";

function ProfilePageClient({ userId }: { userId: string }) {
  return (
    <AuthProvider authId={userId}>
      <TagProvider>
        <div className="flex flex-col gap-4">
          <div className="lg:hidden">
            <Sidebar />
          </div>
          <PasswordForm />
        </div>
      </TagProvider>
    </AuthProvider>
  );
}

export default ProfilePageClient;
