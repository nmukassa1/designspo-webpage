"use client";

import { useRef, useState } from "react";
import { addTag } from "../mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { gsap } from "gsap";

function NewTag() {
  const [tagName, setTagName] = useState<string>("");
  // const [showInput, setShowInput] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error, setError] = useState<"border-red-500" | "">("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formContainer = useRef<HTMLDivElement>(null);

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

  function toggleInput() {
    const el = formContainer.current;
    if (!el) return;

    const tl = gsap.timeline({ duration: 0.1, ease: "power2.inOut" });

    if (showInput === false) {
      tl.to(el, { height: "50px" })
        .to(
          el,
          { border: "1px solid black", boxShadow: "1px 2px 0px 2px" },
          "<"
        )
        .to(el, { width: "200px" });
      setShowInput(true);
      inputRef.current?.focus();
    } else {
      tl.to(el, { width: "5px" })
        .to(el, {
          height: "0",
        })
        .to(el, { border: "none", boxShadow: "0 0 0 0" }, "<");
      setShowInput(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="relative border-white shrink-0 ml-auto">
      <button
        id="new-tag-btn"
        className="h-full w-full text-center"
        onClick={toggleInput}
      >
        + New Tag
      </button>

      {/* Form */}
      <div
        ref={formContainer}
        className={`absolute top-[34px] h-0 w-[5px] right-0 flex gap-2 bg-white `}
      >
        <form
          onSubmit={submitTag}
          className="flex items-center justify-between w-full px-4"
        >
          <input
            type="text"
            className={`${error} outline-none h-full w-full`}
            value={tagName}
            placeholder="Tag name"
            onChange={(e) => setTagName(e.target.value)}
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  );
}

export default NewTag;
