import Link from "next/link";

export default function SignupPage() {
  return (
    <form
      //   action={signupAction}
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

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Account
      </button>

      <Link href="/login" className="w-fit text-blue-500">
        Login
      </Link>
    </form>
  );
}
