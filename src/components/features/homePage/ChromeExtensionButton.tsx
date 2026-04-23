import Link from "next/link";

function ChromeExtensionButton() {
  return (
    <Link
      href="https://chromewebstore.google.com/detail/designspo-extension/cgfifloilikfidnhgdldmnmoooclefgi"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-border bg-card px-6 py-3 font-medium transition-all duration-200 hover:bg-secondary hover:shadow-lg"
    >
      Get the Chrome Extension
    </Link>
  );
}

export default ChromeExtensionButton;
