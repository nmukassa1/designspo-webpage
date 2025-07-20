import ChromeExtensionButton from "@/app/features/homePage/ChromeExtensionButton";
import DesktopPreview from "@/app/features/homePage/DesktopPreview";
import Hero from "@/app/features/homePage/Hero";
import ProblemStatement from "@/app/features/homePage/ProblemStatement";
import SignUpButton from "@/app/features/homePage/SignUpButton";
import Steps from "@/app/features/homePage/Steps";
import Link from "next/link";

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
