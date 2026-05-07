import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, CheckCircle2, KanbanSquare, RadioTower } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: KanbanSquare, title: "Kanban execution", text: "Drag tasks across Todo, In Progress, Review, and Completed." },
  { icon: RadioTower, title: "Live collaboration", text: "Real-time task updates, activity feed, and team notifications." },
  { icon: BarChart3, title: "Productivity analytics", text: "Completion trends, team performance, risk signals, and streaks." },
  { icon: Bot, title: "AI Sprint Planner", text: "Convert a goal into subtasks, priorities, and a deadline plan." }
];

export default function Landing() {
  return (
    <main className="min-h-screen text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-2 text-sm text-electric">
              <CheckCircle2 size={16} /> Selection-ready team productivity platform
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">FlowForge</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              AI-powered collaborative task management for projects, members, tasks, analytics, and real-time work progress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-5 py-3 font-semibold text-ink shadow-glow">
                Open demo workspace <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/10">
                Create account
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="glass rounded-lg p-4">
            <div className="grid gap-3">
              {["Product Design", "Backend APIs", "Socket.IO Feed", "AI Planner"].map((label, index) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{label}</p>
                    <span className="text-xs text-slate-400">{[72, 55, 88, 40][index]}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-mint" style={{ width: `${[72, 55, 88, 40][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="glass rounded-lg p-5">
              <feature.icon className="text-electric" />
              <h2 className="mt-4 text-lg font-bold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
