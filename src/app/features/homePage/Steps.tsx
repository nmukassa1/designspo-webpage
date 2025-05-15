import Image from "next/image";
import ChromeExtensionButton from "./ChromeExtensionButton";
import SignUpButton from "./SignUpButton";

function Steps() {
  return (
    <div className="mt-12 md:mt-40 grid grid-cols-1 gap-12 md:grid-cols-2 md:w-3/4 md:mx-auto">
      <div className="steps">
        <div className="step-number w-[50px] h-[50px] rounded-full bg-gray-500 grid place-content-center">
          1
        </div>
        <p className="step-paragraph text-2xl mt-2">
          Create an account & download the chrome extension
        </p>
        <div className="mt-8 flex items-center gap-4">
          <SignUpButton />
          <ChromeExtensionButton />
        </div>
      </div>

      <div className="steps relative md:row-start-2 md:col-start-2">
        <div className="step-number w-[50px] h-[50px] rounded-full bg-gray-500 grid place-content-center">
          2
        </div>
        <p className="step-paragraph text-2xl mt-2">
          Take a screenshot of the site you find inspiring using the chrome
          extension
        </p>
        <div className="mt-8 mx-auto w-fit md:mx-0 md:absolute md:-top-[370px] md:left-[90px]">
          <Image
            src="/chrome-extension.png"
            alt="Chrome extension screenshot"
            width={300}
            height={500}
            className="border-4 border-gray-500 rounded-2xl"
          />
        </div>
      </div>

      <div className="steps md:row-start-3 md:col-start-1">
        <div className="step-number w-[50px] h-[50px] rounded-full bg-gray-500 grid place-content-center">
          3
        </div>
        <p className="step-paragraph text-2xl mt-2">
          Revisit designs via the dashboard
        </p>
        <div className="mt-8">
          <Image
            src="/desktop-preview.png"
            alt="Desktop preview"
            width={500}
            height={300}
            className="border-4 border-gray-500 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Steps;
