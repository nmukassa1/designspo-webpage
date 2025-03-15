"use client"
import { MenuIcon } from "lucide-react";

function HamburgerMneu() {
    function toggleMenu() {
        const menu = document.querySelector('aside');
        menu?.classList.toggle('translate-x-[0]');
    }
    return ( 
        <button className="cursor-pointer lg:hidden" onClick={toggleMenu}>
            <MenuIcon />
        </button>
     );
}

export default HamburgerMneu;