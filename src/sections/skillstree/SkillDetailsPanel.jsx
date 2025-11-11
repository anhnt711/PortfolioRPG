export default function SkillDetailsPanel({ node }) {
  if (!node) {
    return (
      <aside className="h-full rounded-xl border border-stone-700/70 bg-stone-900/60 p-6">
        <div className="text-stone-400">Select a skill to see details.</div>
      </aside>
    );
  }

  const maxed = node.level >= node.maxLevel;

  return (
    <aside className="h-full rounded-xl border border-stone-700/70 bg-stone-900/60 p-6 space-y-4">
      
      <div className="text-stone-200 text-lg font-bold">{node.name}</div>
      {node.cover && (
        <div className="overflow-hidden rounded-lg border border-stone-700/70">
          <img
            src={node.cover}
            alt={node.name}
            className="w-full h-36 object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="text-sm text-stone-300/90 leading-relaxed">
        {node.desc}
      </div>

      <div className="text-xs uppercase tracking-wide text-stone-400">
        Level:{" "}
        <span className="font-semibold text-stone-100">
          {node.level}/{node.maxLevel}
        </span>
      </div>

      <div className="pt-2">
        {maxed ? (
          <span className="inline-flex items-center gap-2 text-amber-300 font-semibold">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Max level reached
          </span>
        ) : node.lockedBy ? (
          <span className="text-stone-400">
            Requires{" "}
            <span className="text-stone-200 font-semibold">
              {node.lockedBy}
            </span>{" "}
            at max level to unlock.
          </span>
        ) : (
          <span className="text-emerald-300">Unlocked</span>
        )}
      </div>
    </aside>
  );
}
