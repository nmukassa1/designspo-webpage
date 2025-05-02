"use client";
import { createClient } from "@/app/supabase/supabaseClient";
import { useEffect } from "react";

function ResetPasswordPage() {
  useEffect(() => {
    const handlePasswordReset = async () => {
      const supabase = await createClient();

      // This restores the session from the URL token
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Only proceed if session is available
      if (session) {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userData && userData.user) {
          // Ask user for new password
          const newPassword = prompt("Enter your new password");

          if (newPassword) {
            const { error: updateError } = await supabase.auth.updateUser({
              password: newPassword,
            });

            if (updateError) {
              alert("Failed to update password");
            } else {
              alert("Password updated!");
            }
          }
        }
      }
    };

    handlePasswordReset();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      <form
        // onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
