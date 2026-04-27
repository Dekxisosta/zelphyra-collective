import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../profile";
import { Featured, useCart } from "../../../shared";

export default function CartPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { cart, loading, updateCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profileLoading && !profile) {
      navigate("/login");
    }
  }, [profileLoading, profile, navigate]);

  if (loading || profileLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
      >
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  // ── Cart helpers ──────────────────────────────────────────────────────────
  const removeItem = (itemId) =>
    updateCart(cart.filter((i) => i.id !== itemId));

  const changeQty = (itemId, delta) =>
    updateCart(
      cart
        .map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <div
        className="flex flex-col"
        style={{
          minHeight: "100vh",
          background: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">

          {/* ── Page Header ── */}
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            Your Cart
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            {cart.length === 0
              ? "No items yet."
              : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
          </p>

          {/* ── Empty State ── */}
          {cart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-4 rounded-2xl p-16 text-center"
              style={{
                border: "1px dashed var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <span className="text-5xl">🛒</span>
              <p className="text-sm">
                Your cart is empty. Start adding some products!
              </p>
              <button
                onClick={() => navigate("/products")}
                className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold transition hover:brightness-110"
                style={{ background: "var(--color-primary)", color: "white" }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* ── Cart Items ── */}
              <div className="flex-1 flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-2xl transition"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={
                        item.product.images?.[0]?.url ||
                        "https://placehold.co/80"
                      }
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* Info + quantity controls */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className="font-semibold text-sm truncate"
                        style={{ color: "var(--color-text)" }}
                      >
                        {item.product.name}
                      </h2>
                      <p
                        className="text-xs mt-1 font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        ₱{item.product.price.toFixed(2)} each
                      </p>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition hover:brightness-90"
                          style={{
                            background: "var(--color-border)",
                            color: "var(--color-text)",
                          }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          className="text-xs font-semibold w-4 text-center"
                          style={{ color: "var(--color-text)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition hover:brightness-90"
                          style={{
                            background: "var(--color-border)",
                            color: "var(--color-text)",
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Right: subtotal + remove */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p
                        className="font-bold text-sm"
                        style={{ color: "var(--color-danger)" }}
                      >
                        ₱{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs transition hover:opacity-70"
                        style={{ color: "var(--color-text-muted)" }}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Order Summary ── */}
              <div
                className="w-full lg:w-80 flex-shrink-0 rounded-2xl p-6 flex flex-col gap-4 lg:sticky lg:top-24"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h2
                  className="font-bold text-base"
                  style={{ color: "var(--color-text)" }}
                >
                  Order Summary
                </h2>

                <div
                  className="flex flex-col gap-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span style={{ color: "var(--color-text)" }}>
                      ₱{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span style={{ color: "var(--color-text)" }}>
                      {shipping === 0 ? "Free" : `₱${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div
                  className="flex justify-between font-bold text-sm pt-3"
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: "var(--color-primary)" }}>
                    ₱{total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 rounded-xl text-sm font-bold transition hover:brightness-110 active:scale-95"
                  style={{ background: "var(--color-primary)", color: "white" }}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full py-2 rounded-xl text-xs font-medium transition hover:opacity-80"
                  style={{
                    background: "none",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)",
                    cursor: "pointer",
                  }}
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      <Featured />
    </>
  );
}