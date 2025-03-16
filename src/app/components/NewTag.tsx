"use client"

import { X } from "lucide-react";
import { useState } from "react";
import { addTag } from "../mutations";

function NewTag() {
    const [tagName, setTagName] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);
    const [error, setError] = useState<'border-red-500' | ''>('');

    const submitTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if(tagName.trim() === ''){
            setError('border-red-500');
            return
        } 

        try{
            await addTag(tagName, '8c43787a-6332-4f73-8ed3-f00a54f801e4');
        } catch (error) {
            console.error(error)
        } finally {
            setTagName('');
            setError('');
            // setShowInput(false);
        }
    }

    return ( 
        <div>
            {!showInput ? (
                <button
                    className="w-full text-left"
                    onClick={() => setShowInput(!showInput)}
                >
                    + New Tag
                </button>
            ): (
                <div className="flex gap-2 ">
                    <form onSubmit={submitTag} className="">
                        <input
                            type="text"
                            className={`border-2 ${error} pl-4 outline-none`}
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                        />
                    </form>
                    <button className="shrink-0" onClick={() => setShowInput(false)}><X size={15} /></button>
                </div>
            )}
        </div>
     );
}

export default NewTag;