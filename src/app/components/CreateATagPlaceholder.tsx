"use client";
function CreateATagPlaceholder() {
  return (
    <button
      id="tags-placeholder"
      className="w-full grow lg:grow-0 lg:h-[80%] border-dashed border-2 border-gray-500 rounded-md grid place-content-center -z-20 text-2xl text-center text-gray-500 font-bold px-4"
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
