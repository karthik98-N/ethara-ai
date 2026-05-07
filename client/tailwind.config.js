/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "var(--color-ink)",
        panel: "var(--color-panel)",
        electric: "#2563EB",
        mint: "#10B981",
        coral: "#EF4444",
        amber: "#F59E0B"
      },
      boxShadow: {
        glow: "var(--shadow-glow)"
      },
      backgroundImage: {
        "page-gradient": "var(--bg-gradient)"
      }
    }
  },
  plugins: []
};
