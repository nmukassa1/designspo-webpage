import { Modal } from "@mui/material";
import { X } from "lucide-react";
import { Screenshot } from "../types/types";
import ExistingTags from "./collectionModal/ExisitngTags";
import { deleteScreenshot } from "../mutations";
import AddNewTag from "./collectionModal/AddNewTag";
import { useAuthContext } from "../context/AuthContext";

interface EditModalProps {
  screenshot: Screenshot;
  handleModal: () => void;
  toggleModal: boolean;
}
function EditModal({ screenshot, handleModal, toggleModal }: EditModalProps) {
  const { userId } = useAuthContext();
  const { id, siteName, tags } = screenshot;
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
            className="bg-red-600 px-4 py-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              if (userId) {
                deleteScreenshot(id, userId);
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
