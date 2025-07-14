"use client";

import { useEffect, useRef, useState } from "react";
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

  const { userId, accessToken } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (tag: string) => {
      if (!userId) {
        throw new Error("User ID is required to add a tag.");
      }
      return addTag(tag, userId, accessToken || ""); // Ensure accessToken is provided
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        formContainer.current &&
        !formContainer.current.contains(target) &&
        showInput
      ) {
        toggleInput(); // Close if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showInput]);

  function toggleInput() {
    const el = formContainer.current;
    if (!el) return;

    const tl = gsap.timeline();
    const duration = { duration: 0.4, ease: "power2.inOut" };

    if (showInput === false) {
      tl.to(el, {
        height: "50px",
        width: "200px",
        border: "1px solid black",
        boxShadow: "1px 2px 0px 2px",
        ...duration,
      });
      // .to(el, { width: "200px", ...duration });
      setShowInput(true);
      inputRef.current?.focus();
    } else {
      tl.to(el, {
        width: "5px",
        height: "0",
        border: "none",
        boxShadow: "0 0 0 0",
        ...duration,
      });

      setShowInput(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="form-wrapper relative border-white shrink-0 ml-auto">
      <button
        id="new-tag-btn"
        className="h-[30px] w-[30px] bg-[#393535] text-white rounded-full text-center"
        onClick={toggleInput}
      >
        +
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
            id="new-tag-input"
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
