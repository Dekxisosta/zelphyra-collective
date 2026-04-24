import { Link } from "react-router-dom";
import categories from "../../test/categories.json";

export default function CategoryCarousel() {
  return (
    <section className="w-full px-6 py-6">
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Shop by Category
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth custom-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="relative min-w-[180px] flex-shrink-0 rounded-xl overflow-hidden group transition hover:-translate-y-1"
            style={{
              border: "1px solid var(--color-border)"
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-semibold text-sm">
                {cat.name}
              </p>
              <p className="text-white text-xs">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}