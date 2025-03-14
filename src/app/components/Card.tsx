import Link from "next/link";
import { Screenshot } from "../types/types";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";

interface CardProps {
    item: Screenshot;
}

function Card({ item }: CardProps) {
    const {img, siteUrl, siteName, tags} = item
    return ( 
        <li className="overflow-hidden rounded-lg border-2 border-[#f1f1f1]">
            <Link href={siteUrl} target="_blank" rel="noopener noreferrer">
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
            </Link>
        </li>
     );
}

export default Card;