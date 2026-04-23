import Link from "next/link";

function SignUpButton() {
  return (
    <Link
      href="/signup"
      className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
    >
      Create an account
    </Link>
  );
}

export default SignUpButton;
