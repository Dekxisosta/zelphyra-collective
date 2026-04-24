import { Outlet } from "react-router-dom";
import {Navbar, Footer} from "../../shared"
import {BotWidget} from "../../features/bot";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BotWidget />
    </div>
  );
}