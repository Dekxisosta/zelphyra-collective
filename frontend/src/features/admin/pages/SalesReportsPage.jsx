import { useMemo } from "react"
import { useAdminReports } from "../hooks/useAdminReports"
import { SalesBarChart } from "../components"
import { RetryComponent } from "../../../shared"
import AdminStatusPill from "../components/ui/AdminStatusPill"

const formatPHP = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val)

function MetricCard({ label, value, valueClass = "text-[var(--color-text)]", sub }) {
  return (
    <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col gap-1">
      <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
      <p className={`text-2xl font-black ${valueClass}`}>{value}</p>
      {sub && <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>}
    </div>
  )
}

export default function SalesReportsPage() {
  const { reports, loading, error, refetch } = useAdminReports()

  const metrics = useMemo(() => {
    if (!reports) return null
    const avgOrderValue = reports.totalRevenue / (reports.totalOrders || 1)
    const completionRate = reports.ordersByStatus
      ? Math.round(
          ((reports.ordersByStatus.find(s => s.status === "completed")?.count ?? 0) /
            (reports.totalOrders || 1)) * 100
        )
      : 0
    return { avgOrderValue, completionRate }
  }, [reports])

  // Convert revenueByMonth object to chart-friendly array
  const monthlyChartData = useMemo(() => {
    if (!reports?.revenueByMonth) return []
    return Object.entries(reports.revenueByMonth).map(([date, sold]) => ({ date, sold }))
  }, [reports])

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ height: "4rem", width: "16rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", opacity: 0.6 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ height: "100px", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }} />
        ))}
      </div>
    </div>
  )

  if (error) return <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />

  return (
    <div className="max-w-[1200px] mx-auto">

      {/* HEADER */}
      <header className="mb-12">
        <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase mb-2 text-[var(--color-text-muted)]">
          Sales
        </p>
        <h1 className="text-4xl font-extrabold mb-2 text-[var(--color-text)]">
          Sales Reports
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Analyze revenue, trends, and performance metrics.
        </p>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard
          label="Total Revenue"
          value={formatPHP(reports.totalRevenue)}
          valueClass="text-emerald-500"
        />
        <MetricCard
          label="Avg. Order Value"
          value={formatPHP(metrics.avgOrderValue)}
        />
        <MetricCard
          label="Total Orders"
          value={reports.totalOrders}
        />
        <MetricCard
          label="Completion Rate"
          value={`${metrics.completionRate}%`}
          sub={`${reports.totalCustomers} total customers`}
        />
      </div>

      {/* MONTHLY REVENUE CHART */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-text)]">Monthly Revenue</h2>
        <SalesBarChart data={monthlyChartData} />
      </section>

      {/* REVENUE BY METHOD */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-text)]">Revenue by Payment Method</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reports.revenueByMethod.map(m => (
            <div
              key={m.method}
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "1rem 1.25rem",
              }}
            >
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {m.method}
              </p>
              <p style={{ color: "var(--color-text)", fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem" }}>
                {formatPHP(m.total)}
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", marginTop: "0.15rem" }}>
                {m.count} transaction{m.count !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-text)]">Top Products by Sales</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                {["#", "Product", "SKU", "Sold", "Stock", "Revenue"].map(h => (
                  <th key={h} style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.topProducts.map((p, i) => (
                <tr key={p.id} style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.75rem" }}>#{i + 1}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--color-text)", fontWeight: 600, fontSize: "0.85rem" }}>{p.name}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--color-text-muted)", fontSize: "0.78rem", fontFamily: "monospace" }}>{p.sku}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--color-text)", fontSize: "0.85rem" }}>{p.inventory?.sold ?? 0}</td>
                  <td style={{ padding: "0.65rem 1rem", fontSize: "0.85rem" }}>
                    <span style={{ color: (p.inventory?.stock ?? 0) < 10 ? "#ef4444" : "var(--color-text)", fontWeight: (p.inventory?.stock ?? 0) < 10 ? 700 : 400 }}>
                      {p.inventory?.stock ?? 0}
                      {(p.inventory?.stock ?? 0) < 10 && " ⚠"}
                    </span>
                  </td>
                  <td style={{ padding: "0.65rem 1rem", color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>
                    {formatPHP((p.inventory?.sold ?? 0) * p.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}