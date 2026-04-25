const contactMethods = [
  {
    name: "Email Support",
    value: "support@zenlesscollective.com",
    note: "We reply within 1–2 business days",
  },
  {
    name: "Live Chat",
    value: "Available on-site",
    note: "Mon–Fri, 9AM–6PM PHT",
  },
  {
    name: "Facebook Page",
    value: "@ZenlessCollective",
    note: "DMs answered during business hours",
  },
];

const faqs = [
  {
    title: "Where is my order?",
    body: "Once your order ships, you'll receive a tracking number via email. You can use it on our Track Order page or the courier's website to check your delivery status.",
  },
  {
    title: "Can I change or cancel my order?",
    body: "Orders can be modified or cancelled within 24 hours of placement. After that, the order may already be processed for shipping and can no longer be changed.",
  },
  {
    title: "My item arrived damaged. What do I do?",
    body: "We're sorry to hear that. Please reach out within 7 days of delivery with a photo of the damaged item and your order number. We'll make it right.",
  },
  {
    title: "Do you ship outside the Philippines?",
    body: "Not at the moment. We currently ship within the Philippines only. International shipping is something we're exploring for the future.",
  },
];

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Support
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Contact Us
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem" }}>
          Have a question or need help with your order? We're here for you. Reach out through any of the channels below.
        </p>

        {/* Contact Methods */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Get in Touch
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
          {contactMethods.map((method, i) => (
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
                <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.95rem" }}>{method.name}</p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{method.note}</p>
              </div>
              <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "1rem" }}>{method.value}</span>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Send a Message
        </h2>
        <div style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
          marginBottom: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ color: "var(--color-text)", fontSize: "0.8rem", fontWeight: 600 }}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  padding: "0.6rem 0.85rem",
                  color: "var(--color-text)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ color: "var(--color-text)", fontSize: "0.8rem", fontWeight: 600 }}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  padding: "0.6rem 0.85rem",
                  color: "var(--color-text)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ color: "var(--color-text)", fontSize: "0.8rem", fontWeight: 600 }}>Subject</label>
            <input
              type="text"
              placeholder="What's this about?"
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "0.6rem 0.85rem",
                color: "var(--color-text)",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ color: "var(--color-text)", fontSize: "0.8rem", fontWeight: 600 }}>Message</label>
            <textarea
              rows={5}
              placeholder="Tell us how we can help..."
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "0.6rem 0.85rem",
                color: "var(--color-text)",
                fontSize: "0.875rem",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.875rem",
            padding: "0.7rem 1.5rem",
            borderRadius: "var(--radius)",
            border: "none",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}>
            Send Message
          </button>
        </div>

        {/* FAQs */}
        <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Frequently Asked
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <p style={{ color: "var(--color-text)", fontWeight: 700, marginBottom: "0.3rem" }}>{faq.title}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{faq.body}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}