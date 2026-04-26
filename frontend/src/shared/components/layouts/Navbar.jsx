import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useTheme } from "../../../features/theme"; 

import cart from "../../../assets/images/cart.png";
import user from "../../../test/mock-profile.gif";
import logo_light from "../../../assets/images/logo-light.png";
import logo_dark from "../../../assets/images/logo-dark.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50">

      {/* ── TOP UTILITY BAR ── */}
      <div
        className="text-xs py-1 hidden md:block"
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="px-6 flex justify-end items-center gap-3">
          <Link to="#" className="transition hover:opacity-100 opacity-60 text-xs"
            style={{ color: "var(--color-text)" }}>
            Notifications
          </Link>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <Link to="#" className="transition hover:opacity-100 opacity-60 text-xs"
            style={{ color: "var(--color-text)" }}>
            Help
          </Link>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <button
            onClick={toggleTheme}
            className="transition hover:opacity-100 opacity-60 text-xs"
            style={{ color: "var(--color-text)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <Link
            to="/login"
            className="text-xs px-3 py-1 rounded-lg border transition hover:bg-white/10"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-xs px-3 py-1 rounded-lg font-medium transition"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* ── MAIN BAR ── */}
      <div
        className="py-3"
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="px-6 flex items-center relative">

          {/* LEFT NAV */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-medium transition"
                style={{
                  color: isActive(link.to)
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                }}
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
          </div>

          <Link to="/" className="absolute md:left-1/2 md:-translate-x-1/2 flex items-center">
            <img
              src={theme === "light" ? logo_light : logo_dark}
              className="h-16 w-auto"
              alt="logo"
            />
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link to="/cart" className="relative p-1">
              <img src={cart} className="w-7 h-7" alt="cart" />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                3
              </span>
            </Link>
            <Link to="/profile">
              <img
                src={user}
                className="w-9 h-9 opacity-70 hover:opacity-100 transition rounded-full object-cover object-center"
                alt="profile"
              />
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden ml-auto flex items-center gap-3">
            <Link to="/profile">
              <img
                src={user}
                className="w-9 h-9 opacity-70 hover:opacity-100 transition rounded-full object-cover object-center"
                alt="profile"
              />
            </Link>
            <button
              ref={hamburgerRef}
              className="flex flex-col gap-1 rounded-none"
              onClick={() => setOpen(!open)}
            >
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-6 h-[2px]"
                  style={{ backgroundColor: "var(--color-text)" }}
                />
              ))}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`md:hidden absolute left-4 right-4 top-full mt-2 p-4 rounded-xl transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{
                color: isActive(link.to)
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <hr style={{ borderColor: "var(--color-border)" }} />

          <Link to="#" onClick={() => setOpen(false)} className="text-sm opacity-70"
            style={{ color: "var(--color-text)" }}>
            Notifications
          </Link>
          <Link to="#" onClick={() => setOpen(false)} className="text-sm opacity-70"
            style={{ color: "var(--color-text)" }}>
            Help
          </Link>
          <Link to="/login" onClick={() => setOpen(false)} className="text-sm"
            style={{ color: "var(--color-text)" }}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)} className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}