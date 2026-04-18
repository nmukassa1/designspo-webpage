import Image from "next/image";
import PreviewImg from "/desktop-preview.png";

function DesktopPreview() {
  return (
    <div className="relative my-20 md:w-3/4 md:mx-auto">
      <Image
        src="/desktop-preview.png"
        width={377}
        height={100}
        alt="Desktop App Preview"
        layout="responsive"
        className="border-4 border-gray-500 rounded-2xl"
      />

      {/* <div className="radial-blur absolute left-1/2 top-1/2 -translate-1/2 w-[290px] h-[290px] rounded-full  -z-10"> */}
      {/* Radial blur */}
      {/* </div> */}
    </div>
  );
}

export default DesktopPreview;
