"use client";

import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { deleteTagByName } from "@/app/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userId, accessToken } = useAuthContext();
  const { tagQuery } = useDashboardContext();

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { mutate } = useMutation({
    mutationFn: (tagQuery: string) => {
      if (!userId) throw new Error("User ID is required to delete a tag.");
      return deleteTagByName(tagQuery, userId, accessToken || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] });
      router.push("/dashboard");
    },
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
