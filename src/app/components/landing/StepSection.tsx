export default function StepSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 md:py-24 lg:py-32 container mx-auto px-4 md:px-6">
      {/* STEP 1 */}
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-gray-500">STEP 1</span>
          <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Dashboard: A Curated Gallery
          </h3>
          <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Access all your saved inspirations in one beautiful, organized
            dashboard. Categorize, tag, and search through your collection with
            ease, making it simple to find that perfect design when you need it.
          </p>
        </div>
        <div className="relative w-full  rounded-3xl overflow-hidden shadow-xl border border-white/50 backdrop-blur-lg bg-white/20 flex items-center justify-center p-6 mt-8">
          <img
            src="/desktop-preview.png"
            alt="Designspo Dashboard Preview"
            className="rounded-xl object-cover object-center w-full h-auto"
          />
        </div>
      </div>

      {/* STEP 2 */}
      <div className="flex flex-col space-y-4 lg:mt-0 mt-12">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-gray-500">STEP 2</span>
          <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Capture Instantly with Our Chrome Extension
          </h3>
          <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See something inspiring? Our intuitive Chrome extension lets you
            capture a screenshot and the URL of any webpage with a single click,
            directly adding it to your Designspo collection. No more manual
            saving or copy-pasting.
          </p>
        </div>
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-white/50 backdrop-blur-lg bg-white/20 flex items-center justify-center p-6 mt-8">
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
