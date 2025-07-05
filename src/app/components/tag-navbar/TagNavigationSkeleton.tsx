function TagNavigationSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 h-full mb-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          key={index}
          className="w-12 h-2 bg-gray-400 animate-pulse rounded-full"
        ></div>
      ))}
    </div>
  );
}

export default TagNavigationSkeleton;
