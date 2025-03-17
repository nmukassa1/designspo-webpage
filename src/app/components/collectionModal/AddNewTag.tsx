import { addTagToCollection } from "@/app/mutations";
import { getTags } from "@/app/queries";
import { ScreenshotTag } from "@/app/types/types";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

const userId = "8c43787a-6332-4f73-8ed3-f00a54f801e4";
function AddNewTag({screenShotId, existingTags} : {screenShotId: number, existingTags: ScreenshotTag[]}) {

    const queryClient = useQueryClient();

    const {data: tags} = useQuery({
        queryKey: ["tags", userId], 
        queryFn: ({ queryKey }) => getTags(queryKey[1] as string), 
      });

       // Filter out existing tags
    const filteredTags = tags?.filter((tag) => !existingTags.map(t => t.tagId).includes(tag.id));
    
     // Mutation for adding tags
     const { mutate } = useMutation({
        mutationFn: (tagId: number) => addTagToCollection(tagId, screenShotId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
        },
    });
      
    return ( 
        <div className="addTags mt-6">
            <h2 className="text-xl">Add Tags</h2>
            <div className="h-[3px] bg-white mt-4 mb-6"></div>
            <ul className="flex flex-col gap-2">
                {filteredTags?.map((tag) => (
                    <li key={tag.id} className="shrink-0 text-lg flex items-center gap-2  justify-between">
                        <span>{tag.name}</span>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            mutate(tag.id);
                        }}>
                            <button type="submit" className="text-green-500"><Check /></button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
     );
}

export default AddNewTag;