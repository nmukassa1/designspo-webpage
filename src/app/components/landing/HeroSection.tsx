"use client";
import WaitlistForm from "./WaitlistForm";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-26 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="container px-4 md:px-6 max-w-4xl space-y-8 z-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Your Web Inspiration, All in One Place.
          </h1>
          <p className="mx-auto max-w-[800px] text-gray-600 md:text-xl">
            Capture, organize, and revisit web design ideas with ease. Avoid
            scattered bookmarks and endless accounts.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto space-y-4">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
