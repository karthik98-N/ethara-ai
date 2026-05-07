import { Bell, LogOut, Menu, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore.js";
import ThemeToggle from "../ThemeToggle.jsx";

export default function TopNav() {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 lg:hidden">
          <Menu size={22} className="text-slate-400" />
          <NavLink to="/dashboard" className="font-bold">FlowForge</NavLink>
        </nav>
        <label className="hidden min-w-0 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-400 md:flex focus-within:border-electric">
          <Search size={18} />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search projects, tasks, members..." />
        </label>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-electric transition-colors" title="Notifications">
            <Bell size={18} />
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role} · {user.streak} day streak</p>
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-coral transition-colors"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>

  );
}
