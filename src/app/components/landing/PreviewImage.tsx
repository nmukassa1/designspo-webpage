"use client";

import { useState } from "react";
import { PlayIcon } from "lucide-react";

export default function PreviewImage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="mx-auto w-[90vw] rounded-2xl border-8 border-black overflow-hidden relative">
      {!isPlaying ? (
        <>
          <img src="/desktop-preview.png" alt="" className="w-full" />
          <button
            onClick={handlePlay}
            className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full sm:w-30 sm:h-30 w-20 h-20 z-40"
          >
            <div className="hidden sm:block">
              <PlayIcon size={72} />
            </div>
            <div className="sm:hidden">
              <PlayIcon size={42} />
            </div>
          </button>
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10"></div>
        </>
      ) : (
        <video src="/app_tutorial.mov" autoPlay controls className="w-full" />
      )}
    </section>
  );
}
