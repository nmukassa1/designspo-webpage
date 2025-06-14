import Navbar from "./Navbar";
import BrandName from "./BrandName";
import { signOut } from "../authActions/actions";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-99">
      <BrandName href="/dashboard" />

      <div className="flex items-center gap-8">
        <Link href="/dashboard/profile">Profile</Link>

        <form action={signOut}>
          <button type="submit" className="cursor-pointer">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
