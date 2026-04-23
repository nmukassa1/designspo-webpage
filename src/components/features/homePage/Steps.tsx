import Image from "next/image";
import ChromeExtensionButton from "./ChromeExtensionButton";
import SignUpButton from "./SignUpButton";

function Steps() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-2 md:mx-auto">
      <div className="steps rounded-2xl border border-border bg-card p-6">
        <div className="step-number grid h-[50px] w-[50px] place-content-center rounded-full">
          1
        </div>
        <p className="step-paragraph mt-2 text-xl text-foreground">
          Create an account & download the chrome extension
        </p>
        <div className="mt-8 flex items-center gap-4">
          <SignUpButton />
          <ChromeExtensionButton />
        </div>
      </div>

      <div className="steps relative rounded-2xl border border-border bg-card p-6 md:row-start-2 md:col-start-2">
        <div className="step-number grid h-[50px] w-[50px] place-content-center rounded-full">
          2
        </div>
        <p className="step-paragraph mt-2 text-xl text-foreground">
          Take a screenshot of the site you find inspiring using the chrome
          extension
        </p>
        <div className="mt-8 mx-auto w-fit md:mx-0 md:absolute md:-top-[370px] md:left-[90px]">
          <Image
            src="/chrome-extension.png"
            alt="Chrome extension screenshot"
            width={300}
            height={500}
            className="rounded-2xl border border-border"
          />
        </div>
      </div>

      <div className="steps rounded-2xl border border-border bg-card p-6 md:row-start-3 md:col-start-1">
        <div className="step-number grid h-[50px] w-[50px] place-content-center rounded-full">
          3
        </div>
        <p className="step-paragraph mt-2 text-xl text-foreground">
          Revisit designs via the dashboard
        </p>
        <div className="mt-8">
          <Image
            src="/desktop-preview.png"
            alt="Desktop preview"
            width={500}
            height={300}
            className="rounded-2xl border border-border"
          />
        </div>
      </div>
    </div>
  );
}

export default Steps;
