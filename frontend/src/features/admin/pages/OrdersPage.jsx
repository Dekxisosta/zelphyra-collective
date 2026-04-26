import { useState } from "react"
import { useAdminOrders } from "../hooks/useAdminOrders"
import { RetryComponent } from "../../../shared"
import AdminStatusPill from "../components/ui/AdminStatusPill"

const formatPHP = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val)

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })

const ACTIVE_STATUSES = ["pending", "paid", "shipped"]

const STATUS_TRANSITIONS = {
  pending:  ["paid", "cancelled"],
  paid:     ["shipped", "cancelled"],
  shipped:  ["completed"],
}

export default function OrdersPage() {
  const [status, setStatus]       = useState("")
  const [search, setSearch]       = useState("")
  const [page, setPage]           = useState(1)
  const [updating, setUpdating]   = useState(null)

  const { orders, totalPages, loading, error, refetch, updateOrderStatus } = useAdminOrders({ status, search, page })


  return (
    <div className="max-w-[1200px] mx-auto">

      {/* HEADER */}
      <header className="mb-8">
        <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase mb-2 text-[var(--color-text-muted)]">
          Sales
        </p>
        <h1 className="text-4xl font-extrabold mb-2 text-[var(--color-text)]">Orders</h1>
        <p className="text-[var(--color-text-muted)]">
          Manage active orders — pending, paid, and in transit.
        </p>
      </header>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search by name or order ID..."
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
        <div className="flex gap-2">
          {["", ...ACTIVE_STATUSES].map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStatus(s); setPage(1) }}
              style={{
                padding: "0.45rem 0.875rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--color-border)",
                background: status === s ? "var(--color-primary)" : "var(--color-surface)",
                color: status === s ? "#fff" : "var(--color-text-muted)",
                fontSize: "0.8rem",
                fontWeight: status === s ? 600 : 400,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {s || "All Active"}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ height: "52px", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", opacity: 0.6 }} />
          ))}
        </div>
      ) : error ? (
        <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                  {["Order ID", "Customer", "Items", "Total", "Method", "Status", "Date", "Action"].map(h => (
                    <th key={h} style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                      No active orders found.
                    </td>
                  </tr>
                ) : orders.map((order, i) => (
                  <tr key={order.id} style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.65rem 1rem", fontFamily: "monospace", color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
                      #{order.id}
                    </td>
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.85rem" }}>{order.shipping_name}</p>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>{order.shipping_phone}</p>
                    </td>
                    <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                    </td>
                    <td style={{ padding: "0.65rem 1rem", color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>
                      {formatPHP(order.total_amount)}
                    </td>
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                        {order.payment_method ?? order.payment?.method ?? "—"}
                      </span>
                    </td>
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <AdminStatusPill status={order.status} />
                    </td>
                    <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                      {formatDate(order.created_at)}
                    </td>
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <div className="flex gap-1 flex-wrap">
                        {(STATUS_TRANSITIONS[order.status] ?? []).map(next => (
                          <button
                            key={next}
                            disabled={updating === order.id}
                            onClick={() => updateOrderStatus(order.id, next)}
                            style={{
                              padding: "0.25rem 0.6rem",
                              borderRadius: "6px",
                              border: "1px solid var(--color-border)",
                              background: next === "cancelled" ? "#fee2e2" : "var(--color-primary)",
                              color: next === "cancelled" ? "#991b1b" : "#fff",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              cursor: updating === order.id ? "not-allowed" : "pointer",
                              opacity: updating === order.id ? 0.6 : 1,
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                            }}
                          >
                            → {next}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    width: "32px", height: "32px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--color-border)",
                    background: page === i + 1 ? "var(--color-primary)" : "var(--color-surface)",
                    color: page === i + 1 ? "#fff" : "var(--color-text-muted)",
                    fontSize: "0.8rem",
                    fontWeight: page === i + 1 ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}