const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Stars = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => <Star key={i} />)}
  </div>
);

const testimonials = [
  {
    quote: "The quality blew me away. Ordered on a Tuesday, had it by Thursday — and the packaging was immaculate. I've already recommended it to three friends.",
    name: "Jamie M.",
    location: "Austin, TX",
    initials: "JM",
    avatarBg: "#EEF2FF",
    avatarColor: "#4F46E5",
  },
  {
    quote: "Customer support is the real deal. Had a small issue with my order and they resolved it within an hour — no back and forth, no hassle. Rare to see that kind of service.",
    name: "Sofia R.",
    location: "Chicago, IL",
    initials: "SR",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
  },
  {
    quote: "I was skeptical about the price match claim but they actually honored it — matched a competitor and threw in free express shipping. Won't be shopping anywhere else.",
    name: "Daniel K.",
    location: "Seattle, WA",
    initials: "DK",
    avatarBg: "#FFFBEB",
    avatarColor: "#D97706",
  },
  {
    quote: "Bought three items as gifts and every single one arrived perfectly. The return process for one that wasn't quite right was genuinely painless — got the refund in two days.",
    name: "Aisha L.",
    location: "New York, NY",
    initials: "AL",
    avatarBg: "#FFF1F2",
    avatarColor: "#E11D48",
  },
  {
    quote: "I've been shopping here for two years now. Consistent quality, reliable delivery, and the warranty actually came through when my item had a defect six months in. Solid all around.",
    name: "Marcus P.",
    location: "Denver, CO",
    initials: "MP",
    avatarBg: "#F5F3FF",
    avatarColor: "#7C3AED",
  },
  {
    quote: "Fast, secure, exactly as described. I was nervous about checking out for the first time but the whole experience felt safe and professional. Will absolutely be back.",
    name: "Yuki T.",
    location: "Portland, OR",
    initials: "YT",
    avatarBg: "#F0F9FF",
    avatarColor: "#0284C7",
  },
];

function TestimonialCard({ quote, name, location, initials, avatarBg, avatarColor }) {
  return (
    <div
      style={{
        background: "var(--color-background)",
        border: "0.5px solid var(--color-border)",
        borderRadius: 12,
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Stars />
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-text)", lineHeight: 1.6 }}>
        {quote}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: "auto",
          paddingTop: 12,
          borderTop: "0.5px solid var(--color-border)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 500,
            color: avatarColor,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--color-text)" }}>
            {name}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>
            Verified buyer · {location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ padding: "4rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              margin: "0 0 6px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
            }}
          >
            Customer reviews
          </p>
          <h2 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 500 }}>
            Trusted by thousands
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <Stars count={5} />
            <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
              4.9 out of 5 · 2,400+ reviews
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}