"use client";

import Link from "next/link";
import { login } from "./actions";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { Eye } from "lucide-react";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.error) {
      console.log(result.error);
      setError(result.error);
    }
    setIsLoading(false);
  }
  return (
    <form
      onSubmit={handleSubmit} // Use onSubmit instead of action
      className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <h2 className="text-center text-3xl font-semibold text-balance">Login</h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Email
        </label>
        <div className="relative w-full rounded-xl border border-border bg-background px-4 py-3">
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            className="h-full w-full outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative w-full rounded-xl border border-border bg-background px-4 py-3">
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="********"
            className="h-full w-full outline-none"
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="my-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
      >
        Login
      </button>

      {isLoading && (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-5 text-sm">
        <Link
          href="/signup"
          className="w-fit text-muted-foreground transition-colors hover:text-foreground"
        >
          Signup
        </Link>
        <Link
          href="/forgot-password"
          className="w-fit text-muted-foreground transition-colors hover:text-foreground"
        >
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
