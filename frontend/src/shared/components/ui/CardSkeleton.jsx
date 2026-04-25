import Skeleton from "./Skeleton";

export default function CardSkeleton() {
  return (
    <div className="relative flex flex-col rounded-[12px] overflow-hidden border bg-[var(--color-surface)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Image */}
      <Skeleton className="aspect-square w-full rounded-t-[12px] rounded-b-none" />

      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Rating + sold row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>

        {/* Product name */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="flex-1" />

        {/* Price + button row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-8 w-16 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}