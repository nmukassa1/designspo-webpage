"use server"
import { revalidatePath } from "next/cache";
import { api } from "./api";

export async function deleteTag(tagId: number, userId: string) {
    try{
       const result = await api.delete(`/tags/`, {
            data: {
                tagId,
                userId
            }
        })
        revalidatePath('/')
        return result.status
        
    } catch (error) {
        console.error(error)
    }
}

export async function addTag(name: string, userId: string) {
    try{
        const result = await api.post(`/tags/`, {
            name,
            userId
        })
        revalidatePath('/')
        return result.status
    } catch (error) {
        console.error(error)
    }
}

// export async function addTagToCollection(formData: {tagIds: string[], screenshotId: number, userId: string}) {
//     const {tagIds, screenshotId, userId} = formData
//     console.log(tagIds, screenshotId, userId);
    
//     try{
//         const result = await api.patch(`/screenshots/addTag`, {
//             tagIds,
//             screenshotId,
//             userId
//         })
//         revalidatePath('/')
//         return result.status
//     } catch (error) {
//         console.error(error)
//     }
// }
export async function addTagToCollection(tagId: number, screenshotId: number, userId: string) {
    
    try{
        const result = await api.patch(`/screenshots/addTag`, {
            tagId,
            screenshotId,
            userId
        })
        revalidatePath('/')
        return result.status
    } catch (error) {
        console.error(error)
    }
}

export async function deleteTagFromCollection(tagId: number, screenshotId: number, userId: string) {
    console.log(tagId, screenshotId, userId);
    
    try{
        const result = await api.patch(`/screenshots/removeTag`, {
            tagId,
            screenshotId,
            userId
        })
        revalidatePath('/')
        return result.status
    } catch (error) {
        console.error(error)
    }
}