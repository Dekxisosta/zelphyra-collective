import { useAdminStats }      from "../hooks/useAdminStats"
import AdminKpiCard           from "../components/ui/AdminKpiCard"
import RecentOrdersTable      from "../sections/dashboard/RecentOrdersTable"
import TopProductsTable       from "../sections/dashboard/TopProductsTable"
import PaymentBreakdown       from "../sections/dashboard/PaymentBreakdown"
import { RetryComponent }     from "../../../shared"

const currency = (n) => `₱${Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`

export default function DashboardPage() {
  const { stats, loading, error, refetch } = useAdminStats()

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Overview</p>
        <div style={{ height: "2rem", width: "12rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", animation: "pulse 1.5s infinite" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ height: "100px", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", animation: "pulse 1.5s infinite" }} />
        ))}
      </div>
    </div>
  )

  if (error) return (
    <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* TITLE */}
      <div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Overview
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "1.75rem", fontWeight: 800 }}>
          Dashboard
        </h1>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        <AdminKpiCard
          label="Total Revenue"
          value={currency(stats.totalRevenue)}
          sub="From completed payments"
          color="var(--color-primary)"
        />
        <AdminKpiCard
          label="Total Orders"
          value={stats.totalOrders}
          sub="All time"
          color="var(--color-text)"
        />
        <AdminKpiCard
          label="Customers"
          value={stats.totalCustomers}
          sub="Registered users"
          color="#3b82f6"
        />
        <AdminKpiCard
          label="Pending Orders"
          value={stats.pendingOrders}
          sub="Awaiting fulfillment"
          color="#f59e0b"
        />
      </div>

      {/* RECENT ORDERS */}
      <RecentOrdersTable orders={stats.recentOrders} />

      {/* BOTTOM GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <TopProductsTable  products={stats.topProducts} />
        <PaymentBreakdown  breakdown={stats.paymentBreakdown} />
      </div>

    </div>
  )
}