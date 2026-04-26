import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./shared/components/layouts/ScrollToTop"

export default function App() {
  return (
    <div key={location.pathname} className="page-wrapper">
        <ScrollToTop />
        <Outlet/>
    </div>
  );
}