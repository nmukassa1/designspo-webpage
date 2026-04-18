"use client";

import {
  Sheet,
  SheetContent,
} from "@/app/components/shadcn/sheet";
import { useEditDrawerContext } from "./EditDrawerContext";
import DrawerHeader from "./DrawerHeader";
import ScreenshotImage from "./ScreenshotImage";
import SiteLink from "./SiteLink";
import TagSelector from "./TagSelector";
import DescriptionForm from "./DescriptionForm";
import DeleteButton from "./DeleteButton";

function EditDrawer() {
  const { isOpen, setIsOpen } = useEditDrawerContext();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        showClose={false}
        className="flex flex-col overflow-y-auto"
      >
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
