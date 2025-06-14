"use client";
import { useState } from "react";
import { Screenshot } from "../types/types";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import { Pencil } from "lucide-react";
import EditModal from "./EditModal";
import Link from "next/link";

interface CardProps {
  item: Screenshot;
}

function Card({ item }: CardProps) {
  const { img, siteName, siteUrl } = item;

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleModal = () => {
    setToggleModal(!toggleModal);
  };
  return (
    <>
      <li className="overflow-hidden relative flex flex-col">
        <div className="rounded-lg border-2 border-[#f1f1f1]">
          <Link
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left"
          >
            <CardImage img={img} />
            <div className="p-4">
              <CardTitle title={siteName} />
            </div>
          </Link>
        </div>
        <button className="ml-auto mt-2 mr-2" onClick={handleModal}>
          <Pencil size={14} />
        </button>
      </li>
      <EditModal
        screenshot={item}
        handleModal={handleModal}
        toggleModal={toggleModal}
      />
    </>
  );
}

export default Card;
