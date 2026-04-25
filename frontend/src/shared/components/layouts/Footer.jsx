import { Link } from "react-router-dom";

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.2 22H3l7.3-8.4L1 2h6.3l4.4 5.8L18.9 2z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zM17.8 6.2a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.6A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.6 7.5.6 7.5.6s5.7 0 7.5-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const Footer = () => {
  const footerLinks = {
    Shop: [
      { label: "All Products", to: "/products" },
      { label: "New Arrivals", to: "/products?filter=new" },
      { label: "Best Sellers", to: "/products?filter=best" },
      { label: "Collections", to: "/products?filter=collections" },
    ],
    Help: [
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
    ],
    Company: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/careers" },
    ],
    Legal: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  };

  return (
    <footer
      className="w-full border-t pt-16 pb-8"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">

          {/* BRAND */}
          <div className="md:col-span-3 space-y-3">
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Zenless Collective
            </h2>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Minimal, modern ecommerce built for clarity and smooth shopping experiences.
            </p>
          </div>

          {/* LINKS */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm transition-colors hover:text-red-500"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-3 space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Newsletter
            </h4>

            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Get updates on new drops and exclusive offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "transparent",
                color: "var(--color-text)",
              }}
            />

            <button
              className="w-full py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
            >
              Subscribe
            </button>

            {/* SOCIALS */}
            <div className="flex gap-4 pt-2">
              <TwitterIcon className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
              <InstagramIcon className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
              <YoutubeIcon className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
              <MailIcon className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p style={{ color: "var(--color-text-muted)" }}>
            © 2026 Zelphyra Collective. All rights reserved.
          </p>

          <div className="flex gap-4">
            <span className="hover:text-red-500 cursor-pointer">Privacy</span>
            <span className="hover:text-red-500 cursor-pointer">Terms</span>
            <span className="hover:text-red-500 cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;