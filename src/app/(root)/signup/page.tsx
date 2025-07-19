"use client";

import { useState } from "react";
import { signup } from "./actions";
import BrandName from "@/app/components/BrandName";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setError("Both password fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="p-7">
      <div className="md:w-3/4 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-4 ">
          <h2 className="text-2xl font-semibold mb-8 text-center">Sign Up</h2>

          <div className="mb-6">
            <label className="mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="********"
              className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="********"
              className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white px-4 py-4 rounded-2xl my-6"
          >
            Create Account
          </button>
        </form>

        {isLoading && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}

        <div>
          <Link href="/login" className="w-fit">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
