import { useDrawerMutations } from "./useDrawerMutations";
import { Button } from "../shadcn/button";
import { useEditDrawerContext } from "./EditDrawerContext";

export default function DeleteButton() {
  const { deleteScreenshot } = useDrawerMutations();
  const { itemSelected, setIsOpen } = useEditDrawerContext();

  return (
    <div className="mt-4">
      <Button
        className="bg-red-500"
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
