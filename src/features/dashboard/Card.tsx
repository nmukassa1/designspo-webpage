"use client";
import { Screenshot } from "@/app/types/types";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEditDrawerContext } from "./EditDrawer/EditDrawerContext";

interface CardProps {
  item: Screenshot;
}

function Card({ item }: CardProps) {
  const { handleIsOpen } = useEditDrawerContext();
  const { img, siteName, siteUrl } = item;

  return (
    <>
      <li className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="overflow-hidden rounded-xl">
          <Link
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left"
          >
            <CardImage img={img} />
            <div className="p-4 pb-3">
              <CardTitle title={siteName} />
            </div>
          </Link>
        </div>
        <button
          className="ml-auto mr-2 mt-1 rounded-full border border-border bg-secondary p-2 transition-all hover:scale-105 hover:shadow-sm"
          onClick={() => handleIsOpen(item)}
        >
          <Pencil size={14} />
        </button>
      </li>
    </>
  );
}

export default Card;
