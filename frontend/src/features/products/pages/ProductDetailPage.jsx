import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RetryComponent } from "../../../shared";

const formatSold = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
};

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const computePrice = (price, discount) => {
  if (!discount) return { final: price, saved: null };
  return {
    final: Math.round(price * (1 - discount / 100) * 100) / 100,
    saved: discount,
  };
};

export default function ProductDetailPage() {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Redirect if slug is wrong
  useEffect(() => {
    if (product && slug !== slugify(product.name)) {
      navigate(`/product/${slugify(product.name)}/${product.id}`, { replace: true });
    }
  }, [product, slug, navigate]);

  if (loading) return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 animate-pulse">
      <div className="rounded-xl bg-gray-200 h-[400px]" />
      <div className="flex flex-col gap-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded w-1/3" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  );

  if (error) return (
    <RetryComponent errorType="FETCH_ERROR" onRetry={fetchProduct} />
  );

  if (!product) return (
    <RetryComponent errorType="NOT_FOUND" onRetry={fetchProduct} />
  );

  const primaryImage = product.images?.find(img => img.is_primary)?.url ?? null;
  const hoverImage   = product.images?.find(img => img.is_hover)?.url ?? null;
  const stock        = product.inventory?.stock ?? 0;
  const sold         = product.inventory?.sold ?? 0;
  const isSoldOut    = stock === 0;

  const { final, saved } = computePrice(product.price, product.discount_percent);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      {/* IMAGE */}
      <div
        className="rounded-xl overflow-hidden relative group"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-[400px] object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-[400px] object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="bg-black/80 text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-4">

        {/* Brand */}
        {product.brand && (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {product.brand}
          </p>
        )}

        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
          {product.name}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <span>{formatSold(sold)} sold</span>
          {stock > 0 && (
            <span style={{ color: "#10b981", fontWeight: 600 }}>{stock} in stock</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold" style={{ color: "#ee4d2d" }}>
            ₱{final.toFixed(2)}
          </span>
          {saved && (
            <span className="text-sm line-through" style={{ color: "var(--color-text-muted)" }}>
              ₱{product.price.toFixed(2)}
            </span>
          )}
          {saved && (
            <span className="text-sm font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fee2e2", color: "#ef4444" }}>
              -{saved}%
            </span>
          )}
        </div>

        {/* Shipping */}
        {product.shipping_fee !== null && (
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            🚚 ₱{product.shipping_fee} shipping · {product.shipping_days_min}–{product.shipping_days_max} days
            {product.shipping_from && ` from ${product.shipping_from}`}
          </p>
        )}

        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {product.description}
        </p>

        {/* SKU */}
        {product.sku && (
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            SKU: {product.sku}
          </p>
        )}

        <button
          disabled={isSoldOut}
          className={`mt-4 py-3 rounded-lg font-semibold text-white transition ${
            isSoldOut ? "bg-gray-400 cursor-not-allowed" : "hover:opacity-90"
          }`}
          style={isSoldOut ? {} : { backgroundColor: "var(--color-primary)", borderRadius: "var(--radius)" }}
        >
          {isSoldOut ? "Out of Stock" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}