"use client";

import { useRef, useState } from "react";
import { addTag } from "../mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

function NewTag() {
  const [tagName, setTagName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error, setError] = useState<"border-red-500" | "">("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { userId } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (tag: string) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      return addTag(tag, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags", userId] }); // Refresh tags after adding
    },
  });

  const submitTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim() === "") {
      setError("border-red-500");
      return;
    }

    try {
      mutate(tagName);
    } catch (error) {
      console.error(error);
    } finally {
      setTagName("");
      setError("");
      // setShowInput(false);
    }
  };

  return (
    <div className="flex items-center grow-1 relative px-5 border-l-1 border-white shrink-0">
      {/* Form */}
      <div className={`flex gap-2 ${showInput ? "w-full" : "w-0"}`}>
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
        </form>
      </div>

      <button
        id="new-tag-btn"
        className="h-full w-full text-center"
        onClick={() => {
          setShowInput(!showInput);
          if (document.activeElement === inputRef.current) {
            inputRef.current?.blur();
          } else {
            inputRef.current?.focus();
          }
        }}
      >
        + New Tag
      </button>
    </div>
  );
}

export default NewTag;
