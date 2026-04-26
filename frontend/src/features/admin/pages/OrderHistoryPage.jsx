import { useState } from "react"
import { useAdminOrderHistory } from "../hooks/useAdminOrderHistory"
import { RetryComponent } from "../../../shared"
import AdminStatusPill from "../components/ui/AdminStatusPill"

const formatPHP = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val)

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })

export default function OrderHistoryPage() {
  const [search, setSearch]     = useState("")
  const [page, setPage]         = useState(1)
  const [expanded, setExpanded] = useState(null)

  const { history, totalPages, loading, error, refetch } = useAdminOrderHistory({ search, page })

  return (
    <div className="max-w-[1200px] mx-auto">

      {/* HEADER */}
      <header className="mb-8">
        <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase mb-2 text-[var(--color-text-muted)]">
          Sales
        </p>
        <h1 className="text-4xl font-extrabold mb-2 text-[var(--color-text)]">Order History</h1>
        <p className="text-[var(--color-text-muted)]">
          Full record of all completed and cancelled orders.
        </p>
      </header>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search by customer name or order ID..."
          style={{
            width: "100%",
            maxWidth: "400px",
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
                  {["Order ID", "Customer", "Email", "Items", "Total", "Payment", "Status", "Date", ""].map(h => (
                    <th key={h} style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                      No order history found.
                    </td>
                  </tr>
                ) : history.map((order, i) => (
                  <>
                    <tr
                      key={order.id}
                      style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)", borderBottom: expanded === order.id ? "none" : "1px solid var(--color-border)", cursor: "pointer" }}
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    >
                      <td style={{ padding: "0.65rem 1rem", fontFamily: "monospace", color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "var(--color-text)", fontWeight: 600, fontSize: "0.85rem" }}>
                        {order.customer?.name ?? order.shipping_name}
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
                        {order.customer?.email ?? "—"}
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                        {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>
                        {formatPHP(order.total_amount)}
                      </td>
                      <td style={{ padding: "0.65rem 1rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                          {order.payment?.method ?? order.payment_method ?? "—"}
                        </span>
                      </td>
                      <td style={{ padding: "0.65rem 1rem" }}>
                        <AdminStatusPill status={order.status} />
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                        {formatDate(order.created_at)}
                      </td>
                      <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
                        {expanded === order.id ? "▲" : "▼"}
                      </td>
                    </tr>

                    {/* EXPANDED ROW — order items */}
                    {expanded === order.id && (
                      <tr key={`${order.id}-expand`} style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                        <td colSpan={9} style={{ padding: "0 1rem 1rem 1rem" }}>
                          <div style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius)",
                            overflow: "hidden",
                          }}>
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                                  {["Product", "Price", "Qty", "Subtotal"].map(h => (
                                    <th key={h} style={{ padding: "0.5rem 0.875rem", color: "var(--color-text-muted)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" }}>
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {(order.items ?? []).map((item, j) => (
                                  <tr key={j} style={{ borderBottom: j < order.items.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                                    <td style={{ padding: "0.5rem 0.875rem", color: "var(--color-text)", fontSize: "0.82rem", fontWeight: 500 }}>{item.product_name}</td>
                                    <td style={{ padding: "0.5rem 0.875rem", color: "var(--color-text-muted)", fontSize: "0.82rem" }}>{formatPHP(item.product_price)}</td>
                                    <td style={{ padding: "0.5rem 0.875rem", color: "var(--color-text-muted)", fontSize: "0.82rem" }}>×{item.quantity}</td>
                                    <td style={{ padding: "0.5rem 0.875rem", color: "#10b981", fontWeight: 700, fontSize: "0.82rem" }}>{formatPHP(item.subtotal)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Shipping snapshot */}
                          <div style={{ marginTop: "0.75rem", display: "flex", gap: "2rem", paddingLeft: "0.25rem" }}>
                            <div>
                              <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Shipped To</p>
                              <p style={{ fontSize: "0.82rem", color: "var(--color-text)", marginTop: "0.2rem" }}>{order.shipping_name}</p>
                              <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{order.shipping_address}</p>
                              <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{order.shipping_phone}</p>
                            </div>
                            {order.payment && (
                              <div>
                                <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Payment</p>
                                <p style={{ fontSize: "0.82rem", color: "var(--color-text)", marginTop: "0.2rem", textTransform: "uppercase" }}>{order.payment.method}</p>
                                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{order.payment.transaction_ref ?? "No ref"}</p>
                                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                                  {order.payment.paid_at ? `Paid ${formatDate(order.payment.paid_at)}` : "Unpaid"}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
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