"use client";
import { updatePassword } from "@/app/mutations";
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
    <div className="mx-6 p-6 bg-white shadow rounded-xl flex flex-col lg:flex-row gap-6 lg:gap-20">
      <div className="shrink-0">
        <h2 className="text-xl font-semibold mb-1">New Password</h2>
        <p className="text-gray-500 mb-6">Create a new password</p>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="grow-1 w-full">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="grow-1 w-full">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <div className="ml-auto mt-4 flex gap-6 w-fit">
              <button
                type="button"
                onClick={() => handleCancel(document.querySelector("form"))}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-500 font-semibold hover:underline"
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
