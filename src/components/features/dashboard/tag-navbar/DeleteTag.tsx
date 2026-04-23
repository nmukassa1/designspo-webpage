"use client";

import { useState } from "react";
import { useDeleteTagByNameMutation } from "@/domains/tags/query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDashboardContext } from "@/app/context/DashboardContext";

function DeleteTag() {
  const router = useRouter();
  const { tagQuery } = useDashboardContext();

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { mutate } = useDeleteTagByNameMutation(() => {
    router.push("/dashboard");
  });

  const handleConfirmDelete = () => {
    mutate(tagQuery);
    handleCloseModal();
  };

  if (!tagQuery) return null;

  return (
    <>
      <div className="fixed right-[-45px] top-1/2 z-10 -translate-y-1/2 -rotate-[90deg] overflow-hidden rounded-t-xl border border-border bg-primary text-primary-foreground shadow-sm">
        <button
          type="button"
          className="h-full w-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={handleOpenModal}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          Delete Tag
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the tag{" "}
              <strong>{tagQuery}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteTag;
