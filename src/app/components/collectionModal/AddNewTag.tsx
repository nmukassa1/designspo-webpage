import { addTagToCollection } from "@/app/mutations";
import { getTags } from "@/app/queries";
import { ScreenshotTag, Tag } from "@/app/types/types";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

interface formDataTypes {
    tagIds: string[];
    screenshotId: number;
    userId: string;
}

function AddNewTag({existingTags, screenshotId}: {existingTags: ScreenshotTag[], screenshotId: number}) {
    const userId = '8c43787a-6332-4f73-8ed3-f00a54f801e4';

    const [tags, setTags] = useState<Tag[]>([]);
    const [refetchTags, setRefFetchTags] = useState<boolean>(false)
    const [formData, setFormData] = useState<formDataTypes>({
        tagIds: [],
        screenshotId,
        userId
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target
        if (e.target.checked) {
            setFormData({...formData,  tagIds: [...(formData.tagIds || []), value] });
          } else {
            setFormData({...formData, tagIds: formData.tagIds?.filter((id) => id !== value) });
          }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(formData.tagIds.length === 0) {
            console.log('No tags selected');
            
            return;
        }

        try{
            await addTagToCollection(formData)
            setRefFetchTags(true)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        async function fetchTags() {
            const tags = await getTags(userId);

            // Filter out the tags that already exist in the collection
            const existingTagIds = existingTags.map((tag) => tag.tag.id)
            const filteredTags = tags.filter((tag) => !existingTagIds.includes(tag.id))
            setTags(filteredTags)
            setRefFetchTags(false)
        }

         fetchTags()
    }, [refetchTags])

    return (
        <form onSubmit={handleSubmit} className="flex gap-6 items-center">
            {tags.map((tag) => (
                <div key={tag.id}>
                    <input type="checkbox" name={'tagId'} value={tag.id} id={tag.name} onChange={handleChange}/>
                    <label className="ml-2" htmlFor={tag.name}>{tag.name}</label>
                </div>
            ))}
            <button type="submit">Add Tag</button>
        </form>
     );
}

export default AddNewTag;