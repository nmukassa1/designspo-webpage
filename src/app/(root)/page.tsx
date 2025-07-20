import Footer from "@/app/components/landing/Footer";
import GetStartedSection from "@/app/components/landing/GetStartedSection";
import HeroSection from "@/app/components/landing/HeroSection";
import PreviewImage from "@/app/components/landing/PreviewImage";
import ProblemSection from "@/app/components/landing/ProblemSection";
import StepSection from "@/app/components/landing/StepSection";

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
