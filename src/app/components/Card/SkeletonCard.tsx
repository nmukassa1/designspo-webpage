// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <li className="overflow-hidden relative flex flex-col animate-pulse">
      <div className="rounded-lg border-2 border-[#f1f1f1] bg-gray-200 h-48" />
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
      <div className="ml-auto mt-2 mr-2 h-4 w-4 bg-gray-300 rounded" />
    </li>
  );
}
