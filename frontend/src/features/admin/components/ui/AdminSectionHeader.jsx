export default function AdminSectionHeader({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
      <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
        {title}
      </p>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
    </div>
  )
}