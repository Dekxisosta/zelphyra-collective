export default function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        backgroundColor: "var(--color-bg)",
        backgroundImage: `
          radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)
        `,
        backgroundSize: "40px 40px",
        opacity: 0.4,
        transform: "rotate(-12deg) scale(1.4)",
        animation: "bgDrift 20s ease-in-out infinite alternate",
      }}
    />
  );
}