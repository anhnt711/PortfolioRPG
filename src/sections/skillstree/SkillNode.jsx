import { motion } from "framer-motion";

export default function SkillNode({
  name,
  level,
  maxLevel,
  locked,
  selected,
  onClick,
  icon,
}) {
  const ring =
    level >= maxLevel
      ? "ring-2 ring-amber-400/90 shadow-[0_0_24px_4px_rgba(251,191,36,0.35)]"
      : level > 0
      ? "ring-2 ring-emerald-400/80"
      : "ring-1 ring-stone-500/60";

  const base =
    "relative h-14 w-14 rounded-full grid place-items-center bg-stone-900/80 text-stone-200 border border-stone-700/70 backdrop-blur";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${base} ${ring} ${selected ? "outline outline-2 outline-sky-400/70" : ""}`}
      disabled={locked}
      title={locked ? "Locked" : name}
    >
      {/* icon placeholder — sau này bạn gắn SVG riêng */}
      <div className="text-[11px] leading-3 text-center px-1 font-semibold">
        {(
    <img
      src={/* nhận từ props */ icon}
      alt={name}
      className="h-7 w-7 object-contain pointer-events-none select-none"
      loading="lazy"
      aria-hidden="true"
    />
  )}
      </div>

      {/* level pill */}
      <div className="absolute -bottom-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-800/90 border border-stone-600">
        {level}/{maxLevel}
      </div>

      {/* lock overlay */}
      {locked && (
        <div className="absolute inset-0 grid place-items-center rounded-full bg-stone-900/70">
          <div className="text-[10px] opacity-80">LOCK</div>
        </div>
      )}
    </motion.button>
  );
}
