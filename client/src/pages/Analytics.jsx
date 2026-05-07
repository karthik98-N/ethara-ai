import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ProductivityChart from "../components/charts/ProductivityChart.jsx";
import TeamChart from "../components/charts/TeamChart.jsx";
import { useAppStore } from "../store/useAppStore.js";

export default function Analytics() {
  const { tasks, theme } = useAppStore();
  const data = ["Todo", "In Progress", "Review", "Completed"].map((status) => ({
    name: status,
    value: tasks.filter((task) => task.status === status).length
  }));
  const colors = ["#F9C74F", "#36C5F0", "#A78BFA", "#3EE8B5"];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-electric">Analytics</p>
        <h1 className="mt-2 text-3xl font-bold">Productivity intelligence</h1>
      </div>
      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Task distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                  {data.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                    borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    color: theme === "dark" ? "#ffffff" : "#0f172a"
                  }}
                  itemStyle={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.map((item, index) => (
              <span key={item.name} className="text-sm text-slate-300"><span style={{ background: colors[index] }} className="mr-2 inline-block h-2 w-2 rounded-full" />{item.name}</span>
            ))}
          </div>
        </article>
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Weekly burn-down</h2>
          <ProductivityChart />
        </article>
      </section>
      <article className="glass rounded-lg p-5">
        <h2 className="text-lg font-bold">Team score radar</h2>
        <TeamChart />
      </article>
    </div>
  );
}
