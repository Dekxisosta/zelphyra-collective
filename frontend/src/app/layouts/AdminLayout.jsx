import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "../../features/admin/components/AdminNavbar";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[var(--color-bg-primary)]">
      <AdminNavbar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <main
        className={`h-screen overflow-y-auto transition-all duration-300 
          ml-0 
          ${isCollapsed ? "md:ml-[60px]" : "md:ml-[220px]"}
        `}
      >
        <div className="min-h-full px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}