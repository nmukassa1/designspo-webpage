"use client";
import Link from "next/link";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.currentTarget);

    const result = await loginAction(formData);
    console.log(result);

    if (result.success && result.redirect) {
      router.push("/dashboard"); // Perform client-side redirect
    }
  };

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
