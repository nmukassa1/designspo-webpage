"use client";
import BrandName from "@/app/components/BrandName";
import { createClient } from "@/app/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect if no session
    async function checkSession() {
      const supabase = await createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setError("Failed to fetch session");
      }

      if (!session) {
        // Redirect to login page if no session

        router.push("/login");
        setError(
          "No active session. Please check your email for the reset link."
        );
      }
    }

    checkSession();
  }, []);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = await createClient();

    // Restore session from URL
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // if (session) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userData && userData.user) {
      // ✅ Check if the form is valid before using FormData
      if (!(e.target instanceof HTMLFormElement)) {
        console.error("Event target is not a form element", e.target);
        setError("Unexpected form error. Please try again.");
        return;
      }

      const formData = new FormData(e.target);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (!password || !confirmPassword) {
        setError("Please fill in both fields");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        console.error(updateError);
        setError("Failed to update password");
      } else {
        setSuccess("Password updated!");
        setError(null);
      }
    }
    // } else {
    //   setError(
    //     "No active session. Make sure you clicked the link from your email."
    //   );
    // }
  };

  return (
    <div className="p-7">
      <BrandName href="/" />
      <div className="md:w-3/4 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Password</h1>
        <form
          className="flex flex-col mt-10 gap-4 max-w-md mx-auto"
          onSubmit={handlePasswordReset}
        >
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg outline-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg outline-white"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mb-4">{success}</div>
          )}
          <button
            type="submit"
            className="bg-black text-white px-4 py-4 rounded-2xl my-6"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
