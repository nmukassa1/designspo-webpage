"use client"
import { useState } from "react";
import { Screenshot } from "../types/types";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import CollectionModal from "./CollectionModal";

interface CardProps {
    item: Screenshot;
}

function Card({ item }: CardProps) {
    const {img, siteName, tags} = item

    const [toggleModal, setToggleModal] = useState<boolean>(false)

    const handleModal = () => {
        setToggleModal(!toggleModal)
    }
    return ( 
        <>
            <li className="overflow-hidden rounded-lg border-2 border-[#f1f1f1] relative">
                <button className="text-left" onClick={handleModal}>
                    <CardImage img={img}/>
                    <div className="p-4">
                        <CardTitle title={siteName} />
                        <hr className="my-2"/>

                        <ul className="flex items-center overflow-scroll gap-4 text-sm">
                            {tags.map((tag) => (
                                <li key={tag.tag.id} className="shrink-0">{tag.tag.name}</li>
                            ))}
                        </ul>
                    </div>
                </button>
            </li>
            <CollectionModal item={item} handleModal={handleModal} toggleModal={toggleModal} />
        </>
     );
}

export default Card;