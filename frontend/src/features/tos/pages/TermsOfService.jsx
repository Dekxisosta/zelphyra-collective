const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using Zelphyra, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.",
  },
  {
    title: "Account Responsibility",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately if you suspect unauthorized access.",
  },
  {
    title: "Product Listings",
    body: "We strive to ensure all product information is accurate. However, we do not guarantee that descriptions, prices, or availability are error-free. We reserve the right to correct any errors and cancel orders affected by inaccuracies.",
  },
  {
    title: "Prohibited Use",
    body: "You may not use Zelphyra for any unlawful purpose, to transmit harmful or fraudulent content, or to interfere with the platform's operation. Violations may result in account suspension or termination.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this platform — including logos, images, and copy — is owned by or licensed to Zelphyra. You may not reproduce, distribute, or use our content without prior written permission.",
  },
  {
    title: "Limitation of Liability",
    body: "Zelphyra is not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our liability is limited to the amount paid for the transaction in question.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the Republic of the Philippines. Any disputes shall be resolved in the appropriate courts of the Philippines.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to update these terms at any time. Updates will be posted on this page. Continued use of the platform after changes constitutes acceptance of the revised terms.",
  },
];

export default function TermsOfService() {
  return (
    <div style={{minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Legal
        </p>
        <h1 style={{ color: "var(--color-text)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Terms of Service
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