export function TableWrap({ children }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
        {children}
      </table>
    </div>
  )
}

export function Th({ children, right }) {
  return (
    <th style={{
      padding: "0.65rem 1rem",
      textAlign: right ? "right" : "left",
      color: "var(--color-text-muted)",
      fontWeight: 700,
      fontSize: "0.7rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      backgroundColor: "var(--color-surface)",
      borderBottom: "1px solid var(--color-border)",
      whiteSpace: "nowrap",
    }}>
      {children}
    </th>
  )
}

export function Td({ children, right, muted }) {
  return (
    <td style={{
      padding: "0.65rem 1rem",
      textAlign: right ? "right" : "left",
      color: muted ? "var(--color-text-muted)" : "var(--color-text)",
      borderBottom: "1px solid var(--color-border)",
      whiteSpace: "nowrap",
    }}>
      {children}
    </td>
  )
}