import { X } from "lucide-react";
import { useEditDrawerContext } from "./EditDrawerContext";

export default function DrawerHeader() {
  const { itemSelected, handleIsOpen } = useEditDrawerContext();

  const siteName = itemSelected?.siteName || "Default Site Name";

  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-semibold">
        {siteName.charAt(0).toUpperCase() + siteName.slice(1)}
      </p>
      <button onClick={() => handleIsOpen(null)}>
        <X />
      </button>
    </div>
  );
}
