import { api } from "./api";
import { Screenshot, Tag } from "./types/types";

export const getCollections = async (userId: string): Promise<Screenshot[]> => {
    try {
        const response = await api.get('/screenshots/' + userId); 
        const result: Screenshot[] = response.data; 
        // console.log(result);
        return result; // Return the result
    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of error
    }
}

export const getTags = async (userId: string): Promise<Tag[]> => {
    try {
        const response = await api.get('/tags/' + userId); 
        const result: Tag[] = response.data; 
        // console.log(result);
        return result; // Return the result
    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of error
    }
}