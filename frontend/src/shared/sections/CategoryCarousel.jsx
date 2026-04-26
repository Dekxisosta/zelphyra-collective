import { useCategories } from "../hooks/useCategories";
import { CategoryCard, CategoryCardSkeleton } from "../components";
import { RetryComponent } from "../../shared";

export default function CategoryCarousel() {
  const { categories, loading, error, refetch } = useCategories();

  return (
    <section className="w-full px-6 py-6">
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Shop by Category
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth custom-scrollbar">
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </>
        ) : error ? (
          <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
        ) : (
          <>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}