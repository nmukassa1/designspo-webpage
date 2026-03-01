"use client";

import DeleteAccountButton from "@/app/components/profilePage/DeleteAccountButton";
import { AuthProvider } from "@/app/context/AuthContext";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";

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
