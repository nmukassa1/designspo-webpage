// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <li className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-2 animate-pulse">
      <div className="h-48 rounded-xl bg-muted" />
      <div className="p-4">
        <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
      <div className="ml-auto mr-2 mt-2 h-8 w-8 rounded-full bg-muted" />
    </li>
  );
}
