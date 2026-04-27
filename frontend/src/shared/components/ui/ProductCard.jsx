import { ShoppingCart, Heart } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Pill from "./Pill.jsx";
import { useProfile } from "../../../features/profile";

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

const getStockStatus = (stock) => {
  if (stock === 0)  return { label: "Sold out",       color: "var(--color-text-subtle)" };
  if (stock <= 5)   return { label: `Last ${stock}!`, color: "var(--color-danger)" };
  if (stock <= 20)  return { label: "Low stock",      color: "var(--color-warning)" };
  return null;
};

export default function Card({ product }) {
  const [wished, setWished] = useState(false);
  const { profile } = useProfile();
  const navigate = useNavigate();

  const primaryImage = product.images?.find(img => img.is_primary)?.url ?? null;
  const hoverImage   = product.images?.find(img => img.is_hover)?.url ?? null;
  const stock        = product.inventory?.stock ?? 0;
  const sold         = product.inventory?.sold ?? 0;

  const { final, saved } = computePrice(product.price, product.discount_percent);
  const isSoldOut = stock === 0;
  const stockStatus = getStockStatus(stock);

  const resolvedPill = product.pill ?? null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;
    if (!profile) {
      navigate("/login");
      return;
    }
    
  };

  return (
    <Link
      to={`/product/${slugify(product.name)}/${product.id}`}
      className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderRadius: "var(--radius)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >

      {/* IMAGE */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1", background: "var(--color-bg-muted)" }}
      >
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            isSoldOut ? "grayscale opacity-40" : ""
          }`}
        />

        {hoverImage && !isSoldOut && (
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" }}
        />

        {isSoldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span
              className="px-3 py-1 text-xs font-bold tracking-tighter uppercase"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
                borderRadius: "4px",
              }}
            >
              Out of Stock
            </span>
          </div>
        )}

        {/* MAIN PILL — top left */}
        {resolvedPill && (
          <div className="absolute top-2 left-0 z-20">
            <Pill {...resolvedPill} />
          </div>
        )}

        {/* STOCK STATUS — bottom of image */}
        {stockStatus && !isSoldOut && (
          <div
            className="absolute bottom-0 left-0 right-0 z-20 flex items-center px-2.5 py-1.5"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
          >
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
              style={{
                color: "var(--hero-text)",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "5px",
                padding: "3px 8px",
              }}
            >
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: stockStatus.color,
                display: "inline-block",
                flexShrink: 0,
              }} />
              {stockStatus.label}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className="relative flex flex-col p-3 gap-2 overflow-hidden"
        style={{
          backgroundSize: "10px 10px",
          backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
          backgroundColor: "var(--color-surface)",
        }}
      >

        {/* SELLER + CATEGORY */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            <img
              src="/images/seller-image.png"
              alt="Seller"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--color-primary)",
              }}
            />
            <span
              className="px-2 py-1 rounded-2xl text-xs font-semibold"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text-muted)",
              }}
            >
              Official Store
            </span>
          </div>
          {product.category?.name && (
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-primary)" }}>
              {product.category.name}
            </span>
          )}
          <div
            style={{
              borderRadius: "50%",
              border: wished ? "2px solid var(--color-border)" : "none",
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWished(w => !w);
              }}
              className="flex items-center justify-center transition-all duration-200 active:scale-90"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
            >
              <Heart
                className="w-4 h-4 m-2 transition-all duration-200"
                style={{
                  fill: wished ? "#ec4899" : "transparent",
                  color: wished ? "#ec4899" : "var(--color-text-muted)",
                  transform: wished ? "scale(1.25)" : "scale(1)",
                }}
              />
            </button>
          </div>
        </div>

        <h3 className="text-sm font-bold leading-snug relative z-10" style={{ color: "var(--color-text)" }}>
          <span className="block sm:hidden">{truncate(product.name, 22)}</span>
          <span className="hidden sm:block lg:hidden">{truncate(product.name, 30)}</span>
          <span className="hidden lg:block">{truncate(product.name, 26)}</span>
        </h3>

        {product.description && (
          <p
            className="text-xs leading-relaxed relative z-10 line-clamp-2 min-h-[2.5rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {product.description}
          </p>
        )}

        {/* PRICE + ACTIONS */}
        <div
          className="flex items-center justify-between pt-2 relative z-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-base font-bold" style={{ color: "var(--color-danger)" }}>
              ₱{final.toFixed(2)}
            </span>
            {saved && (
              <span className="text-xs line-through" style={{ color: "var(--color-text-muted)" }}>
                ₱{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={isSoldOut}
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
                isSoldOut ? "cursor-not-allowed" : "hover:brightness-110"
              }`}
              style={{
                background: isSoldOut ? "var(--color-text-subtle)" : "var(--color-primary)",
                color: "var(--hero-text)",
                clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                paddingTop: "7px",
                paddingBottom: "7px",
                paddingLeft: "16px",
                paddingRight: "16px",
                borderRadius: "var(--radius)",
                boxShadow: isSoldOut
                  ? "none"
                  : "0 4px 12px color-mix(in srgb, var(--color-primary) 50%, transparent)",
              }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {isSoldOut ? "Sold" : "Add"}
            </button>
          </div>
        </div>

        <span className="text-xs relative z-10" style={{ color: "var(--color-text-muted)" }}>
          {formatSold(sold)} sold
        </span>

      </div>
    </Link>
  );
}