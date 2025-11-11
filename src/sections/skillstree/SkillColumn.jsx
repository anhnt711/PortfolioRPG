import SkillNode from "./SkillNode";

export default function SkillColumn({
  title,
  tint,
  nodes,
  selectedId,
  onSelect,
  canUnlock,
}) {
  return (
    <div
      className={`relative min-w-[160px] px-4 py-5 rounded-xl border border-stone-700/70 bg-gradient-to-b ${tint}`}
    >
      <div className="text-xs tracking-wider text-stone-300/90 font-bold mb-3">
        {title}
      </div>

      {/* vertical spine */}
      <div className="absolute left-1/2 top-12 bottom-6 -translate-x-1/2 w-[2px] bg-stone-600/50" />

      <ul className="space-y-7 relative z-[1]">
        {nodes.map((n, idx) => {
          const locked = !!n.lockedBy && !canUnlock(n.lockedBy);
          const isSelected = selectedId === n.id;

          return (
            <li key={n.id} className="grid place-items-center">
              <SkillNode
                name={n.name}
                level={n.level}
                maxLevel={n.maxLevel}
                locked={locked}
                selected={isSelected}
                onClick={() => onSelect(n)}
                icon={n.icon} 
              />

              {/* connector dot */}
              {idx < nodes.length - 1 && (
                <div className="h-6 w-[2px] bg-stone-600/50" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
