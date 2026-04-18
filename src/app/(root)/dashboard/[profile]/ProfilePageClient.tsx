"use client";

import DeleteAccountButton from "@/features/profilePage/components/DeleteAccountButton";
import { AuthProvider } from "@/app/context/AuthContext";
import PasswordForm from "@/features/profilePage/components/PasswordForm";

function ProfilePageClient() {
  return (
    <AuthProvider>
      <div className="flex flex-col gap-4">
        <PasswordForm />
        <DeleteAccountButton />
      </div>
    </AuthProvider>
  );
}

export default ProfilePageClient;
