import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200">
      <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Designspo. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Privacy Policy
        </Link>

        <Link
          href="/admin"
          className="text-xs hover:underline underline-offset-4"
        >
          Admin
        </Link>
      </nav>
    </footer>
  );
}
