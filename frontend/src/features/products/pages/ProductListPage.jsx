import { useNavigate } from "react-router-dom";

import { Chip, SkeletonGrid, CategoryPills, Pagination } from "../components";
import { useProducts, ErrorComponent, Card } from "../../../shared";
import { slugify, useProductFilters } from "../../../shared";

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

  const { products, categories, totalPages, loading, error } = useProducts({
    search,
    category,
    sort,
    page,
  });

  if (loading) return <SkeletonGrid />;

  if (error) {
    return <ErrorComponent detail={error} />;
  }

  return (
    <div className="container space-y-5 py-6">

      {/* HEADER */}
      <div>
        <h1 style={{ fontSize: "1.75rem" }}>Products</h1>
        <p style={{ marginTop: "0.25rem" }}>Browse, filter, and discover products</p>
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

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            product={product}
            onClick={() =>
              navigate(`/product/${slugify(product.name)}/${product.id}`)
            }
          />
        ))}
      </div>

      {/* EMPTY */}
      {products.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 0",
            color: "var(--color-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          No products found.
        </div>
      )}

      {/* PAGINATION */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={(p) => updateFilter("page", p)}
      />

    </div>
  );
}