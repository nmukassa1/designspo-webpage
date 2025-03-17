"use client"
import { Modal } from "@mui/material";
import { Pencil, Trash, X } from "lucide-react";
import Image from "next/image";
import { Screenshot } from "../types/types";
import Link from "next/link";
import { useState } from "react";
import { deleteTagFromCollection } from "../mutations";

interface CollectionModalProps {
    item: Screenshot;
    handleModal: () => void;
    toggleModal: boolean;
}

function CollectionModal({item, handleModal, toggleModal} : CollectionModalProps) {
    const {img, siteUrl, siteName, tags} = item
    const [editMode, setEditMode] = useState<boolean>(false)
    const userId = '8c43787a-6332-4f73-8ed3-f00a54f801e4';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>, tagId: number, screenshotId: number) {
        e.preventDefault();
        try{
            console.log(tagId, screenshotId, userId);
            await deleteTagFromCollection(tagId, screenshotId, userId)
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <Modal open={toggleModal} onClose={() => {toggleModal}} sx={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                <div className="w-[95%] h-[95%] bg-[#262626] m-4 p-6 rounded-lg text-white">
                    <div className="overflow-hidden h-2/3 rounded-md relative">
                        <div className="modal-image-gradient absolute top-0 left-0 w-full h-full z-99"></div>
                        <Image src={img} alt={siteName} layout="responsive" width={1920} height={1080} />
                    </div>

                    <div className="flex flex-col justify-between h-[33%]">
                        <div className="flex items-center justify-between mt-4">
                            <div className=" flex gap-4 items-center">
                                <h2 className="text-2xl font-bold">{siteName.charAt(0).toUpperCase() + siteName.slice(1)}</h2>
                                <div className="w-[20px] h-[3px] bg-white"></div>
                                <Link href={siteUrl} target="_blank" className="text-xl">Visit Site</Link>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setEditMode(!editMode)}><Pencil size={20} /></button>
                                <button onClick={handleModal}><X /></button>
                            </div>

                        </div>

                        <div className="flex items-center w-full justify-between">
                            <ul className="flex items-center gap-4 text-sm">
                                {tags.map((tag) => (
                                    <li key={tag.tag.id} className="shrink-0 text-lg flex items-center gap-2">
                                        <span>{tag.tag.name}</span>
                                        {editMode && (
                                            <form onSubmit={(e) => handleSubmit(e, tag.tag.id, item.id)}>
                                                <button  type="submit" className="hover:text-red-500"><Trash size={15} /></button>
                                            </form>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
     );
}

export default CollectionModal;