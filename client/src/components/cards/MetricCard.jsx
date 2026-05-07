export default function MetricCard({ title, value, change, tone = "electric", icon: Icon }) {
  const tones = {
    electric: "text-electric bg-electric/10 border-electric/20",
    mint: "text-mint bg-mint/10 border-mint/20",
    coral: "text-coral bg-coral/10 border-coral/20",
    amber: "text-amber bg-amber/10 border-amber/20"
  };

  return (
    <article className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {Icon ? <span className={`grid h-12 w-12 place-items-center rounded-lg border ${tones[tone]}`}><Icon size={22} /></span> : null}
      </div>
      <p className="mt-4 text-sm text-slate-300">{change}</p>
    </article>
  );
}
