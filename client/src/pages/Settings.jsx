import { Moon, ShieldCheck, Sun } from "lucide-react";
import { useAppStore } from "../store/useAppStore.js";

export default function Settings() {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-electric">Settings</p>
        <h1 className="mt-2 text-3xl font-bold">Workspace controls</h1>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Appearance</h2>
          <div className="mt-4 flex rounded-lg border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setTheme("dark")}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                theme === "dark" ? "bg-white text-ink shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              <Moon size={16} /> Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                theme === "light" ? "bg-white text-ink shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              <Sun size={16} /> Light
            </button>
          </div>
        </article>
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Security</h2>
          <div className="mt-4 space-y-3">
            {["JWT authentication", "bcrypt password hashing", "Helmet, CORS, and rate limiting", "Role middleware"].map((item) => (
              <p key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300"><ShieldCheck className="text-mint" size={18} /> {item}</p>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
