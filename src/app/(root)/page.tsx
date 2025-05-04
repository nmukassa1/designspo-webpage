import Link from "next/link";
import BrandName from "../components/BrandName";
import DesktopPreview from "../features/homePage/DesktopPreview";
import Hero from "../features/homePage/Hero";
import ProblemStatement from "../features/homePage/ProblemStatement";
import Steps from "../features/homePage/Steps";
import SignUpButton from "../features/homePage/SignUpButton";
import ChromeExtensionButton from "../features/homePage/ChromeExtensionButton";

function page() {
  return (
    <div className="px-6">
      <header className="flex items-center justify-between py-6 sticky top-0 z-99">
        <BrandName href="/" />
        <Link href="/login">Login</Link>
      </header>

      {/* Hero */}
      <Hero />
      {/* App UI */}
      <DesktopPreview />
      {/* Problem statement */}
      <ProblemStatement />
      {/* Steps */}
      <Steps />

      <div className="text-center my-20">
        <h2 className="text-3xl">Lets get you started</h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <SignUpButton />
          <ChromeExtensionButton />
        </div>
      </div>
    </div>
  );
}

export default page;
