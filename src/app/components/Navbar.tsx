import Link from "next/link";
import { signOut } from "../authActions/actions";

function Navbar() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      <Link href="/dashboard/profile">Profile</Link>

      <form action={signOut}>
        <button type="submit" className="cursor-pointer">
          Logout
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
