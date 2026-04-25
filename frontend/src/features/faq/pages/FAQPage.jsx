import { useState } from "react";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our products, add items to your cart, and proceed to checkout. You'll need an account to complete your purchase.",
  },
  {
    q: "Can I modify or cancel my order?",
    a: "Orders can be modified or cancelled within 24 hours of placement. Contact our support team as soon as possible.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and GCash for local transactions.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–7 business days. Express options are available at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the Philippines only. International shipping is coming soon.",
  },
  {
    q: "How do I track my order?",
    a: "Once shipped, you'll receive a tracking number via email. You can also track it under your account orders.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Support
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", fontSize: "1rem" }}>
          Can't find what you're looking for? Reach out to our support team.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{ padding: "1.1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.95rem" }}>{item.q}</span>
                <span style={{ color: "var(--color-primary)", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1 }}>
                  {open === i ? "−" : "+"}
                </span>
              </div>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.1rem", color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}