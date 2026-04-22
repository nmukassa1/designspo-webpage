"use client";

import { useState } from "react";
import { signup } from "./actions";
import BrandName from "@/components/BrandName";
import Link from "next/link";
import Spinner from "@/components/Spinner";

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
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <h2 className="text-center text-3xl font-semibold text-balance">
            Sign Up
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="my-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        {isLoading && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}

        <div className="mt-4">
          <Link
            href="/login"
            className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
