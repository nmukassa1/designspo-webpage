"use client";

import Link from "next/link";
import { login } from "./actions";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
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
      className="flex flex-col mt-10"
    >
      <h2 className="text-2xl font-semibold mb-8 text-center">Login</h2>

      <div className="mb-6 ">
        <label className="mb-2">Email</label>
        <div className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white relative">
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            className="w-full h-full outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2">Password</label>
        <div className="bg-gray-300 px-3 py-4 text-[1.4rem] rounded-lg w-full outline-white relative">
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="********"
            className="w-full h-full outline-none"
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-8 "
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye />
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-black text-white px-4 py-4 rounded-2xl my-6"
      >
        Login
      </button>

      {isLoading && (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}

      <div>
        <Link href="/signup" className="w-fit">
          Signup
        </Link>
        <Link href="/forgot-password" className="w-fit ml-6">
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
