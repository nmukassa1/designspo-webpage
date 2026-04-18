import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 md:px-6 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Curatemap. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        {/* <Link
          href="/admin"
          className="text-xs hover:underline underline-offset-4"
        >
          Admin
        </Link> */}
        <Link
          href="/privacy"
          className="text-xs underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
