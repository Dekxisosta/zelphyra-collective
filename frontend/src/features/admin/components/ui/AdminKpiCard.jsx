export default function AdminKpiCard({ label, value, sub, color = "var(--color-primary)" }) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius)",
      padding: "1.25rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    }}>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </p>
      <p style={{ color, fontSize: "1.75rem", fontWeight: 800, lineHeight: 1.1 }}>
        {value}
      </p>
      {sub && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>{sub}</p>
      )}
    </div>
  )
}