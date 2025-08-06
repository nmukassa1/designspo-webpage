import Link from "next/link";

function CallToActionLinks() {
  return (
    <div className="flex items-center justify-center gap-6">
      <Link
        href="/signup"
        className="border-2 border-black rounded-md py-4 px-3 sm:px-6"
      >
        Sign Up
      </Link>
      <Link
        href="https://chromewebstore.google.com/detail/curatemap-extension/cgfifloilikfidnhgdldmnmoooclefgi"
        target="_blank"
        className="border-2 border-black rounded-md py-4 px-3 sm:px-6"
      >
        Download Chrome Extension
      </Link>
    </div>
  );
}

export default CallToActionLinks;
