"use client"
import Link from "next/link";
import { getTags } from "../queries";
import { useEffect, useState } from "react";
import { Tag } from "../types/types";


function SidebarNav() {

    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        async function fetchData() {
            const tags = await getTags('8c43787a-6332-4f73-8ed3-f00a54f801e4');
            setTags(tags);
        }
        fetchData()
    }, [])

    if(tags.length === 0) {
        return null;
    }

    function toggleMenu() {
        const menu = document.querySelector('aside');
        if(menu?.classList.contains('translate-x-[-100%]')) {
            menu?.classList.toggle('translate-x-[0]');
        }
    }
    
    return ( 
        <nav className="h-full">
            <ul className="text-lg fontColor md:h-initial min-h-[80%] overflow-scroll">
                <Link  href="/" className="block py-2 px-4 hover:bg-white transition linear duration-300" onClick={toggleMenu}>All</Link>
                {tags.map((tag) => (
                    <Link 
                        key={tag.id} 
                        href={`/?tag=${tag.name}`}
                        className="block py-2 px-4 hover:bg-white transition linear duration-300"
                        onClick={toggleMenu}
                    >{tag.name}</Link>
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