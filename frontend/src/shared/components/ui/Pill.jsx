const VARIANTS = {
  exclusive: {
    label: "Shop Exclusive",
    bg: "#831843",
    color: "#fce7f3",
    dot: "#db2777",
  },
  new: {
    label: "New",
    bg: "#1e3a8a",
    color: "#dbeafe",
    dot: "#93c5fd",
  },
  trending: {
    label: "Trending",
    bg: "#7c2d12",
    color: "#ffedd5",
    dot: "#ea580c",
  },
  discounted: {
    label: "Discounted",
    bg: "#14532d",
    color: "#dcfce7",
    dot: "#16a34a",
  },
  bestseller: {
    label: "Bestseller",
    bg: "#713f12",
    color: "#fef9c3",
    dot: "#ca8a04",
  },
  sale: {
    label: "Sale",
    bg: "#7f1d1d",
    color: "#fee2e2",
    dot: "#dc2626",
  },
  limited: {
    label: "Limited",
    bg: "#3b0764",
    color: "#ede9fe",
    dot: "#7c3aed",
  },
  hot: {
    label: "Hot",
    bg: "#881337",
    color: "#fce7f3",
    dot: "#e11d48",
  },
};

export default function Pill({
  variant = "new",
  label,
  bg,
  color,
  dot,
}) {
  const base = VARIANTS[variant] ?? VARIANTS.new;

  const resolvedBg    = bg    ?? base.bg;
  const resolvedColor = color ?? base.color;
  const resolvedDot   = dot   ?? base.dot;
  const resolvedLabel = (label ?? base.label).replace(/^\w/, c => c.toUpperCase());

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: resolvedBg, color: resolvedColor }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: resolvedDot }}
      />
      {resolvedLabel}
    </span>
  );
}