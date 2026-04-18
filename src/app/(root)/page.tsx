import Footer from "@/features/landing/components/Footer";
import GetStartedSection from "@/features/landing/components/GetStartedSection";
import HeroSection from "@/features/landing/components/HeroSection";
import PreviewImage from "@/features/landing/components/PreviewImage";
import ProblemSection from "@/features/landing/components/ProblemSection";
import StepSection from "@/features/landing/components/StepSection";

function Page() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <PreviewImage />
        <ProblemSection />
        <StepSection />
        <GetStartedSection />
      </main>
      <Footer />
    </>
  );
}

export default Page;
