import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {ReviewsSection} from "../sections";
import products from "../../../test/products.json";

const formatSold = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const computePrice = (basePrice, discount) => {
  if (!discount) return { final: basePrice, saved: null };
  return {
    final: Math.round(basePrice * (1 - discount / 100) * 100) / 100,
    saved: discount,
  };
};

export default function ProductDetailPage() {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
    }
  }, [product]);

  const correctSlug = product ? slugify(product.name) : "";

  useEffect(() => {
    if (product && slug !== correctSlug) {
      navigate(`/product/${correctSlug}/${product.id}`, {
        replace: true,
      });
    }
  }, [slug, correctSlug, navigate, product]);

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  const { final, saved } = computePrice(
    product.basePrice,
    product.discount
  );

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      {/* Image */}
      <div className="bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>⭐ {product.rating}</span>
          <span>{formatSold(product.sold)} sold</span>
          <span>{product.reviewsCount} reviews</span>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-[#ee4d2d]">
            ${final.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>

        <button className="mt-4 bg-[#ee4d2d] text-white py-3 rounded-lg font-semibold hover:opacity-90">
          Add to Cart
        </button>

        {/* Reviews */}
        <div className="mt-10">
          <Reviews
            reviews={reviews}
            onAddReview={(newReview) =>
              setReviews((prev) => [newReview, ...prev])
            }
          />
        </div>
      </div>
    </div>
  );
}