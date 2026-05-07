import { Outlet } from "react-router-dom";
import TopNav from "../components/navbar/TopNav.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen text-primary">
      <Sidebar />
      <main className="min-h-screen lg:pl-72">
        <TopNav />
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
