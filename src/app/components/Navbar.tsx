import Link from "next/link";

function Navbar() {
    return ( 
        <nav className="flex items-center gap-8">
            <Link href="/profile">Profile</Link>
            <button className="cursor-pointer">Logout</button>
        </nav>
     );
}

export default Navbar;