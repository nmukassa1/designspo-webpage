import { getCollections } from "../queries";
import { Screenshot } from "../types/types";
import Card from "./Card";

async function Collections() {
    
    const collections = await getCollections('8c43787a-6332-4f73-8ed3-f00a54f801e4');
    console.log(collections);
    
    if(!collections) return
    
    return ( 
        <div className="h-full px-4">
            <ul className="grid grid-cols-4 gap-6">
                {collections.map((collection: Screenshot) => (
                    <Card key={collection.id} item={collection} />
                ))}
            </ul>
        </div>
     );
}

export default Collections;