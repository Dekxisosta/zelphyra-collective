const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, shipping address, and payment details when you create an account or place an order. We also collect usage data like pages visited and interactions with the site.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, send shipping updates, respond to support inquiries, and improve our services. We do not sell your personal data to third parties.",
  },
  {
    title: "Cookies",
    body: "We use cookies to remember your preferences, keep you logged in, and analyze site traffic. You can disable cookies in your browser settings, though some features may not work as expected.",
  },
  {
    title: "Data Sharing",
    body: "We share data only with trusted partners required to operate our services — such as payment processors and delivery couriers — and only to the extent necessary to fulfill your orders.",
  },
  {
    title: "Data Retention",
    body: "We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data. To make a request, contact us at privacy@zelphyra.com. We will respond within 30 days.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes means you accept the updated policy.",
  },
];

export default function DataPolicy() {
  return (
    <div style={{minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Legal
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "3rem" }}>
          Effective date: April 25, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ borderLeft: "3px solid var(--color-primary)", paddingLeft: "1.25rem" }}>
              <p style={{ color: "var(--color-text)", fontWeight: 700, marginBottom: "0.4rem", fontSize: "1rem" }}>{s.title}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}