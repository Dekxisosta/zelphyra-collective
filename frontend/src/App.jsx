import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./shared/components/layouts/ScrollToTop"

export default function App() {
  return (
    <div>
        <ScrollToTop />
        <Outlet/>
    </div>
  );
}