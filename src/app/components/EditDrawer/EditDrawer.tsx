import { Drawer } from "@mui/material";
import { useEditDrawerContext } from "./EditDrawerContext";
import DrawerHeader from "./DrawerHeader";
import ScreenshotImage from "./ScreenshotImage";
import SiteLink from "./SiteLink";
import TagSelector from "./TagSelector";
import DescriptionForm from "./DescriptionForm";
import DeleteButton from "./DeleteButton";

function EditDrawer() {
  const { isOpen } = useEditDrawerContext();

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "100vw", // For extra-small screens and below
            sm: "60vw", // For small screens
            md: "30vw", // For medium screens and above
          },
          height: "100vh",
          borderRadius: {
            xs: "0",
            sm: "15px 0 0 15px",
          },
          padding: "20px",
        },
      }}
    >
      <div className="space-y-4">
        <DrawerHeader />
        <ScreenshotImage />
        <SiteLink />
        <TagSelector />
        <DescriptionForm />
        <DeleteButton />
      </div>
    </Drawer>
  );
}

export default EditDrawer;
