import { createContext, useContext, useState } from "react";
import { Screenshot } from "@/app/types/types";

interface EditDrawerContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleIsOpen: (itemSelected: Screenshot | null) => void; // Update this line
  itemSelected: Screenshot | null;
}

const EditDrawer = createContext<EditDrawerContextType>({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
  handleIsOpen: () => {}, // Update this line
  itemSelected: null, // Initialize itemSelected as null
});

export const EditDrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<Screenshot | null>(null);

  const handleIsOpen = (itemSelected?: Screenshot | null) => {
    setIsOpen(!isOpen);
    console.log(
      "EditDrawerProvider handleIsOpen called with itemSelected:",
      itemSelected
    );
    setItemSelected(itemSelected || null);
  };

  return (
    <EditDrawer.Provider
      value={{ isOpen, setIsOpen, handleIsOpen, itemSelected }}
    >
      {children}
    </EditDrawer.Provider>
  );
};

export const useEditDrawerContext = () => {
  const context = useContext(EditDrawer);
  if (!context) {
    throw new Error(
      "useEditDrawerContext must be used within a EditDrawerProvider"
    );
  }
  return context;
};
