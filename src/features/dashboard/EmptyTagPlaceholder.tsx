"use client";
function EmptyTagPlaceholder() {
  return (
    <button
      id="tags-placeholder"
      className="border-2 border-black text-sm p-2 rounded-md mt-2"
      onClick={() => {
        const newTagBtn = document.getElementById("new-tag-btn");
        newTagBtn?.click();
      }}
    >
      <p className="">Create a new tag</p>
    </button>
  );
}

export default EmptyTagPlaceholder;
