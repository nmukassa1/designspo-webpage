"use client";

import DeleteAccountButton from "@/app/components/profilePage/DeleteAccountButton";
import { AuthProvider } from "@/app/context/AuthContext";
import { TagProvider } from "@/app/context/TagContext";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";

function ProfilePageClient() {
  return (
    <AuthProvider>
      <TagProvider>
        <div className="flex flex-col gap-4">
          <PasswordForm />
          <DeleteAccountButton />
        </div>
      </TagProvider>
    </AuthProvider>
  );
}

export default ProfilePageClient;
