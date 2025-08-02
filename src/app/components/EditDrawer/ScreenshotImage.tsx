import Image from "next/image";
import { useEditDrawerContext } from "./EditDrawerContext";

export default function ScreenshotImage() {
  const { itemSelected } = useEditDrawerContext();

  return (
    <Image
      src={itemSelected?.img || "/placeholder-image.png"}
      alt={itemSelected?.siteName || "Placeholder Image"}
      height={300}
      width={401}
      layout="responsive"
    />
  );
}
