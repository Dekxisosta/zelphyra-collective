import { ShieldCheck, Clock, RefreshCw, CreditCard, ShoppingCart } from "lucide-react";
import { Truck } from "lucide-react";

const perks = [
  {
    icon: Truck,
    iconBg: "#EEF2FF",
    iconColor: "#4F46E5",
    title: "Free shipping",
    description: "On all orders over $100 — no minimums to track.",
  },
  {
    icon: ShieldCheck,
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    title: "1-year warranty",
    description: "Full coverage on every product we sell.",
  },
  {
    icon: Clock,
    iconBg: "#FFFBEB",
    iconColor: "#D97706",
    title: "24/7 support",
    description: "Real people, any time. Average reply under 2 min.",
  },
  {
    icon: RefreshCw,
    iconBg: "#FFF1F2",
    iconColor: "#E11D48",
    title: "Easy returns",
    description: "30-day hassle-free returns, no questions asked.",
  },
  {
    icon: CreditCard,
    iconBg: "#F0F9FF",
    iconColor: "#0284C7",
    title: "Secure payments",
    description: "SSL-encrypted checkout. We never store card data.",
  },
  {
    icon: ShoppingCart,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    title: "Price match",
    description: "Found it cheaper? We'll match any verified price.",
  },
];

export default function Perks() {
  return (
    <section
      style={{
        borderTop: "0.5px solid var(--color-border)",
        borderBottom: "0.5px solid var(--color-border)",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "var(--color-border)",
        }}
      >
        {perks.map(({ icon: Icon, iconBg, iconColor, title, description }, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-background)",
              padding: "1.75rem 1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 8,
                background: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={18} color={iconColor} strokeWidth={1.75} />
            </div>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>
                {title}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}