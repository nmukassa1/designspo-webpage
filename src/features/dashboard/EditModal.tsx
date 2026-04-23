"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Screenshot } from "@/app/types/types";
import ExistingTags from "./collectionModal/ExistingTags";
import { deleteScreenshot } from "@/app/mutations";
import AddNewTag from "./collectionModal/AddNewTag";
import { useAuthContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKeys } from "@/lib/query/keys";

interface EditModalProps {
  screenshot: Screenshot;
  handleModal: () => void;
  toggleModal: boolean;
}
function EditModal({ screenshot, handleModal, toggleModal }: EditModalProps) {
  const { userId, accessToken } = useAuthContext();
  const { id, siteName, tags } = screenshot;

  const queryClient = useQueryClient();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      setDeleteIsLoading(true);
      if (!accessToken) {
        throw new Error("Access token is required to delete a screenshot.");
      }
      return deleteScreenshot(id, userId, accessToken);
    },
    onSuccess: () => {
      setDeleteIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.byUser(userId),
      });
    },
    onError: (error) => {
      console.error("Error deleting screenshot:", error);
      setDeleteIsLoading(false);
    },
  });

  return (
    <Dialog
      open={toggleModal}
      onOpenChange={(open) => {
        if (!open) handleModal();
      }}
    >
      <DialogContent
        showClose={false}
        className="flex max-h-[85dvh] w-full flex-col overflow-hidden lg:w-[45%]"
      >
        <div className="flex justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <DialogTitle className="text-2xl font-bold">
              {siteName.charAt(0).toUpperCase() + siteName.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Add or remove tags for this screenshot, or delete it from your
              library.
            </DialogDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleModal}
            aria-label="Close dialog"
            className="shrink-0"
          >
            <X className="size-6" />
          </Button>
        </div>

        <ul className="mt-2 flex h-[400px] flex-col gap-2 overflow-y-auto">
          <ExistingTags tags={tags} screenShotId={id} />
          <AddNewTag screenShotId={id} existingTags={tags} />
        </ul>

        <div className="mt-3 flex justify-center border-t border-border pt-3">
          <Button
            type="button"
            variant="destructive"
            disabled={deleteIsLoading}
            className={deleteIsLoading ? "animate-pulse" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (userId) {
                mutate(id);
              } else {
                console.error("User ID is null. Cannot delete screenshot.");
              }
            }}
          >
            Delete Screenshot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
