import Link from "next/link";
import BrandName from "../components/BrandName";
import DesktopPreview from "../features/homePage/DesktopPreview";
import Hero from "../features/homePage/Hero";
import ProblemStatement from "../features/homePage/ProblemStatement";
import Steps from "../features/homePage/Steps";
import SignUpButton from "../features/homePage/SignUpButton";
import ChromeExtensionButton from "../features/homePage/ChromeExtensionButton";
import HeaderNav from "../features/homePage/AuthState";

function page() {
  return (
    <div className="px-6">
      <Hero />
      <DesktopPreview />
      <ProblemStatement />
      <Steps />

      <div className="text-center my-20">
        <h2 className="text-3xl">Lets get you started</h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <SignUpButton />
          <ChromeExtensionButton />
        </div>
      </div>
      <Link href="/privacy" className="flex justify-center underline">
        Privacy
      </Link>
    </div>
  );
}

export default page;
