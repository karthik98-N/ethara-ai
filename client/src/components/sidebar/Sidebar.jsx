import { BarChart3, CheckSquare, FolderKanban, LayoutDashboard, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-ink px-5 py-6 backdrop-blur-xl lg:block">
      <NavLink to="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-electric text-white shadow-glow">
          <Sparkles size={22} />
        </span>
        <span>
          <span className="block text-xl font-bold">FlowForge</span>
          <span className="text-xs uppercase tracking-[0.22em] text-muted">Team OS</span>
        </span>
      </NavLink>

      <nav className="mt-10 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive ? "bg-electric text-white shadow-md" : "text-secondary hover:bg-white/10 hover:text-primary"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 rounded-lg border border-electric/30 bg-electric/10 p-4">
        <p className="text-sm font-semibold text-electric">AI Sprint Planner</p>
        <p className="mt-1 text-xs leading-5 text-muted">Generate subtasks, risks, and priorities from one project goal.</p>
      </div>
    </aside>
  );
}
