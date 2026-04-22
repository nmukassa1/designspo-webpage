"use client";

import DeleteAccountButton from "@/features/profilePage/components/DeleteAccountButton";
import { AuthProvider } from "@/app/context/AuthContext";
import PasswordForm from "@/features/profilePage/components/PasswordForm";

function ProfilePageClient() {
  return (
    <AuthProvider>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your password and account settings.
          </p>
        </div>
        <PasswordForm />
        <DeleteAccountButton />
      </div>
    </AuthProvider>
  );
}

export default ProfilePageClient;
