import { useState } from "react"
import { useAdminPayments } from "../hooks/useAdminPayments"
import { RetryComponent, EmptyComponent } from "../../../shared"
import { TableWrap, Th, Td } from "../components/ui/AdminTable"

const currency = (n) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n)

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })

const STATUS_STYLES = {
  completed: { background: "#d1fae5", color: "#065f46" },
  pending:   { background: "#fef3c7", color: "#92400e" },
  failed:    { background: "#fee2e2", color: "#991b1b" },
  refunded:  { background: "#ede9fe", color: "#5b21b6" },
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? { background: "var(--color-surface)", color: "var(--color-text-muted)" }
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "0.15rem 0.5rem",
      borderRadius: "999px",
      fontSize: "0.7rem",
      fontWeight: 700,
      textTransform: "capitalize",
      ...style,
    }}>
      {status}
    </span>
  )
}

const STATUSES = ["", "completed", "pending", "failed", "refunded"]
const METHODS  = ["", "gcash", "maya", "cod", "card"]

const selectStyle = {
  padding: "0.5rem 0.875rem",
  borderRadius: "var(--radius)",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: "0.875rem",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer",
}

export default function PaymentsPage() {
  const [status, setStatus] = useState("")
  const [method, setMethod] = useState("")
  const [page,   setPage]   = useState(1)

  const { payments, totalPages, loading, error, refetch } = useAdminPayments({ status, method, page })

  const handleStatusChange = (e) => { setStatus(e.target.value); setPage(1) }
  const handleMethodChange = (e) => { setMethod(e.target.value); setPage(1) }

  const totalCollected = payments.filter(p => p.status === "completed").reduce((s, p) => s + Number(p.amount), 0)
  const totalPending   = payments.filter(p => p.status === "pending").reduce((s, p) => s + Number(p.amount), 0)
  const totalRefunded  = payments.filter(p => p.status === "refunded").reduce((s, p) => s + Number(p.amount), 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* HEADER */}
      <div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Finance
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2rem", fontWeight: 800 }}>Payments</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Track transactions, methods, and payment statuses.
        </p>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total Collected", value: currency(totalCollected), color: "var(--color-primary)" },
          { label: "Transactions",    value: payments.length,          color: "var(--color-text)"    },
          { label: "Pending",         value: currency(totalPending),   color: "var(--color-accent)"  },
          { label: "Refunded",        value: currency(totalRefunded),  color: "#7c3aed"              },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "var(--color-surface)", borderRadius: "var(--radius)", padding: "1rem" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "6px" }}>{label}</p>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <select value={status} onChange={handleStatusChange} style={selectStyle}>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : "All Statuses"}</option>
          ))}
        </select>
        <select value={method} onChange={handleMethodChange} style={selectStyle}>
          {METHODS.map(m => (
            <option key={m} value={m}>{m ? m.toUpperCase() : "All Methods"}</option>
          ))}
        </select>
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
      ) : payments.length === 0 ? (
        <EmptyComponent title="No payments found" message="Try adjusting your filters." />
      ) : (
        <>
          <TableWrap>
            <thead>
              <tr>
                <Th>Transaction Ref</Th>
                <Th>Customer</Th>
                <Th>Method</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th right>Amount</Th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
                >
                  <Td muted>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                      {p.transaction_ref ?? "Not applicable"}
                    </span>
                  </Td>
                  <Td>
                    <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.82rem" }}>
                      {p.customerName ?? "—"}
                    </p>
                  </Td>
                  <Td muted>
                    <span style={{ textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                      {p.method}
                    </span>
                  </Td>
                  <Td>
                    <StatusBadge status={p.status} />
                  </Td>
                  <Td muted>
                    <span style={{ fontSize: "0.78rem" }}>
                      {formatDate(p.paid_at ?? p.created_at)}
                    </span>
                  </Td>
                  <Td right>
                    <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.82rem" }}>
                      {currency(p.amount)}
                    </span>
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

    </div>
  )
}