"use client"
import { useRouter } from "next/navigation";
import { Screenshot } from "../types/types";
import Card from "./Card";

function CollectionsClient({collections} : {collections: Screenshot[]}) {
    // const router = useRouter()
    // console.log(router);
    
    // Reverse the collections array to render from the last element first
    const reversedCollections = collections.reverse();
    return ( 
        <div className="h-full px-4">
            <h1 className="text-4xl font-bold">All your design inspirations in one spot</h1>
            <ul className="mt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                {reversedCollections.map((collection: Screenshot) => (
                    <Card key={collection.id} item={collection} />
                ))} 
            </ul>
        </div>
     );
}

export default CollectionsClient;