import categories from "../../test/categories.json";
import { CategoryCard } from "..";
 
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
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}