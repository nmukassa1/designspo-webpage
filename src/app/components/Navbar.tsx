import Link from "next/link";

function Navbar() {
    return ( 
        <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/profile">Profile</Link>
            <button className="cursor-pointer">Logout</button>
        </nav>
     );
}

export default Navbar;