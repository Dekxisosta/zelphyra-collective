export default function Chip({ label, onClear }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "999px",
        padding: "0.25rem 0.75rem",
        fontSize: "0.8125rem",
        color: "var(--color-text-muted)",
      }}
    >
      <span>{label}</span>
      <button
        onClick={onClear}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: "0.75rem",
          color: "var(--color-text-muted)",
          cursor: "pointer",
          borderRadius: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}