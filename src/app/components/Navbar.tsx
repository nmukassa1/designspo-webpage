import Link from "next/link";
import { signOut } from "../authActions/actions";

function Navbar() {
  return (
    <nav className=" items-center gap-8 flex ml-auto mr-8 lg:mr-0">
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
