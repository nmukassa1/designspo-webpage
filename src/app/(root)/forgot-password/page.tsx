"use client";

import BrandName from "@/app/components/BrandName";
import Spinner from "@/app/components/Spinner";
import { createClient } from "@/app/supabase/supabaseClient";
import { useState } from "react";

function ForgotPasswordPage() {
  return (
    <div className="">
      <RequestForgottenPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;

function RequestForgottenPasswordForm() {
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
      const supabase = await createClient();
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
    <div className="p-7">
      <BrandName href="/" />

      <div className="md:w-3/4 mx-auto">
        <h1 className="text-2xl text-center font-bold mb-4">
          Request to reset password
        </h1>
        <form onSubmit={handleSubmit} className="mt-10 mx-auto w-3/4">
          <div className="mb-6">
            <label className="mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            className="bg-black text-white px-4 py-4 rounded-2xl my-6 w-full"
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
