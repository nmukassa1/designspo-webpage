export default function StepSection() {
  return (
    <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-2">
      {/* STEP 1 */}
      <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Step 1
          </span>
          <h3 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Your Dashboard: A Curated Gallery
          </h3>
          <p className="text-muted-foreground md:text-lg">
            Access all your saved inspirations in one beautiful, organized
            dashboard. Categorize, tag, and search through your collection with
            ease, making it simple to find that perfect design when you need it.
          </p>
        </div>
        <div className="relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-4">
          <img
            src="/desktop-preview.png"
            alt="Designspo Dashboard Preview"
            className="rounded-xl object-cover object-center w-full h-auto"
          />
        </div>
      </div>

      {/* STEP 2 */}
      <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Step 2
          </span>
          <h3 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Capture Instantly with Our Chrome Extension
          </h3>
          <p className="text-muted-foreground md:text-lg">
            See something inspiring? Our intuitive Chrome extension lets you
            capture a screenshot and the URL of any webpage with a single click,
            directly adding it to your Designspo collection. No more manual
            saving or copy-pasting.
          </p>
        </div>
        <div className="relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-4">
          <img
            src="/chrome-extension.png"
            alt="Designspo Chrome Extension Preview"
            className="rounded-xl object-cover object-center w-2/3 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
