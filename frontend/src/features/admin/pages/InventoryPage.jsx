import { useState } from "react"
import { useAdminInventory } from "../hooks/useAdminInventory"
import { RetryComponent, EmptyComponent } from "../../../shared"
import { TableWrap, Th, Td } from "../components/ui/AdminTable"

export default function InventoryPage() {
  const [search, setSearch]   = useState("")
  const [lowOnly, setLowOnly] = useState(false)
  const [editing, setEditing] = useState(null)  // { productId, stock }
  const [saving, setSaving]   = useState(false)

  const { inventory, loading, error, refetch } = useAdminInventory({ search, low: lowOnly })

  const handleSave = async (productId, stock) => {
    setSaving(true)
    try {
      await fetch(`/api/admin/inventory/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: parseInt(stock) }),
      })
      setEditing(null)
      refetch()
    } catch {
      alert("Failed to update stock.")
    } finally {
      setSaving(false)
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
          Inventory
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Monitor stock levels and update quantities.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap items-center">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
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
          onClick={() => setLowOnly(v => !v)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            backgroundColor: lowOnly ? "#fef2f2" : "var(--color-surface)",
            color: lowOnly ? "#ef4444" : "var(--color-text-muted)",
            fontWeight: lowOnly ? 700 : 400,
            fontSize: "0.8rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {lowOnly ? "⚠ Low Stock Only" : "Show All"}
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
      ) : inventory.length === 0 ? (
        <EmptyComponent title="No products found" message="Try adjusting your search or filters." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>SKU</Th>
              <Th right>Sold</Th>
              <Th right>Stock</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((p, i) => {
              const stock = p.inventory?.stock ?? 0
              const sold  = p.inventory?.sold ?? 0
              const isLow = stock < 10
              const isOut = stock === 0
              const isEditing = editing?.productId === p.id

              return (
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

                  {/* Sold */}
                  <Td right muted>{sold}</Td>

                  {/* Stock */}
                  <Td right>
                    {isEditing ? (
                      <input
                        type="number"
                        min={0}
                        defaultValue={stock}
                        onChange={e => setEditing(v => ({ ...v, stock: e.target.value }))}
                        style={{
                          width: "70px",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          border: "1px solid var(--color-primary)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text)",
                          fontSize: "0.82rem",
                          fontFamily: "inherit",
                          outline: "none",
                          textAlign: "right",
                        }}
                      />
                    ) : (
                      <span style={{ color: isLow ? "#ef4444" : "var(--color-text)", fontWeight: isLow ? 700 : 400, fontSize: "0.82rem" }}>
                        {stock}
                      </span>
                    )}
                  </Td>

                  {/* Status badge */}
                  <Td>
                    {isOut ? (
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ef4444", backgroundColor: "#fef2f2", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                        Out of Stock
                      </span>
                    ) : isLow ? (
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#d97706", backgroundColor: "#fffbeb", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                        ⚠ Low Stock
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#10b981", backgroundColor: "#f0fdf4", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                        In Stock
                      </span>
                    )}
                  </Td>

                  {/* Action */}
                  <Td>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(p.id, editing.stock)}
                          disabled={saving}
                          style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "var(--radius)", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", background: "none", border: "1px solid var(--color-border)", color: "var(--color-text-muted)", borderRadius: "var(--radius)", cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditing({ productId: p.id, stock })}
                        style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)", borderRadius: "var(--radius)", cursor: "pointer" }}
                      >
                        Edit Stock
                      </button>
                    )}
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </TableWrap>
      )}
    </div>
  )
}