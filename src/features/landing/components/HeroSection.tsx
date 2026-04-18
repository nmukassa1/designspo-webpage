"use client";
import CallToActionLinks from "./CallToActionLinks";

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 text-center md:pb-24 lg:pb-28">
      <div className="container z-10 max-w-4xl space-y-8 px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Your Web Inspiration, All in One Place.
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
            Capture, organize, and revisit web design ideas with ease. Avoid
            scattered bookmarks and endless accounts.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto space-y-4">
          <CallToActionLinks />
        </div>
      </div>
    </section>
  );
}
