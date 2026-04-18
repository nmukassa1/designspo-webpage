import { ArrowBigDown } from "lucide-react";
import Image from "next/image";

function ProblemStatement() {
  return (
    <div className="md:flex justify-evenly ">
      <div className="md:mt-12">
        <h2 className="text-3xl font-bold">
          Inspiration everywhere, but never in one place.
        </h2>
        <p className="mt-4 text-2xl">
          Bookmarks get messy. <br /> Screenshots get buried. <br /> Our tool
          gives web designers a clean, central space to save and revisit design
          ideas.
        </p>
      </div>
    </div>
  );
}

export default ProblemStatement;

//  <div className="flex flex-col items-center gap-6 mt-6">
//    <div className="relative grid grid-cols-2 w-fit gap-4">
//      {/* Icons */}
//      <Image src="/behanceIcon.png" alt="Behance icon" height={50} width={50} />
//      <Image
//        src="/awwwardsIcon.png"
//        alt="Awwwards icon"
//        height={50}
//        width={50}
//        className="relative top-[15px] left-[10px]"
//      />
//      <Image
//        src="/dribbbleIcon.png"
//        alt="Dribbble icon"
//        height={50}
//        width={50}
//        className="relative bottom-[9px] w-[40px]"
//      />
//      <Image src="/folderIcon.png" alt="Folder icon" height={50} width={50} />
//    </div>

//    <div className="">
//      <ArrowBigDown size={64} />
//    </div>

//    <Image
//      src="/mobile-preview.png"
//      alt="Mobile app ui"
//      layout="responsive"
//      width={377}
//      height={100}
//      className="w-[60%]"
//    />
//  </div>;
