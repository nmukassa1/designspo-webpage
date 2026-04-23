import Link from "next/link";

function CallToActionLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link
        href="/signup"
        className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
      >
        Sign Up Free
      </Link>
      <Link
        href="https://chromewebstore.google.com/detail/curatemap-extension/cgfifloilikfidnhgdldmnmoooclefgi"
        target="_blank"
        className="rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground transition-all duration-200 hover:bg-secondary hover:shadow-lg"
      >
        Download Extension
      </Link>
    </div>
  );
}

export default CallToActionLinks;
