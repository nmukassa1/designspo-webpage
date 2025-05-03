import Navbar from "./Navbar";
import HamburgerMneu from "./HamburgerMenu";
import BrandName from "./BrandName";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-99">
      <BrandName href="/dashboard" />
      <Navbar />
      <HamburgerMneu />
    </header>
  );
}

export default Header;
