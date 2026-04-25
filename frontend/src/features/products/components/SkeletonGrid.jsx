export default function SkeletonGrid() {
  return (
    <div className="container py-6 grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card" style={{ padding: "0.75rem" }}>
          <div
            style={{
              height: "10rem",
              borderRadius: "var(--radius)",
              background: "var(--color-border)",
              marginBottom: "0.75rem",
            }}
          />
          <div
            style={{
              height: "0.875rem",
              width: "66%",
              borderRadius: "999px",
              background: "var(--color-border)",
              marginBottom: "0.5rem",
            }}
          />
          <div
            style={{
              height: "0.875rem",
              width: "40%",
              borderRadius: "999px",
              background: "var(--color-border)",
            }}
          />
        </div>
      ))}
    </div>
  );
}