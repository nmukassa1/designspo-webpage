import Link from "next/link";
import Navbar from "./Navbar";

function Header() {
    return ( 
        <header className="flex items-center justify-between px-6 py-6">
            <Link href="/" className="text-2xl font-bold">Designspo</Link>
            <Navbar />
        </header>
     );
}

export default Header;