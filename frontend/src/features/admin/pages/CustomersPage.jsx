import { useState } from "react"
import { useAdminCustomers } from "../hooks/useAdminCustomers"
import { useAdminOrderHistory } from "../hooks/useAdminOrderHistory"
import { useAdminCarts } from "../hooks/useAdminCarts"
import { RetryComponent, EmptyComponent } from "../../../shared"
import { TableWrap, Th, Td } from "../components/ui/AdminTable"

const formatPHP = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val)

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })

// ─── Drawer shell ────────────────────────────────────────────────────────────
function Drawer({ title, onClose, children }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}
      onClick={onClose}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
      <div
        style={{
          position: "relative", zIndex: 10,
          width: "480px", height: "100%",
          backgroundColor: "var(--color-surface)",
          borderLeft: "1px solid var(--color-border)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem" }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "1.1rem" }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Order history drawer ─────────────────────────────────────────────────────
function CustomerOrderDrawer({ userId, onClose }) {
  const { history, loading } = useAdminOrderHistory({ user_id: userId })

  return (
    <Drawer title="Order History" onClose={onClose}>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ height: "60px", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", opacity: 0.6 }} />
        ))
      ) : history.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", textAlign: "center", padding: "2rem 0" }}>No orders found.</p>
      ) : history.map(order => (
        <div
          key={order.id}
          style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "0.875rem 1rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>#{order.id}</span>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, textTransform: "capitalize",
              padding: "0.15rem 0.5rem", borderRadius: "999px",
              backgroundColor: order.status === "completed" ? "#f0fdf4" : order.status === "cancelled" ? "#fef2f2" : "#eff6ff",
              color: order.status === "completed" ? "#16a34a" : order.status === "cancelled" ? "#dc2626" : "#2563eb",
            }}>
              {order.status}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>
              {formatPHP(order.total_amount)}
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
              {formatDate(order.created_at)}
            </p>
          </div>
          {order.items?.length > 0 && (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", marginTop: "0.25rem" }}>
              {order.items.map(i => i.product_name).join(", ")}
            </p>
          )}
        </div>
      ))}
    </Drawer>
  )
}

// ─── Cart drawer ──────────────────────────────────────────────────────────────
function CustomerCartDrawer({ userId, onClose }) {
  const { cart, loading } = useAdminCarts({ user_id: userId })

  const cartTotal = cart?.items?.reduce((sum, item) =>
    sum + (item.product?.price ?? 0) * item.quantity, 0
  ) ?? 0


  return (
    <Drawer title="Active Cart" onClose={onClose}>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ height: "60px", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", opacity: 0.6 }} />
        ))
      ) : !cart || cart.items?.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", textAlign: "center", padding: "2rem 0" }}>
          No active cart for this customer.
        </p>
      ) : (
        <>
          {cart.items.map(item => (
            <div
              key={item.id}
              style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "0.875rem 1rem", display: "flex", gap: "0.875rem", alignItems: "center" }}
            >
              {/* Product image */}
              {item.product?.images?.[0]?.url ? (
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "calc(var(--radius) - 2px)", flexShrink: 0, border: "1px solid var(--color-border)" }}
                />
              ) : (
                <div style={{ width: "48px", height: "48px", borderRadius: "calc(var(--radius) - 2px)", backgroundColor: "var(--color-border)", flexShrink: 0 }} />
              )}

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.product?.name ?? "Unknown product"}
                </p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", marginTop: "0.15rem" }}>
                  Qty: {item.quantity} · Added {formatDate(item.added_at)}
                </p>
              </div>

              {/* Price */}
              <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.82rem", flexShrink: 0 }}>
                {item.product?.price != null
                  ? formatPHP(item.product.price * item.quantity)
                  : "—"}
              </p>
            </div>
          ))}

          {/* Cart total */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Cart Total
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-primary)" }}>
              {formatPHP(cartTotal)}
            </p>
          </div>
          <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "-0.25rem" }}>
            Last updated {formatDate(cart.updated_at)}
          </p>
        </>
      )}
    </Drawer>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CustomersPage() {
  const [search, setSearch]         = useState("")
  const [page, setPage]             = useState(1)
  const [viewingOrders, setViewingOrders] = useState(null)
  const [viewingCart, setViewingCart]     = useState(null)

  const { customers, totalPages, loading, error, refetch } = useAdminCustomers({ search, page })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* HEADER */}
      <div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Customers
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2rem", fontWeight: 800 }}>Customers</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          View registered users, their order count, and total spend.
        </p>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1) }}
        placeholder="Search by name or email..."
        style={{
          maxWidth: "360px",
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

      {/* STATES */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: "52px", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", opacity: 0.6 }} />
          ))}
        </div>
      ) : error ? (
        <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
      ) : customers.length === 0 ? (
        <EmptyComponent title="No customers found" message="Try adjusting your search." />
      ) : (
        <>
          <TableWrap>
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Email</Th>
                <Th right>Orders</Th>
                <Th right>Total Spent</Th>
                <Th>Joined</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr
                  key={c.id}
                  style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
                >
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      {c.avatarUrl ? (
                          <img src={c.avatarUrl} alt={c.name}
                            style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      ) : (
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          backgroundColor: "var(--color-border)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 700, color: "var(--color-text-muted)",
                          flexShrink: 0,
                          }}>
                        {c.name?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                      )}
                      <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>
                        {c.name ?? "—"}
                      </p>
                    </div>
                  </Td>
                  <Td muted>
                    <span style={{ fontSize: "0.78rem" }}>{c.email}</span>
                  </Td>
                  <Td right>
                    <span style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>
                      {c.orderCount}
                    </span>
                  </Td>
                  <Td right>
                    <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.82rem" }}>
                      {formatPHP(c.totalSpent)}
                    </span>
                  </Td>
                  <Td muted>
                    <span style={{ fontSize: "0.78rem" }}>{formatDate(c.created_at)}</span>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => { setViewingOrders(c.id); setViewingCart(null) }}
                        style={{
                          padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600,
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                          borderRadius: "var(--radius)", cursor: "pointer",
                        }}
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => { setViewingCart(c.id); setViewingOrders(null) }}
                        style={{
                          padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 600,
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text)",
                          borderRadius: "var(--radius)", cursor: "pointer",
                        }}
                      >
                        Cart
                      </button>
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

      {/* DRAWERS — only one open at a time */}
      {viewingOrders && (
        <CustomerOrderDrawer
          userId={viewingOrders}
          onClose={() => setViewingOrders(null)}
        />
      )}
      {viewingCart && (
        <CustomerCartDrawer
          userId={viewingCart}
          onClose={() => setViewingCart(null)}
        />
      )}
    </div>
  )
}