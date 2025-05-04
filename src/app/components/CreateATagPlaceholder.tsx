"use client";
function CreateATagPlaceholder() {
  return (
    <button
      id="tags-placeholder"
      className="w-full h-[80%] border-dashed border-2 border-gray-500 rounded-md grid place-content-center -z-20"
      onClick={() => {
        const newTagBtn = document.getElementById("new-tag-btn");
        newTagBtn?.click();
      }}
    >
      <p>Create a new tag</p>
    </button>
  );
}

export default CreateATagPlaceholder;
