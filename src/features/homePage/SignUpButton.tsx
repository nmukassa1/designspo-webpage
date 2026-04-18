import Link from "next/link";

function SignUpButton() {
  return (
    <Link href="/signup" className="border-2 rounded-md p-2">
      Create an account
    </Link>
  );
}

export default SignUpButton;
