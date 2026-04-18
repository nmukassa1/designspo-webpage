"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/shadcn/dialog";
import { Button } from "@/app/components/shadcn/button";
import { deleteAccount } from "@/app/mutations";

function DeleteAccountButton() {
  const { userId, accessToken } = useAuthContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!userId) {
        console.error("User ID is required to delete account.");
        throw new Error("User ID is required to delete account.");
      }
      return deleteAccount(userId, accessToken || "");
    },
    onSuccess: () => {
      console.log("Account deleted successfully");
      alert("Your account has been deleted successfully.");
      router.replace("/");
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    },
  });

  const handleConfirm = () => mutate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="mt-2 self-center border-destructive text-destructive hover:bg-destructive/10"
        onClick={handleOpen}
      >
        Delete Account
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action is <strong>permanent</strong>. Deleting your account
              cannot be undone and all of your design inspirations will be
              lost. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteAccountButton;
