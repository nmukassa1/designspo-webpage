"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
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
        className="flex h-dvh max-h-dvh flex-col overflow-hidden"
      >
        <SheetTitle className="sr-only shrink-0">{a11yTitle}</SheetTitle>
        {/* min-h-0 lets this flex child shrink so overflow-y-auto can scroll on mobile */}
        <div className="min-h-0 flex-1 touch-pan-y space-y-4 overflow-y-auto overscroll-contain">
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
