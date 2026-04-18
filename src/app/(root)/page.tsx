import Footer from "@/features/landing/components/Footer";
import GetStartedSection from "@/features/landing/components/GetStartedSection";
import HeroSection from "@/features/landing/components/HeroSection";
import PreviewImage from "@/features/landing/components/PreviewImage";
import ProblemSection from "@/features/landing/components/ProblemSection";
import StepSection from "@/features/landing/components/StepSection";

function Page() {
  return (
    <>
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 md:space-y-24 md:px-6 md:py-12">
          <HeroSection />
          <PreviewImage />
          <ProblemSection />
          <StepSection />
          <GetStartedSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Page;
