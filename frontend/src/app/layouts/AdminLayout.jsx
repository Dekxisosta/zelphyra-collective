import { Outlet, Navigate } from "react-router-dom";

const user = { role: "admin" }; // replace later with auth system

export default function AdminLayout() {
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      {/* sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">Admin Panel</h2>
        <nav className="mt-4 space-y-2 text-sm">
          <a href="/admin">Dashboard</a>
          <a href="/admin/products">Products</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}