"use client"
import Link from "next/link";
import {useState } from "react";
import { Tag } from "../types/types";
import { Trash } from "lucide-react";
import { deleteTag } from "../mutations";

function SidebarNav({tags}: {tags: Tag[]}) {
    const [hoveredTag, setHoveredTag] = useState<number | null>(null);
    const userId = '8c43787a-6332-4f73-8ed3-f00a54f801e4';


 

    function toggleMenu() {
        const menu = document.querySelector('aside');
        if (menu?.classList.contains('translate-x-[-100%]')) {
            menu?.classList.toggle('translate-x-[0]');
        }
    }



    return (
        <nav className="h-full">
            <ul className="text-lg fontColor md:h-initial min-h-[80%] overflow-scroll">
                <li>
                    <Link href="/" className="block py-2  hover:bg-white transition linear duration-300" onClick={toggleMenu}>
                        All
                    </Link>
                </li>
                {tags.map((tag) => (
                    <li
                        key={tag.id}
                        className="flex justify-between items-center"
                        onMouseEnter={() => setHoveredTag(tag.id)}
                        onMouseLeave={() => setHoveredTag(null)}
                    >
                        <Link 
                            href={`/?tag=${tag.name}`}
                            className="block py-2 hover:bg-white transition linear duration-300 w-full"
                            onClick={toggleMenu}
                        >
                            {tag.name}
                        </Link>
                        {hoveredTag === tag.id && (
                            <button className="text-red-500 bg-red-100 hover:bg-red-300 cursor-pointer rounded-full w-6 h-6 grid place-content-center" onClick={async () => {
                                const result = await deleteTag(tag.id, userId);
                            }}>
                                <Trash size={16} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <div className="md:hidden flex gap-4 justify-center mt-6">
                <Link href="/profile" onClick={toggleMenu}>Profile</Link>
                <button className="cursor-pointer">Logout</button>
            </div>
        </nav>
    );
}

export default SidebarNav;