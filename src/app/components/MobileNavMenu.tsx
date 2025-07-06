import { X } from "lucide-react";
import Link from "next/link";
import { signOut } from "../authActions/actions";

function MobileNavMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div
      className={`mobile-nav-menu h-screen w-screen bg-white fixed top-0 ${
        isOpen ? "right-0" : "-right-[100%]"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="button-wrapper">
        <button onClick={() => setIsOpen(!isOpen)}>
          <X />
        </button>
      </div>

      <div className="mobile-nav-menu-link-wrapper">
        <Link href="/dashboard" onClick={() => setIsOpen(!isOpen)}>
          Dashboard
        </Link>

        <Link href="/dashboard/profile" onClick={() => setIsOpen(!isOpen)}>
          Profile
        </Link>

        <form
          action={() => {
            signOut();
            setIsOpen(!isOpen);
          }}
        >
          <button type="submit" className="cursor-pointer">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default MobileNavMenu;
