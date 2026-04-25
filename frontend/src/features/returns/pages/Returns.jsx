const returnReasons = [
  {
    reason: "Damaged or Defective Item",
    eligible: true,
    note: "Item arrived broken, scratched, or non-functional.",
  },
  {
    reason: "Wrong Item Received",
    eligible: true,
    note: "The item delivered does not match your order.",
  },
  {
    reason: "Item Not as Described",
    eligible: true,
    note: "Significant difference from the product listing.",
  },
  {
    reason: "Change of Mind",
    eligible: false,
    note: "We do not accept returns for buyer's remorse.",
  },
  {
    reason: "Used or Opened Items",
    eligible: false,
    note: "Items that have been used or unsealed are not returnable.",
  },
];

const steps = [
  {
    step: "01",
    title: "Submit a Request",
    body: "Email us at returns@zenlesscollective.ph within 7 days of receiving your order. Include your order number and photos of the item.",
  },
  {
    step: "02",
    title: "Wait for Approval",
    body: "Our team will review your request within 2–3 business days and notify you via email whether it has been approved.",
  },
  {
    step: "03",
    title: "Ship the Item Back",
    body: "Once approved, pack the item securely in its original packaging and drop it off at any accredited courier. We'll shoulder the return shipping for eligible cases.",
  },
  {
    step: "04",
    title: "Refund or Replacement",
    body: "Upon receiving and inspecting the item, we'll process your refund or send a replacement within 5–7 business days.",
  },
];

const policies = [
  {
    title: "Return Window",
    body: "Returns must be requested within 7 days of the delivery date. Requests made after this window will not be accepted regardless of reason.",
  },
  {
    title: "Item Condition",
    body: "Returned items must be in their original condition — unused, unaltered, and in original packaging with all accessories and tags intact.",
  },
  {
    title: "Refund Method",
    body: "Approved refunds are issued to your original payment method. GCash and bank transfers are processed within 5–7 business days. COD orders are refunded via GCash.",
  },
  {
    title: "Non-Returnable Items",
    body: "Sealed collectibles, digital products, and items marked as Final Sale are strictly non-returnable and non-refundable.",
  },
  {
    title: "Exchanges",
    body: "We do not process direct exchanges. If you need a different item, return the original and place a new order once the refund is processed.",
  },
];

export default function Returns() {
  return (
    <div style={{minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          After Your Order
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Returns & Refunds
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem" }}>
          Not satisfied with your order? We'll make it right. Read through our return policy below before submitting a request.
        </p>

        {/* Eligibility */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Return Eligibility
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
          {returnReasons.map((item, i) => (
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
                <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.95rem" }}>{item.reason}</p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{item.note}</p>
              </div>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                backgroundColor: item.eligible ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                color: item.eligible ? "#10b981" : "#ef4444",
              }}>
                {item.eligible ? "Eligible" : "Not Eligible"}
              </span>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          How It Works
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <span style={{
                color: "var(--color-primary)",
                fontWeight: 800,
                fontSize: "1.5rem",
                lineHeight: 1,
                minWidth: "2.5rem",
              }}>
                {s.step}
              </span>
              <div>
                <p style={{ color: "var(--color-text)", fontWeight: 700, marginBottom: "0.3rem" }}>{s.title}</p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.body}</p>
              </div>
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