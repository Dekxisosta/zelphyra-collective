import { useState } from "react";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { RetryComponent, EmptyComponent } from "../../../shared";
import { TableWrap, Th, Td } from "../components/ui/AdminTable";
import AdminStatusPill from "../components/ui/AdminStatusPill";
import ProductFormModal from "../components/ProductFormModal";

export default function ProductsAdminPage() {
  const [modalOpen, setModalOpen]   = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [search, setSearch]         = useState("")
  const [page, setPage]             = useState(1)
  const [confirming, setConfirming] = useState(null)

  const { products, totalPages, loading, error, refetch, deleteProduct } = useAdminProducts({ search, page })

  const handleAdd = () => {
    setEditTarget(null)
    setModalOpen(true)
  }

  const handleEdit = (product) => {
    setEditTarget(product)
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setConfirming(null)
    } catch {
      alert("Failed to delete product.")
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* HEADER */}
      <div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Catalog
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2rem", fontWeight: 800 }}>
          Products
        </h1>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search by name or SKU..."
          style={{
            flex: 1, minWidth: "200px",
            padding: "0.5rem 0.875rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "0.875rem",
            fontFamily: "inherit",
            outline: "none",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add Product
        </button>
      </div>

      {/* STATES */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: "52px", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", opacity: 0.6 }} />
          ))}
        </div>
      ) : error ? (
        <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyComponent title="No products found" message="Try adjusting your search." />
      ) : (
        <>
          <TableWrap>
            <thead>
              <tr>
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th>Category</Th>
                <Th>Pill</Th>
                <Th right>Price</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
                >
                  {/* Product */}
                  <Td>
                    <div className="flex items-center gap-3">
                      {p.images?.find(img => img.is_primary)?.url && (
                        <img
                          src={p.images.find(img => img.is_primary).url}
                          alt={p.name}
                          style={{ width: "36px", height: "36px", borderRadius: "var(--radius)", objectFit: "cover", flexShrink: 0 }}
                        />
                      )}
                      <div>
                        <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>{p.name}</p>
                        {p.brand && <p style={{ color: "var(--color-text-muted)", fontSize: "0.7rem" }}>{p.brand}</p>}
                      </div>
                    </div>
                  </Td>

                  {/* SKU */}
                  <Td muted>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{p.sku ?? "—"}</span>
                  </Td>

                  {/* Category */}
                  <Td muted>{p.category_id ?? "—"}</Td>

                  {/* Pill */}
                  <Td>
                    {p.pill
                      ? <AdminStatusPill status={p.pill.label} />
                      : <span style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>—</span>
                    }
                  </Td>

                  {/* Price */}
                  <Td right>
                    <div>
                      <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>
                        ₱{Number(p.price).toFixed(2)}
                      </p>
                      {p.discount_percent && (
                        <p style={{ color: "#10b981", fontSize: "0.7rem" }}>-{p.discount_percent}%</p>
                      )}
                    </div>
                  </Td>

                  {/* Actions */}
                  <Td>
                    <div className="flex gap-2">
                      {confirming === p.id ? (
                        <>
                          <button
                            onClick={() => handleDelete(p.id)}
                            style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "var(--radius)", cursor: "pointer" }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirming(null)}
                            style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", background: "none", border: "1px solid var(--color-border)", color: "var(--color-text-muted)", borderRadius: "var(--radius)", cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(p)}
                            style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)", borderRadius: "var(--radius)", cursor: "pointer" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirming(p.id)}
                            style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: "var(--radius)", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem", background: "none", border: "1px solid var(--color-border)", color: page === 1 ? "var(--color-text-muted)" : "var(--color-text)", borderRadius: "var(--radius)", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.5 : 1 }}
              >
                ← Prev
              </button>
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem", background: "none", border: "1px solid var(--color-border)", color: page === totalPages ? "var(--color-text-muted)" : "var(--color-text)", borderRadius: "var(--radius)", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.5 : 1 }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editTarget}
          onClose={() => setModalOpen(false)}
          onSuccess={() => { setModalOpen(false); refetch() }}
        />
      )}
    </div>
  )
}