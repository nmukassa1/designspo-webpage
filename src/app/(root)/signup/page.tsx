"use client";

import { useState } from "react";
import { signup } from "./actions";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(formData);

    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold">Sign Up</h2>

      <label>Email</label>
      <input
        name="email"
        type="email"
        required
        className="border px-3 py-2 rounded"
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        required
        className="border px-3 py-2 rounded"
      />

      <label>Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        required
        className="border px-3 py-2 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Account
      </button>
    </form>
  );
}
