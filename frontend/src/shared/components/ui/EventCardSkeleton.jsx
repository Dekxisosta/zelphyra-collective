import Skeleton from "./Skeleton";

export default function EventCardSkeleton() {
  return (
    <div
      className="relative flex-shrink-0 snap-start rounded-2xl overflow-hidden w-full sm:w-full md:w-1/2 lg:w-1/4"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="relative h-60">
        {/* Image */}
        <Skeleton className="w-full h-full rounded-none" />

        {/* Tag + date badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-20 flex flex-col gap-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Button */}
        <Skeleton className="absolute bottom-3 right-3 h-7 w-20 rounded-full" />
      </div>
    </div>
  );
}