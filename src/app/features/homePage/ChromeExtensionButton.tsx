import Link from "next/link";

function ChromeExtensionButton() {
  return (
    <Link
      href="https://chromewebstore.google.com/detail/designspo-extension/cgfifloilikfidnhgdldmnmoooclefgi"
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 rounded-md p-2"
    >
      Get the Chrome Extension
    </Link>
  );
}

export default ChromeExtensionButton;
