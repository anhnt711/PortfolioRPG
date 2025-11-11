import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SKILL_COLUMNS } from "@data/roadmap";
import SkillColumn from "./SkillColumn";
import SkillDetailsPanel from "./SkillDetailsPanel";

export default function SkillTree() {
  // flatten map for quick lookup (id -> node)
  const nodeMap = useMemo(() => {
    const map = new Map();
    SKILL_COLUMNS.forEach((col) => {
      col.nodes.forEach((n) => map.set(n.id, n));
    });
    return map;
  }, []);

  const canUnlock = useCallback(
    (depId) => {
      const dep = nodeMap.get(depId);
      if (!dep) return false;
      return dep.level >= dep.maxLevel;
    },
    [nodeMap]
  );

  const [selected, setSelected] = useState(null);

  return (
    <section className="w-full">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: columns area */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-8 rounded-2xl border border-stone-700/70 bg-stone-950/60 p-4"
        >
          <div className="text-sm text-stone-400 px-1 pb-2">
            Skill Trees
          </div>

          {/* horizontal scroll of columns */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 min-h-[460px]">
              {SKILL_COLUMNS.map((col) => (
                <SkillColumn
                  key={col.id}
                  title={col.title}
                  tint={col.tint}
                  nodes={col.nodes}
                  selectedId={selected?.id}
                  onSelect={setSelected}
                  canUnlock={canUnlock}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: details panel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-4"
        >
          <SkillDetailsPanel node={selected} />
        </motion.div>
      </div>
    </section>
  );
}
