"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "lucide-react";

export default function PreviewImage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className="relative mx-auto w-[min(90vw,72rem)] overflow-hidden rounded-2xl border-8 border-foreground"
      aria-label="Product preview"
    >
      {!isPlaying ? (
        <>
          <Image
            src="/desktop-preview.png"
            alt="Designspo dashboard showing saved design screenshots"
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 768px) 90vw, 1152px"
            priority
          />
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label="Play product demo video"
            className="absolute top-1/2 left-1/2 z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-28 sm:w-28"
          >
            <span className="hidden sm:block" aria-hidden>
              <PlayIcon size={72} />
            </span>
            <span className="sm:hidden" aria-hidden>
              <PlayIcon size={42} />
            </span>
          </button>
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-black/10"
            aria-hidden
          />
        </>
      ) : (
        <video
          src="/app_tutorial.mov"
          autoPlay
          controls
          className="w-full"
          title="Designspo app tutorial"
        />
      )}
    </section>
  );
}
