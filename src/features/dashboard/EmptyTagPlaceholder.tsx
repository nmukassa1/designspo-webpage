"use client";
function EmptyTagPlaceholder() {
  return (
    <button
      id="tags-placeholder"
      className="mt-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-all hover:bg-secondary"
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
