import { useDrawerMutations } from "./useDrawerMutations";
import { Button } from "@/components/ui/button";
import { useEditDrawerContext } from "./EditDrawerContext";

export default function DeleteButton() {
  const { deleteScreenshot } = useDrawerMutations();
  const { itemSelected, setIsOpen } = useEditDrawerContext();

  return (
    <div className="mt-4">
      <Button
        variant="destructive"
        onClick={() => {
          if (itemSelected?.id) deleteScreenshot(itemSelected.id);
          setIsOpen(false);
        }}
      >
        Delete Screenshot
      </Button>
    </div>
  );
}
