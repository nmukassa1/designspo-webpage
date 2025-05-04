"use client";

import { Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { addTag } from "../mutations";

function NewTag({ btnClass }: { btnClass?: string }) {
  const [tagName, setTagName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error, setError] = useState<"border-red-500" | "">("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim() === "") {
      setError("border-red-500");
      return;
    }

    try {
      await addTag(tagName, "8c43787a-6332-4f73-8ed3-f00a54f801e4");
    } catch (error) {
      console.error(error);
    } finally {
      setTagName("");
      setError("");
      // setShowInput(false);
    }
  };

  return (
    <div className="w-full absolute bottom-[80px] left-0 py-[10px] border-t-2 bg-white">
      <div className="h-full relative bg-white">
        <button
          id="new-tag-btn"
          className="h-full w-full text-center"
          onClick={() => {
            setShowInput(!showInput);
            inputRef.current?.focus();
          }}
        >
          + New Tag
        </button>

        <div
          className={`flex gap-2 absolute ${
            showInput ? "-top-[60px]" : "top-0"
          } left-0 w-full bg-[#262626] rounded-tl-2xl rounded-tr-2xl -z-10 transition-all ease-in duration-100`}
        >
          <form
            onSubmit={submitTag}
            className="flex items-center justify-between w-full px-4"
          >
            <input
              type="text"
              className={`${error} outline-none h-[50px] text-white w-full`}
              value={tagName}
              placeholder="Tag name"
              onChange={(e) => setTagName(e.target.value)}
              ref={inputRef}
            />
            <button
              type="submit"
              className="text-green-300"
              onClick={() => setShowInput(false)}
            >
              <Check />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTag;
