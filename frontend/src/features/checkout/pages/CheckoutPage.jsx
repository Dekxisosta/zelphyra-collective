import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Truck, Wallet, CheckCircle, ChevronRight, ShoppingBag } from "lucide-react";
import { useProfile } from "../../profile";
import { useCheckout } from "../hooks/useCheckout";

// ── Payment method config ─────────────────────────────────────────────────────
const METHOD_META = {
  gcash:  { label: "GCash",   icon: Smartphone, desc: "Pay via GCash e-wallet" },
  card:   { label: "Card",    icon: CreditCard, desc: "Visa, Mastercard, etc." },
  cod:    { label: "COD",     icon: Truck,      desc: "Pay upon delivery" },
  paypal: { label: "PayPal",  icon: Wallet,     desc: "Pay via PayPal" },
};

// ── Order Confirmed screen ────────────────────────────────────────────────────
function OrderConfirmed({ order, payment, onContinue }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 py-20 text-center"
      style={{ color: "var(--color-text)" }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "80px",
          height: "80px",
          background: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
        }}
      >
        <CheckCircle
          className="w-10 h-10"
          style={{ color: "var(--color-primary)" }}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-1">Order Placed!</h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Order #{order.id} · {METHOD_META[payment.method]?.label ?? payment.method}
        </p>
      </div>

      <div
        className="w-full max-w-sm rounded-2xl p-5 flex flex-col gap-3 text-left text-sm"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted)" }}>Shipping to</span>
          <span className="font-medium text-right max-w-[60%]">{order.shipping_name}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted)" }}>Amount</span>
          <span className="font-bold" style={{ color: "var(--color-primary)" }}>
            ₱{order.total.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted)" }}>Status</span>
          <span
            className="text-xs font-bold uppercase px-2 py-0.5 rounded-lg"
            style={{
              background: "color-mix(in srgb, var(--color-warning) 15%, transparent)",
              color: "var(--color-warning)",
            }}
          >
            {payment.status}
          </span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition hover:brightness-110 active:scale-95"
        style={{ background: "var(--color-primary)", color: "white" }}
      >
        <ShoppingBag className="w-4 h-4" />
        Continue Shopping
      </button>
    </div>
  );
}

// ── CheckoutPage ──────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  const {
    form, setField,
    submitting, error,
    order, payment,
    cart, subtotal, shipping, total,
    placeOrder,
    PAYMENT_METHODS,
  } = useCheckout();

  useEffect(() => {
    if (!profileLoading && !profile) navigate("/login");
  }, [profileLoading, profile, navigate]);

  // Redirect to cart if empty (and not already confirmed)
  useEffect(() => {
    if (!profileLoading && profile && cart.length === 0 && !order) {
      navigate("/cart");
    }
  }, [cart, profileLoading, profile, order, navigate]);

  if (profileLoading) {
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

  // ── Confirmed state ──
  if (order && payment) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="w-full max-w-2xl mx-auto px-4 py-10">
          <OrderConfirmed
            order={order}
            payment={payment}
            onContinue={() => navigate("/products")}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 py-10">

        {/* ── Header ── */}
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => navigate("/cart")}
            className="text-xs transition hover:opacity-70"
            style={{ color: "var(--color-text-muted)" }}
          >
            Cart
          </button>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--color-text-muted)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
            Checkout
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left: Form ── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Shipping */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2 className="font-bold text-base" style={{ color: "var(--color-text)" }}>
                Shipping Information
              </h2>

              {/* Full name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.shipping_name}
                  onChange={(e) => setField("shipping_name", e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none transition"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.shipping_phone}
                  onChange={(e) => setField("shipping_phone", e.target.value)}
                  placeholder="+63 912 345 6789"
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none transition"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  Shipping Address
                </label>
                <textarea
                  value={form.shipping_address}
                  onChange={(e) => setField("shipping_address", e.target.value)}
                  placeholder="123 Rizal Street, Brgy. Poblacion, Cabuyao, Laguna 4025"
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none transition resize-none"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
              </div>
            </div>

            {/* Payment method */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2 className="font-bold text-base" style={{ color: "var(--color-text)" }}>
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const meta = METHOD_META[method];
                  const Icon = meta.icon;
                  const selected = form.payment_method === method;

                  return (
                    <button
                      key={method}
                      onClick={() => setField("payment_method", method)}
                      className="flex flex-col gap-1.5 p-3 rounded-xl text-left transition hover:brightness-105 active:scale-95"
                      style={{
                        background: selected
                          ? "color-mix(in srgb, var(--color-primary) 12%, var(--color-bg))"
                          : "var(--color-bg)",
                        border: selected
                          ? "2px solid var(--color-primary)"
                          : "2px solid var(--color-border)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: selected ? "var(--color-primary)" : "var(--color-text-muted)" }}
                      />
                      <span
                        className="text-sm font-bold"
                        style={{ color: selected ? "var(--color-primary)" : "var(--color-text)" }}
                      >
                        {meta.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {meta.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  background: "color-mix(in srgb, var(--color-danger) 12%, transparent)",
                  color: "var(--color-danger)",
                  border: "1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)",
                }}
              >
                {error}
              </div>
            )}
          </div>

          {/* ── Right: Summary ── */}
          <div
            className="w-full lg:w-80 flex-shrink-0 rounded-2xl p-6 flex flex-col gap-4 lg:sticky lg:top-24"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2 className="font-bold text-base" style={{ color: "var(--color-text)" }}>
              Order Summary
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images?.find((i) => i.is_primary)?.url ?? item.product.images?.[0]?.url ?? "https://placehold.co/40"}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    style={{ border: "1px solid var(--color-border)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: "var(--color-text)" }}>
                      {item.product.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      x{item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--color-danger)" }}>
                    ₱{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-2 text-sm pt-3"
              style={{
                borderTop: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span style={{ color: "var(--color-text)" }}>₱{subtotal.toFixed(2)}</span>
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
              <span style={{ color: "var(--color-primary)" }}>₱{total.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={submitting}
              className="w-full py-3 rounded-xl text-sm font-bold transition hover:brightness-110 active:scale-95"
              style={{
                background: submitting
                  ? "color-mix(in srgb, var(--color-primary) 60%, transparent)"
                  : "var(--color-primary)",
                color: "white",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Placing Order…" : "Place Order"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full py-2 rounded-xl text-xs font-medium transition hover:opacity-80"
              style={{
                background: "none",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                cursor: "pointer",
              }}
            >
              Back to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}