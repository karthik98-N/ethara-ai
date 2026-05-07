import { AlertTriangle, CheckCircle2, Clock3, ListTodo } from "lucide-react";
import MetricCard from "../components/cards/MetricCard.jsx";
import ProductivityChart from "../components/charts/ProductivityChart.jsx";
import TeamChart from "../components/charts/TeamChart.jsx";
import { useAppStore } from "../store/useAppStore.js";

export default function Dashboard() {
  const { tasks, activities, user } = useAppStore();
  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-electric">Workspace overview</p>
        <h1 className="mt-2 text-3xl font-bold">Good momentum, {user.name.split(" ")[0]}</h1>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Tasks" value={tasks.length} change="+4 from AI planner" icon={ListTodo} />
        <MetricCard title="Completed" value={completed} change={`${Math.round((completed / tasks.length) * 100)}% completion rate`} tone="mint" icon={CheckCircle2} />
        <MetricCard title="Pending" value={tasks.length - completed} change="Across active projects" tone="amber" icon={Clock3} />
        <MetricCard title="Overdue Risk" value="2" change="AI recommends priority review" tone="coral" icon={AlertTriangle} />
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Weekly productivity</h2>
          <ProductivityChart />
        </article>
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Team performance</h2>
          <TeamChart />
        </article>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Smart recommendations</h2>
          <div className="mt-4 grid gap-3">
            {["Move auth flow first; it blocks protected routes.", "Split Socket activity feed into event and UI tasks.", "Assign review tasks before Friday to protect deployment time."].map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300">{item}</p>
            ))}
          </div>
        </article>
        <article className="glass rounded-lg p-5">
          <h2 className="text-lg font-bold">Live activity</h2>
          <div className="mt-4 space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="border-l-2 border-electric pl-3">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
