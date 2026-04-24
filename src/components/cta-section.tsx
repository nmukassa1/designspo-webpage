import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";

export function CtaSection() {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-sm md:px-10">
      <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
        Ready to organize your inspiration?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Join designers who have stopped losing their best finds.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign Up Free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="https://chromewebstore.google.com/detail/designspo-extension/cgfifloilikfidnhgdldmnmoooclefgi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/30"
        >
          <Chrome className="h-5 w-5" />
          Download Extension
        </Link>
      </div>
    </div>
  );
}

