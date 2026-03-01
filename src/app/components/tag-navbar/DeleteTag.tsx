"use client";

import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { deleteTagByName } from "@/app/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
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
      <div className="fixed right-[-37px] top-1/2 -translate-y-1/2 -rotate-[90deg] rounded-t-[5px] overflow-hidden bg-[#393535]">
        <button
          className="h-full w-full py-[5px] px-[16px] text-white"
          onClick={handleOpenModal}
        >
          Delete Tag
        </button>
      </div>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the tag <strong>{tagQuery}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteTag;
