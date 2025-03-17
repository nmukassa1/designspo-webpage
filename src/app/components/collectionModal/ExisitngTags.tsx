import { deleteTagFromCollection } from "@/app/mutations";
import { ScreenshotTag, Tag } from "@/app/types/types";
import { Trash } from "lucide-react";

function ExistingTags({tags, screenShotId} : {tags: ScreenshotTag[], screenShotId: number}) {
    return ( 
        <div className="existingTags mt-6">
            <h2 className="text-xl">Tags</h2>
            <div className="h-[3px] bg-white mt-4 mb-6"></div>
            <ul className="flex flex-col gap-2">
                {tags.map((tag) => (
                    <li key={tag.tag.id} className="shrink-0 text-lg flex items-center gap-2  justify-between">
                        <span>{tag.tag.name}</span>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            deleteTagFromCollection(tag.tag.id, screenShotId, '8c43787a-6332-4f73-8ed3-f00a54f801e4')
                        }}>
                            <button type="submit" className="text-red-500"><Trash /></button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
     );
}

export default ExistingTags;