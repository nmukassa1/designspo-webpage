"use client";
import BrandName from "@/components/BrandName";
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
      const supabase = createClient();
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
    const supabase = createClient();

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
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-balance">
          Update Password
        </h1>
        <form
          className="mx-auto mt-8 flex max-w-xl flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
          onSubmit={handlePasswordReset}
        >
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            className="my-3 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
