"use client";
import CallToActionLinks from "./CallToActionLinks";

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-10 text-center">
      <div className="z-10 max-w-4xl space-y-8 px-4 md:px-6">
        <p className="mx-auto w-fit rounded-full border border-border bg-card px-4 py-1 text-sm font-medium text-muted-foreground">
          Free Chrome Extension Available
        </p>
        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your Web Inspiration, All in One Place.
          </h1>
          <p className="mx-auto max-w-[800px] text-pretty text-muted-foreground md:text-xl">
            Capture, organize, and revisit web design ideas with ease. Avoid
            scattered bookmarks and endless accounts.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md space-y-4">
          <CallToActionLinks />
        </div>
      </div>
    </section>
  );
}
