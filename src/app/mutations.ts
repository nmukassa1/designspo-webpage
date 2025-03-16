import { api } from "./api";

export async function deleteTag(tagId: number, userId: string) {
    try{
       const result = await api.delete(`/tags/`, {
            data: {
                tagId,
                userId
            }
        })
        return result.status
        
    } catch (error) {
        console.error(error)
    }
}