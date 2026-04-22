"use client";
import BrandName from "@/components/BrandName";
import Spinner from "@/components/Spinner";
import { createClient } from "@/app/supabase/supabaseClient";
import { useState } from "react";

export default function RequestForgottenPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email as string,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );
      setIsLoading(false);
      setError(null);
      setSuccess("Check your email for the password reset link.");
    } catch (error) {
      console.error("Error creating Supabase client:", error);
    }
  };

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-balance text-center text-3xl font-bold mb-4">
          Request to reset password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            className="my-6 w-full rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Submit
          </button>

          {isLoading && (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
