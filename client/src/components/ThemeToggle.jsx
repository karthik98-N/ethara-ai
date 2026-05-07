import { Moon, Sun } from "lucide-react";
import { useAppStore } from "../store/useAppStore.js";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="text-slate-600" size={20} />
      ) : (
        <Sun className="text-amber-400" size={20} />
      )}
    </motion.button>
  );
}
