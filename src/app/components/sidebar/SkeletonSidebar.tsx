function SkeletonSidebar() {
  console.log("SkeletonSidebar");

  return (
    <aside className="flex flex-col h-full bg-white lg:bg-transparent px-4 w-full lg:w-[18%] text-center lg:text-left animate-pulse fixed translate-x-[-100%]">
      <div className="my-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-3/5 mx-auto" />
      </div>

      <div className="mt-auto mb-6 flex flex-col items-center gap-3">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
      </div>
    </aside>
  );
}

export default SkeletonSidebar;
