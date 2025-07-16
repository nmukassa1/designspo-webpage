"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { deleteAccount } from "@/app/mutations"; // ← implement this in your mutations file
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
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
      // Optionally clear local auth / cookies here
      router.replace("/"); // or your landing page
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
      // Optionally show an error message to the user
    },
  });

  const handleConfirm = () => mutate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={handleOpen}
        // disabled={isLoading}
        className="mt-2 self-center"
      >
        Delete Account
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is <strong>permanent</strong>. Deleting your account
            cannot be undone and all of your design inspirations will be lost.
            Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            // disabled={isLoading}
          >
            {/* {isLoading ? "Deleting…" : "Confirm"} */}
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteAccountButton;
