import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="relative min-w-[180px] flex-shrink-0 rounded-xl overflow-hidden group transition hover:-translate-y-1"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-semibold text-sm">{category.name}</p>
        <p className="text-white text-xs">{category.description}</p>
      </div>
    </Link>
  );
}