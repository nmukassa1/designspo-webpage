"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/app/components/shadcn/sheet";
import { useEditDrawerContext } from "./EditDrawerContext";
import DrawerHeader from "./DrawerHeader";
import ScreenshotImage from "./ScreenshotImage";
import SiteLink from "./SiteLink";
import TagSelector from "./TagSelector";
import DescriptionForm from "./DescriptionForm";
import DeleteButton from "./DeleteButton";

function EditDrawer() {
  const { isOpen, setIsOpen, itemSelected } = useEditDrawerContext();
  const a11yTitle = itemSelected?.siteName
    ? `Edit ${itemSelected.siteName}`
    : "Edit screenshot";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        showClose={false}
        className="flex flex-col overflow-y-auto"
      >
        <SheetTitle className="sr-only">{a11yTitle}</SheetTitle>
        <div className="space-y-4">
          <DrawerHeader />
          <ScreenshotImage />
          <SiteLink />
          <TagSelector />
          <DescriptionForm />
          <DeleteButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditDrawer;
