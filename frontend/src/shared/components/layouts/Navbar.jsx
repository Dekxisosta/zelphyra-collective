import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../features/theme";
import { useAuth } from "../../../features/auth";
import { useProfile } from "../../../features/profile";
import avatars from "../../../data/avatars.json";

import cart_light from "../../../assets/images/cart-light.png";
import cart_dark from "../../../assets/images/cart-dark.png";
import logo_light from "../../../assets/images/logo-light.png";
import logo_dark from "../../../assets/images/logo-dark.png";

function ProfileAvatar({ avatar }) {
  if (!avatar) return null;
  return (
    <Link to="/profile">
      <img
        src={avatar.url}
        alt={avatar.label ?? "profile"}
        className="w-9 h-9 opacity-70 hover:opacity-100 transition rounded-full object-cover object-center"
      />
    </Link>
  );
}

function NavDropdown({ label, links, isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;
  const isAnyActive  = links.some(link => isLinkActive(link.to));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1  font-medium leading-none transition"
        style={{
          color: isAnyActive ? "var(--color-primary)" : "var(--color-text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span className="text-sm">{label}</span>
        
        <svg
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span
          className="absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300"
          style={{
            width: isAnyActive ? "100%" : "0%",
            backgroundColor: "var(--color-primary)",
          }}
        />
      </button>

      <div
        className={`absolute left-0 top-full mt-3 w-40 rounded-xl p-2 transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          transformOrigin: "top left",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className="flex items-center px-3 py-2 rounded-lg text-sm transition hover:bg-white/5"
            style={{ color: isLinkActive(link.to) ? "var(--color-primary)" : "var(--color-text-muted)" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen]        = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user }               = useAuth();
  const { profile }            = useProfile();

  const hamburgerRef = useRef(null);
  const menuRef      = useRef(null);
  const location     = useLocation();

  const currentAvatar = useMemo(() => {
    const avatarId = profile?.avatar_id ?? 1;
    return avatars.find(a => a.id === avatarId) ?? null;
  }, [profile?.avatar_id]);

  const navLinks = [
    { to: "/",         label: "Home"     },
    { to: "/products", label: "Products" },
  ];

  const helpLinks = [
    { to: "/faq",      label: "FAQ"      },
    { to: "/shipping", label: "Shipping" },
    { to: "/returns",  label: "Returns"  },
  ];

  const companyLinks = [
    { to: "/about",   label: "About Us" },
    { to: "/contact", label: "Contact"  },
    { to: "/careers", label: "Careers"  },
  ];

  const legalLinks = [
    { to: "/privacy-policy", label: "Privacy Policy"  },
    { to: "/terms-of-service",   label: "Terms of Service" },
  ];

  const dropdowns = [
    { label: "Help",    links: helpLinks    },
    { label: "Company", links: companyLinks },
    { label: "Legal",   links: legalLinks   },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current      && !menuRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50">

      {/* ── TOP UTILITY BAR ── */}
      <div
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={theme === "light" ? logo_light : logo_dark}
              className="h-14 w-auto"
              alt="logo"
            />
          </Link>

          {/* UTILITY LINKS — desktop */}
          <div className="hidden md:flex items-center gap-3 text-xs py-1">
            <Link to="#" className="transition hover:opacity-100 opacity-60" style={{ color: "var(--color-text)" }}>
              Notifications
            </Link>
            <span style={{ color: "var(--color-border)" }}>|</span>
            <Link to="#" className="transition hover:opacity-100 opacity-60" style={{ color: "var(--color-text)" }}>
              Help
            </Link>
            <span style={{ color: "var(--color-border)" }}>|</span>
            <button
              onClick={toggleTheme}
              className="transition hover:opacity-100 opacity-60"
              style={{ color: "var(--color-text)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <span style={{ color: "var(--color-border)" }}>|</span>
            {user ? (
              <span className="opacity-60" style={{ color: "var(--color-text)" }}>
                {profile?.name ?? user.name}
              </span>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-lg border transition hover:bg-white/10"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 rounded-lg font-medium transition"
                  style={{ backgroundColor: "var(--color-primary)", color: "white" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE — avatar + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ProfileAvatar avatar={currentAvatar} />
            <button
              ref={hamburgerRef}
              className="flex flex-col gap-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {[1, 2, 3].map((i) => (
                <span key={i} className="w-6 h-[2px]" style={{ backgroundColor: "var(--color-text)" }} />
              ))}
            </button>
          </div>

        </div>
      </div>

      {/* ── MAIN NAV BAR ── */}
      <div
        className="py-3"
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="px-6 flex items-center justify-between">

          {/* LEFT NAV LINKS + DROPDOWNS */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-medium leading-none transition"
                style={{ color: isActive(link.to) ? "var(--color-primary)" : "var(--color-text-muted)" }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: isActive(link.to) ? "100%" : "0%",
                    backgroundColor: "var(--color-primary)",
                  }}
                />
              </Link>
            ))}

            {dropdowns.map((dropdown) => (
              <NavDropdown
                key={dropdown.label}
                label={dropdown.label}
                links={dropdown.links}
              />
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link to="/cart" className="relative p-1">
              <img src={theme === "light" ? cart_light : cart_dark} className="w-7 h-7" alt="cart" />
            </Link>
            <ProfileAvatar avatar={currentAvatar} />
          </div>

        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        ref={menuRef}
        className={`md:hidden absolute left-4 right-4 top-full mt-2 p-4 rounded-xl transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{ color: isActive(link.to) ? "var(--color-primary)" : "var(--color-text-muted)" }}
            >
              {link.label}
            </Link>
          ))}

          <hr style={{ borderColor: "var(--color-border)" }} />

          {/* DROPDOWN LINKS — flat sections in mobile */}
          {dropdowns.map((dropdown) => (
            <div key={dropdown.label} className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-40" style={{ color: "var(--color-text)" }}>
                {dropdown.label}
              </span>
              {dropdown.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm pl-1"
                  style={{ color: isActive(link.to) ? "var(--color-primary)" : "var(--color-text-muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <hr style={{ borderColor: "var(--color-border)" }} />

          <Link to="/cart" onClick={() => setOpen(false)} className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>Cart</Link>
          <Link to="#" onClick={() => setOpen(false)} className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>Notifications</Link>
          <button
            onClick={() => { toggleTheme(); setOpen(false); }}
            className="text-sm opacity-70 text-left"
            style={{ color: "var(--color-text)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <hr style={{ borderColor: "var(--color-border)" }} />

          {user ? (
            <Link to="/profile" onClick={() => setOpen(false)} className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              {profile?.name ?? user.name}
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm" style={{ color: "var(--color-text)" }}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}