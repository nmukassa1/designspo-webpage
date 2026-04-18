import ChromeExtensionButton from "@/features/homePage/ChromeExtensionButton";
import DesktopPreview from "@/features/homePage/DesktopPreview";
import Hero from "@/features/homePage/Hero";
import ProblemStatement from "@/features/homePage/ProblemStatement";
import SignUpButton from "@/features/homePage/SignUpButton";
import Steps from "@/features/homePage/Steps";
import Link from "next/link";

function page() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-10 sm:px-6 md:space-y-20 md:py-14">
      <Hero />
      <DesktopPreview />
      <ProblemStatement />
      <Steps />

      <section className="text-center" aria-labelledby="homepage-cta-heading">
        <h2
          id="homepage-cta-heading"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Let&apos;s get you started
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <SignUpButton />
          <ChromeExtensionButton />
        </div>
      </section>
      <Link
        href="/privacy"
        className="flex justify-center rounded-sm text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Privacy
      </Link>
    </div>
  );
}

export default page;
