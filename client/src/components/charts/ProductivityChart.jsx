import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { weeklyProductivity } from "../../utils/demoData.js";
import { useAppStore } from "../../store/useAppStore.js";

export default function ProductivityChart() {
  const { theme } = useAppStore();

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyProductivity}>
          <CartesianGrid stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(148,163,184,0.14)"} vertical={false} />
          <XAxis dataKey="day" stroke={theme === "dark" ? "#94A3B8" : "#64748B"} tickLine={false} axisLine={false} />
          <YAxis stroke={theme === "dark" ? "#94A3B8" : "#64748B"} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
              borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              borderRadius: "8px",
              color: theme === "dark" ? "#ffffff" : "#0f172a"
            }}
            itemStyle={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
          />
          <Bar dataKey="completed" fill="#3EE8B5" radius={[6, 6, 0, 0]} />
          <Bar dataKey="delayed" fill="#FF7A7A" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
