const STATUS_STYLES = {
  completed: { background: "rgba(16,185,129,0.12)",  color: "#10b981" },
  pending:   { background: "rgba(251,191,36,0.12)",  color: "#f59e0b" },
  paid:      { background: "rgba(59,130,246,0.12)",  color: "#3b82f6" },
  shipped:   { background: "rgba(139,92,246,0.12)",  color: "#8b5cf6" },
  failed:    { background: "rgba(239,68,68,0.12)",   color: "#ef4444" },
  refunded:  { background: "rgba(107,114,128,0.12)", color: "#6b7280" },
  cancelled: { background: "rgba(239,68,68,0.12)",   color: "#ef4444" },
}

export default function AdminStatusPill({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending
  return (
    <span style={{ ...style, padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, textTransform: "capitalize" }}>
      {status}
    </span>
  )
}