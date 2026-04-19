import { useProducts } from "../../hooks/useProducts";
import ProductGrid from "../../components/user/ProductGrid.jsx";
import { ArrowRight } from "lucide-react";

export default function Featured() {
  const { products, loading, error } = useProducts({
    category: "featured",
    page: 1
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>

        <a
          href="/products"
          className="flex items-center gap-1 text-sm font-medium hover:opacity-70"
        >
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}