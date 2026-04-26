import { useNavigate } from "react-router-dom";

import { Chip, CategoryPills, Pagination } from "../components";
import { useProducts, ProductCard, RetryComponent, EmptyComponent } from "../../../shared";
import { useCategories, slugify, useProductFilters, ProductCardSkeleton} from "../../../shared";

export default function ProductListPage() {
  const navigate = useNavigate();

  const {
    search,
    category,
    sort,
    page,
    searchInput,
    setSearchInput,
    updateFilter,
  } = useProductFilters();

  const { products, totalPages, loading, error, refetch } = useProducts({ search, category, sort, page });
  const { categories } = useCategories();

  return (
    <div className="container space-y-5 py-6">

      {/* HEADER */}
      <div>
        <h1 style={{ fontSize: "1.75rem", color: "var(--color-text)" }}>Products</h1>
        <p style={{ marginTop: "0.25rem", color: "var(--color-text-muted)" }}>
          Browse, filter, and discover products
        </p>
      </div>

      {/* SEARCH + SORT */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          style={{
            flex: 1,
            padding: "0.5rem 0.875rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "0.875rem",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <select
          value={sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          style={{
            padding: "0.5rem 0.875rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "0.875rem",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="newest">Newest</option>
          <option value="rating">Best Rated</option>
          <option value="price_low">Price ↑</option>
          <option value="price_high">Price ↓</option>
        </select>
      </div>

      {/* CATEGORY PILLS */}
      <CategoryPills
        categories={categories}
        active={category}
        onChange={(c) => updateFilter("category", c)}
      />

      {/* ACTIVE CHIPS */}
      {(search || category !== "all") && (
        <div className="flex gap-2 flex-wrap">
          {search && (
            <Chip
              label={`Search: ${search}`}
              onClear={() => updateFilter("search", "")}
            />
          )}
          {category !== "all" && (
            <Chip
              label={`Category: ${category}`}
              onClear={() => updateFilter("category", "all")}
            />
          )}
        </div>
      )}

      {/* STATES */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyComponent
          title="No products found"
          message="Try adjusting your search or filters."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((product, index) => (
              
              <ProductCard
                key={product.id}
                product={product}
                style={{
                  animation: "fadeUp 0.3s ease forwards",
                  animationDelay: `${index * 30}ms`,
                  opacity: 0,
                }}
              />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={(p) => updateFilter("page", p)}
          />
        </>
      )}

    </div>
  );
}