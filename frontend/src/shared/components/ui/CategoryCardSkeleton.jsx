import Skeleton from "./Skeleton";
 
export default function CategoryCardSkeleton() {
  return (
    <div
      className="relative min-w-[180px] flex-shrink-0 rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <Skeleton className="w-full h-28 rounded-none" />
 
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
 