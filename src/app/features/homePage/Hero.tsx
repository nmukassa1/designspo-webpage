import ChromeExtensionButton from "./ChromeExtensionButton";
import SignUpButton from "./SignUpButton";

function Hero() {
  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl">
        Your Web Inspiration, All in One Place
      </h1>
      <p className="mt-4">
        Capture, organize, and revisit web design ideas with ease.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <SignUpButton />
        <ChromeExtensionButton />
      </div>
    </div>
  );
}

export default Hero;
