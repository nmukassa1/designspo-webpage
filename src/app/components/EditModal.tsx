import { Modal } from "@mui/material";
import { X } from "lucide-react";
import { Screenshot } from "../types/types";
import ExistingTags from "./collectionModal/ExisitngTags";
import { deleteScreenshot } from "../mutations";
import AddNewTag from "./collectionModal/AddNewTag";
import { useAuthContext } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EditModalProps {
  screenshot: Screenshot;
  handleModal: () => void;
  toggleModal: boolean;
}
function EditModal({ screenshot, handleModal, toggleModal }: EditModalProps) {
  const { userId } = useAuthContext();
  const { id, siteName, tags } = screenshot;

  const queryClient = useQueryClient();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      setDeleteIsLoading(true);
      return deleteScreenshot(id, userId);
    },
    onSuccess: () => {
      setDeleteIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["collections", userId] }); // Refresh tags after adding
    },
    onError: (error) => {
      console.error("Error deleting screenshot:", error);
      setDeleteIsLoading(false);
    },
  });

  return (
    <Modal
      open={toggleModal}
      onClose={() => {
        toggleModal;
      }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="w-[80%] lg:w-[45%] h-[75%] bg-[#262626] m-4 p-6 rounded-lg text-white font-bold">
        <div className="flex justify-between">
          <h1 className="text-2xl">
            {siteName.charAt(0).toUpperCase() + siteName.slice(1)}
          </h1>
          <button onClick={handleModal}>
            <X />
          </button>
        </div>

        <ExistingTags tags={tags} screenShotId={id} />
        <AddNewTag screenShotId={id} existingTags={tags} />

        <form action="" className="text-center mt-6">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              deleteIsLoading
                ? "bg-red-400 animate-pulse cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500"
            }`}
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
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default EditModal;
