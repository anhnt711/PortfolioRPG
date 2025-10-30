
// ===============================
// File: RadarStats.jsx
// ===============================
// Right panel – unified style to match the left Hero card
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RadarStats({ title = "Skill Radar", stats = [] }) {
  const data = stats.map((s) => ({ ...s, full: 100 }));
  return (
    <div className="rpg-card rpg-panel">
      <h2 className="rpg-h2 mb-2">{title}</h2>

      <div className="rpg-chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="80%">
            <PolarGrid stroke="rgba(251,191,36,.25)" />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: "var(--rpg-fg)" }}
              stroke="transparent"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "var(--rpg-fg)", fontSize: 10 }}
              stroke="rgba(251,191,36,.25)"
            />
            <Tooltip
              formatter={(v) => [`${v}`, "Score"]}
              contentStyle={{
                background: "rgba(17,24,39,.9)",
                border: "1px solid rgba(251,191,36,.35)",
                borderRadius: "12px",
                color: "#fefce8",
              }}
            />
            <Radar
              dataKey="value"
              fill="rgba(251, 191, 36, .65)"
              stroke="rgba(120, 53, 15, .8)"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="rpg-grid mt-3">
        {stats.map((s) => (
          <div key={s.key} className="rpg-item">
            <span className="rpg-item-key">{s.label}</span>
            <span className="rpg-item-val">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

