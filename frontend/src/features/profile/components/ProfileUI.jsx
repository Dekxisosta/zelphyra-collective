export const inputStyle = {
  padding: "0.45rem 0.8rem",
  borderRadius: "var(--radius)",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-bg)",
  color: "var(--color-text)",
  fontSize: "0.875rem",
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
}

export const selectStyle = { ...inputStyle, cursor: "pointer" }

export function Field({ label, name, value, onChange, type = "text", disabled = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 600 }}>
        {label}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} disabled={disabled} style={{ ...inputStyle, ...(disabled && { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" }) }} />
    </div>
  )
}

export function SaveButton({ status, onClick, label = "Save Changes" }) {
  return (
    <button
      onClick={onClick}
      disabled={status === "saving"}
      style={{
        padding: "0.45rem 1.1rem",
        fontSize: "0.8rem",
        fontWeight: 600,
        backgroundColor: "var(--color-primary)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius)",
        cursor: status === "saving" ? "not-allowed" : "pointer",
        opacity: status === "saving" ? 0.7 : 1,
      }}
    >
      {status === "saving" ? "Saving…" : label}
    </button>
  )
}

export function Section({ title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          {title}
        </p>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
      </div>
      {children}
    </div>
  )
}