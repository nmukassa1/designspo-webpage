import CallToActionLinks from "./CallToActionLinks";

export default function GetStartedSection() {
  return (
    <section className="w-full rounded-3xl border border-border bg-card px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to organize your inspiration?
        </h2>
        <div className="mx-auto w-full max-w-md space-y-4">
          <CallToActionLinks />
        </div>
      </div>
    </section>
  );
}
