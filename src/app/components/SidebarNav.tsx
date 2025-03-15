import Link from "next/link";
import { getTags } from "../queries";


async function SidebarNav() {

    const tags = await getTags('8c43787a-6332-4f73-8ed3-f00a54f801e4')
    if(!tags) return
    
    return ( 
        <nav className="h-full">
            <ul className="text-lg fontColor">
                <Link  href="/" className="block py-2 px-4 hover:bg-white transition linear duration-300">All</Link>
                {tags.map((tag) => (
                    <Link 
                        key={tag.id} 
                        href={`/?tag=${tag.name}`}
                        className="block py-2 px-4 hover:bg-white transition linear duration-300"
                    >{tag.name}</Link>
                ))}
            </ul>
        </nav>
     );
}

export default SidebarNav;