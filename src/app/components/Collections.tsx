// import { useRouter } from "next/navigation";
import { getCollections } from "../queries";
import { Screenshot, searchParams } from "../types/types";
import Card from "./Card";


async function Collections({searchParams} : searchParams) {

    const searchQuery = await searchParams;
    const tagQuery = searchQuery.tag
    
    const collections = await getCollections('8c43787a-6332-4f73-8ed3-f00a54f801e4', tagQuery);
    
    if(!collections) return

    
    // Reverse the collections array to render from the last element first
    const reversedCollections = collections.reverse();
    
    return ( 
        <div className="h-full px-4 lg:ml-[18%]">
            <h1 className="text-4xl md:text-6xl font-bold">All your design inspirations in one spot</h1>
            <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                {reversedCollections.map((collection: Screenshot) => (
                    <Card key={collection.id} item={collection} />
                ))}
            </ul>
        </div>
     );
}

export default Collections;