"use client";

import Link from "next/link";
import { login } from "./actions";
import { useState } from "react";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await login(formData);

    if (result.error) {
      // console.log(result.error);
      setError(result.error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit} // Use onSubmit instead of action
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold">Login</h2>

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

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      <Link href="/signup" className="w-fit text-blue-500">
        Signup
      </Link>
    </form>
  );
}

export default LoginForm;
