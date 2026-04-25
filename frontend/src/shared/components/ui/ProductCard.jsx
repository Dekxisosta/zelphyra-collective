import { Star, ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom";
import Pill from "./Pill.jsx";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const truncate = (str, max) => (str.length > max ? str.slice(0, max).trimEnd() + "…" : str);

const formatSold = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
};

const computePrice = (basePrice, discount) => {
  if (!discount) return { final: basePrice, saved: null };
  return { final: Math.round(basePrice * (1 - discount / 100) * 100) / 100, saved: discount };
};

export default function Card({ product }) {
  const { final, saved } = computePrice(product.basePrice, product.discount);
  const isSoldOut = product.stock === 0;

  const resolvedPill = product.pill
    ? product.pill
    : saved
    ? { variant: "discounted", label: `${saved}% Off` }
    : null;

  return (
    <Link
      to={`/product/${slugify(product.name)}/${product.id}`}
      className="group relative flex flex-col rounded-[12px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg 
      border border-[] bg-[var(--color-surface)]"
    >
      {/* 1. Pill Overlay */}
      {resolvedPill && (
        <div className="absolute top-2 left-2 z-20">
          <Pill {...resolvedPill} />
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-t-[12px] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            isSoldOut ? "grayscale opacity-50" : ""
          }`}
        />

        {product.hoverImage && !isSoldOut && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        )}

        {isSoldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="bg-black/80 text-white px-3 py-1 rounded-[4px] text-[10px] font-bold tracking-tighter uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 gap-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{
                  fill: i < Math.round(product.rating) ? "#facc15" : "transparent",
                  color: i < Math.round(product.rating) ? "#facc15" : "var(--color-border)",
                }}
              />
            ))}
            <span className="ml-1" style={{ color: "var(--color-text-muted)" }}>
              {product.rating}
            </span>
          </div>
          <span style={{ color: "var(--color-text-muted)" }}>
            {formatSold(product.sold)} sold
          </span>
        </div>

        <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--color-text)" }}>
          <span className="block sm:hidden">{truncate(product.name, 22)}</span>
          <span className="hidden sm:block lg:hidden">{truncate(product.name, 30)}</span>
          <span className="hidden lg:block">{truncate(product.name, 26)}</span>
        </h3>

        <div className="flex-1" />

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col">
            <span className="text-base font-bold" style={{ color: "#ee4d2d" }}>
              ${final.toFixed(2)}
            </span>
            {saved && (
              <span
                className="text-xs line-through leading-none"
                style={{ color: "var(--color-text-muted)" }}
              >
                ${product.basePrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            disabled={isSoldOut}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isSoldOut) return;
            }}
            // Replaced rounded-xl with explicit 10px rounding
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[10px] transition-all duration-200 active:scale-95 text-white ${
              isSoldOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isSoldOut ? "Sold" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}