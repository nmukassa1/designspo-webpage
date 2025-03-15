import Link from "next/link";
import Navbar from "./Navbar";
import HamburgerMneu from "./HamburgerMenu";

function Header() {
    return ( 
        <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-99">
            <Link href="/" className="text-2xl font-bold">Designspo</Link>
            <Navbar />
            <HamburgerMneu />
        </header>
     );
}

export default Header;