import { useProducts } from "../hooks/useProducts.js";
import { FeaturedGrid } from "../../pages/components/index.js"; // Fixed from FeaturedGrid to match usage
import { ArrowRight } from "lucide-react";
import { ErrorComponent } from "../index.js";

export default function Featured() {
  const { products, loading, error } = useProducts({
    category: "featured",
    page: 1
  });

  if (loading) return <div className="container py-12 text-center">INITIALIZING_DATA...</div>;

  if (error) throw error;

  if (!products || products.length === 0) throw new Error("No featured products found.");

  return (<>
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Featured_Products</h2>
          <div className="h-1 w-12 bg-[var(--color-primary)] mt-1" />
        </div>
        <a
          href="/products"
          className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <FeaturedGrid products={products} />
    </section>
  </>
  );
}