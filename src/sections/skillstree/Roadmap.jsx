import { useState } from "react";
import SkillColumn from "./SkillColumn";

const panel =
  "rounded-xl border border-amber-700/40 ring-1 ring-amber-200/10 p-4 bg-stone-950/60";

export default function Roadmap({ roadmap, onHoverSkill }) {
  const [columns, setColumns] = useState(roadmap.columns);

  const updateColumn = (updated) => {
    setColumns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  return (
    <section
      className="relative rounded-2xl border bg-gradient-to-b from-stone-900/70 to-stone-950/80 border-stone-700/60 ring-1 ring-amber-300/10 shadow-xl p-4 md:p-6 min-w-[760px]"
    >
      {/* Header roadmap */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold tracking-wide text-stone-200">
          {roadmap.title}
        </h3>
        <div className="text-xs text-stone-500">Skill Tree</div>
      </div>

      {/* Cột kỹ năng xếp ngang */}
      <div className="flex gap-8">
        {columns.map((col) => (
          <SkillColumn
            key={col.id}
            column={col}
            onChange={updateColumn}
            onHover={onHoverSkill}
          />
        ))}
      </div>

      {/* viền trang trí */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-amber-50/10" />
      <span className="pointer-events-none absolute inset-px rounded-2xl border border-black/40" />
    </section>
  );
}
