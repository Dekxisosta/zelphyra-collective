export default function Pagination({ totalPages, currentPage, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 pt-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          style={
            currentPage === i + 1
              ? {
                  background: "var(--color-primary)",
                  color: "#fff",
                  border: "1px solid var(--color-primary)",
                  borderRadius: "var(--radius)",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                }
              : {
                  background: "transparent",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                }
          }
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}