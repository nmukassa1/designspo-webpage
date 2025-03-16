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