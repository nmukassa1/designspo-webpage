"use client";
import { updatePassword } from "@/app/mutations";
import React, { useState } from "react";

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    // Reset to default values (could be updated to previous values instead)
    setFormData({
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSave = async () => {
    // Save logic here
    console.log("Saved Data:", formData);
    // Check if passwords match
    if (formData.newPassword === "") {
      setError("Password cannot be empty!");
      return;
    }
    if (formData.confirmNewPassword === "") {
      setError("Confirm password cannot be empty!");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    const response = await updatePassword(formData.newPassword);
    setSuccessMessage(response);
    setFormData({
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className="mx-6 p-6 bg-white shadow rounded-xl flex flex-col lg:flex-row gap-6 lg:gap-20">
      <div className="shrink-0">
        <h2 className="text-xl font-semibold mb-1">New Password</h2>
        <p className="text-gray-500 mb-6">Create a new password</p>
      </div>

      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-4 ">
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
              value={formData.newPassword}
              onChange={handleChange}
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
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <div className="ml-auto mt-4 flex gap-6 w-fit">
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-blue-500 font-semibold hover:underline"
            >
              Save
            </button>
          </div>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {error && <p className="text-red-500 italic">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
