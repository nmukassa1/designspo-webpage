import Image from "next/image";

function DesktopPreview() {
  return (
    <div className="relative my-16 md:mx-auto md:my-20 md:w-3/4">
      <Image
        src="/desktop-preview.png"
        width={1200}
        height={675}
        alt="Designspo dashboard on desktop"
        sizes="(max-width: 768px) 100vw, 75vw"
        className="rounded-2xl border-4 border-border"
      />
    </div>
  );
}

export default DesktopPreview;
