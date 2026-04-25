import { Navigate, Outlet } from "react-router-dom";
 
export default function AdminGuard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
 
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
 
  return <Outlet />;
}