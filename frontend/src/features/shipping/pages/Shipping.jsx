const shippingOptions = [
  {
    name: "Standard Shipping",
    duration: "3–7 Business Days",
    price: "₱99",
    note: "Free on orders over ₱1,500",
  },
  {
    name: "Express Shipping",
    duration: "1–3 Business Days",
    price: "₱199",
    note: "Available in Metro Manila only",
  },
  {
    name: "Same-Day Delivery",
    duration: "Within the day",
    price: "₱299",
    note: "Order before 11AM, Metro Manila only",
  },
];

const policies = [
  {
    title: "Processing Time",
    body: "All orders are processed within 1–2 business days. Orders placed on weekends or holidays are processed the next business day.",
  },
  {
    title: "Shipping Coverage",
    body: "We currently ship within the Philippines only. Delivery times may vary depending on your location and courier availability.",
  },
  {
    title: "Tracking",
    body: "Once your order ships, you'll receive a tracking number via email. Use it on our Track Order page or the courier's website.",
  },
  {
    title: "Failed Deliveries",
    body: "If a delivery attempt fails, the courier will retry up to 2 times. After that, the package is returned to our warehouse.",
  },
];

export default function Shipping() {
  return (
    <div style={{minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Delivery
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Shipping Information
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem" }}>
          We partner with trusted local couriers to get your order to you as fast as possible.
        </p>

        {/* Shipping Options */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Shipping Options
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
          {shippingOptions.map((opt, i) => (
            <div key={i} style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}>
              <div>
                <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.95rem" }}>{opt.name}</p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{opt.duration} · {opt.note}</p>
              </div>
              <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "1rem" }}>{opt.price}</span>
            </div>
          ))}
        </div>

        {/* Policies */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Policies
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {policies.map((p, i) => (
            <div key={i}>
              <p style={{ color: "var(--color-text)", fontWeight: 700, marginBottom: "0.3rem" }}>{p.title}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}