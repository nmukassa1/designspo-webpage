"use client";

import { createClient } from "@/app/supabase/supabaseClient";

function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <RequestForgottenPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;

function RequestForgottenPasswordForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting form...");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    console.log(email);

    // Call your API to send the password reset email
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email as string,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );
      console.log(data);
    } catch (error) {
      console.error("Error creating Supabase client:", error);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Request to update password</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Send
        </button>
      </form>
    </>
  );
}
