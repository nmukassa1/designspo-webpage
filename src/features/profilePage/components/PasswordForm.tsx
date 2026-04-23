"use client";
import { updatePassword } from "@/lib/server-actions/account";
import React, { useState } from "react";

const PasswordForm = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (!newPassword) {
      setError("Password cannot be empty!");
      return;
    }
    if (!confirmNewPassword) {
      setError("Confirm password cannot be empty!");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    const response = await updatePassword(newPassword);
    setSuccessMessage(response);
    form.reset();
  };

  const handleCancel = (form: HTMLFormElement | null) => {
    form?.reset();
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:gap-20">
      <div className="shrink-0">
        <h2 className="text-xl font-semibold mb-1">New Password</h2>
        <p className="mb-6 text-sm text-muted-foreground">Create a new password</p>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="grow-1 w-full">
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>
            <div className="grow-1 w-full">
              <label
                htmlFor="confirmNewPassword"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="ml-auto mt-4 flex gap-6 w-fit">
              <button
                type="button"
                onClick={() => handleCancel(document.querySelector("form"))}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Save
              </button>
            </div>
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {error && <p className="text-red-500 italic">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
