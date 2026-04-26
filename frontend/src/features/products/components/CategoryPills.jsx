export default function CategoryPills({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const label = c === "all" ? "All" : c.name
        const value = c === "all" ? "all" : c.slug
        const isActive = active === value

        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            style={
              isActive
                ? {
                    background: "var(--color-primary)",
                    color: "#fff",
                    border: "1px solid var(--color-primary)",
                    borderRadius: "999px",
                    padding: "0.375rem 1rem",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                  }
                : {
                    background: "var(--color-surface)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "999px",
                    padding: "0.375rem 1rem",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                  }
            }
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}