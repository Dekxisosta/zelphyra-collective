const VARIANTS = {
  exclusive: {
    label: "Shop Exclusive",
    bg: "#fdf2f8",
    color: "#9d174d",
    dot: "#ec4899",
  },
  new: {
    label: "New",
    bg: "#eff6ff",
    color: "#1e40af",
    dot: "#3b82f6",
  },
  trending: {
    label: "Trending",
    bg: "#fff7ed",
    color: "#9a3412",
    dot: "#f97316",
  },
  discounted: {
    label: "Discounted",
    bg: "#f0fdf4",
    color: "#166534",
    dot: "#22c55e",
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

  const resolvedBg = bg ?? base.bg;
  const resolvedColor = color ?? base.color;
  const resolvedDot = dot ?? base.dot;
  const resolvedLabel = label ?? base.label;

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