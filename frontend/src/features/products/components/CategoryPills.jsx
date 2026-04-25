export default function CategoryPills({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={
            active === c
              ? {
                  background: "var(--color-primary)",
                  color: "#fff",
                  border: "1px solid var(--color-primary)",
                  borderRadius: "999px",
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                }
              : {
                  background: "var(--color-surface)",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "999px",
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                }
          }
        >
          {c}
        </button>
      ))}
    </div>
  );
}