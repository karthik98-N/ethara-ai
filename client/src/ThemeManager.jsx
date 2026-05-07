import { useEffect } from "react";
import { useAppStore } from "./store/useAppStore.js";

export default function ThemeManager({ children }) {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return children;
}
