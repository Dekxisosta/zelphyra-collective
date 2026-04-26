import { useFeatured } from "../hooks/useFeatured"
import { RetryComponent, EmptyComponent, ProductCard } from "../components/ui"
import { useNavigate } from "react-router-dom"
import { slugify } from "../utils"

export default function Featured() {
  const { featured, loading, error, refetch } = useFeatured()
  const navigate = useNavigate()

  if (loading) return null  

  if (error) return (
    <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
  )

  if (!featured.length) return (
    <EmptyComponent
      title="No featured products"
      message="Check back soon for curated picks."
    />
  )

  return (
    <section className="w-full px-6 py-6">
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Featured
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featured.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${slugify(product.name)}/${product.id}`)}
          />
        ))}
      </div>
    </section>
  )
}