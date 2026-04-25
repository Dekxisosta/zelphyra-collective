import { Link } from "react-router-dom";

const heroImg = "/images/hero.jpg";

export default function Hero() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "slowPan 20s ease-in-out infinite alternate",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center max-w-6xl mx-auto px-6">
        <div className="max-w-xl">

          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Zenless Collective • New Season
          </p>

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: "var(--color-text)" }}
          >
            Curated Finds for
            <br />
            <span style={{ color: "var(--color-primary)" }}>Every Lifestyle</span>
          </h1>

          <p
            className="mt-5 text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Books, manga, tech, and lifestyle essentials — all in one curated space.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/products"
              className="px-6 py-3 font-semibold text-white hover:opacity-90 transition"
              style={{
                backgroundColor: "var(--color-primary)",
                borderRadius: "var(--radius)",
              }}
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 font-semibold transition hover:bg-white/10"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              About the collective →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}