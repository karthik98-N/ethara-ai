import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { teamPerformance } from "../../utils/demoData.js";

export default function TeamChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={teamPerformance}>
          <PolarGrid stroke="rgba(148,163,184,0.22)" />
          <PolarAngleAxis dataKey="name" stroke="#CBD5E1" />
          <Radar dataKey="score" stroke="#36C5F0" fill="#36C5F0" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
