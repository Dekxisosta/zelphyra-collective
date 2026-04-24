import { useProducts } from "../../shared/hooks/useProducts.js";
import { FeaturedGrid } from "../components"; // Fixed from FeaturedGrid to match usage
import { ArrowRight } from "lucide-react";
import { ErrorComponent } from "../../shared";

export default function Featured() {
  const { products, loading, error, refetch } = useProducts({
    category: "featured",
    page: 1
  });

  if (loading) return <div className="container py-12 text-center">INITIALIZING_DATA...</div>;

  if (error) {
    return (
      <div className="container py-12">
        <ErrorComponent type="FETCH_ERROR" onRetry={refetch} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container py-12">
        <ErrorComponent type="EMPTY_RESULT" onHome={() => window.location.href = '/'} />
      </div>
    );
  }

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Featured_Products</h2>
          <div className="h-1 w-12 bg-[var(--color-primary)] mt-1" /> {/* ZZZ accent line */}
        </div>

        <a
          href="/products"
          className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}