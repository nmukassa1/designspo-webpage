import Link from "next/link";
import Navbar from "./Navbar";

function Header() {
    return ( 
        <header className="flex items-center justify-between container mx-auto py-6">
            <Link href="/">Designspo</Link>
            <Navbar />
        </header>
     );
}

export default Header;