// features/admin/components/AdminNavbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../theme";
import logo_light from "../../../assets/images/logo-light.png";
import logo_dark from "../../../assets/images/logo-dark.png";

const sidebarLinks = [
  {
    group: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: "⊞" }],
  },
  {
    group: "Catalog",
    items: [
      { to: "/admin/products", label: "Products", icon: "⊡" },
      { to: "/admin/inventory", label: "Inventory", icon: "⊟" },
    ],
  },
  {
    group: "Sales",
    items: [
      { to: "/admin/orders", label: "Orders", icon: "⊜" },
      { to: "/admin/payments", label: "Payments", icon: "⊠" },
      { to: "/admin/reports", label: "Sales Reports", icon: "⊝" },
    ],
  },
  {
    group: "Customers",
    items: [
      { to: "/admin/customers", label: "Customers", icon: "⊛" },
      { to: "/admin/order-history", label: "Order History", icon: "⊚" },
    ],
  },
];

export default function AdminNavbar({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* LOGO + COLLAPSE */}
      <div
        className="flex items-center justify-between px-4 py-4 min-h-[65px]"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {!isCollapsed && (
          <Link to="/admin" className="flex items-center gap-2 shrink-0">
            <img
              src={theme === "light" ? logo_light : logo_dark}
              className="h-8 w-auto min-w-[32px]"
              alt="logo"
            />
            <span style={{ color: "var(--color-text)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Admin
            </span>
          </Link>
        )}
        
        <button
          onClick={() => setIsCollapsed(c => !c)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-md transition hover:opacity-80"
          style={{ 
            background: "var(--color-border)", 
            color: "var(--color-text)", 
            marginLeft: isCollapsed ? "auto" : 0,
            marginRight: isCollapsed ? "auto" : 0 
          }}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-5">
        {sidebarLinks.map((group) => (
          <div key={group.group}>
            {!isCollapsed && (
              <p style={{
                color: "var(--color-text-muted)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0 0.5rem",
                marginBottom: "0.4rem",
                whiteSpace: "nowrap"
              }}>
                {group.group}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  title={isCollapsed ? item.label : undefined}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: isActive(item.to) ? "var(--color-primary)" : "transparent",
                    color: isActive(item.to) ? "#ffffff" : "var(--color-text-muted)",
                    fontWeight: isActive(item.to) ? 600 : 400,
                    fontSize: "0.875rem",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                  }}
                >
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</span>
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-2 py-4 flex flex-col gap-2" style={{ borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition w-full text-left hover:opacity-80"
          style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <span style={{ fontSize: "1.2rem" }}>{theme === "light" ? "☾" : "☀"}</span>
          {!isCollapsed && <span className="whitespace-nowrap">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition w-full text-left hover:opacity-80"
          style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <span style={{ fontSize: "1.2rem" }}>↩</span>
          {!isCollapsed && <span className="whitespace-nowrap">Back to Store</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 transition-all duration-300"
        style={{
          width: isCollapsed ? "60px" : "220px",
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── MOBILE TOPBAR ── */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-40"
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link to="/admin" className="flex items-center gap-2">
          <img src={theme === "light" ? logo_light : logo_dark} className="h-8 w-auto" alt="logo" />
          <span style={{ color: "var(--color-text)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Admin
          </span>
        </Link>
        <button onClick={() => setMobileOpen(true)} className="flex flex-col gap-1 p-2">
          {[1, 2, 3].map(i => (
            <span key={i} className="w-5 h-[2px]" style={{ backgroundColor: "var(--color-text)" }} />
          ))}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/50 transition-opacity duration-300" 
          onClick={() => setMobileOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`relative z-10 w-64 h-full flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}