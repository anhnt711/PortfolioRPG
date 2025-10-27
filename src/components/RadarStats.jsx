import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function RadarStats({ data }) {
  const chartData = data.map(d => ({ subject: d.label, A: d.value }));
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-2xl p-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#303030" />
          <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
          <PolarRadiusAxis stroke="#4b5563" />
          <Radar name="Stats" dataKey="A" fill="#60a5fa" fillOpacity={0.4} stroke="#93c5fd" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
