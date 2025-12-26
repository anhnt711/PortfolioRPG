import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quests } from "@data/quests";

const tabs = [
  { id: "main", label: "Main quest" },
  { id: "daily", label: "Daily quest" },
];

const rarityStyles = {
  Epic: "border-amber-400/70 bg-amber-500/10 text-amber-100",
  Rare: "border-blue-400/70 bg-blue-500/10 text-blue-100",
  Common: "border-stone-600/70 bg-stone-800/70 text-stone-200",
};

function QuestItem({ quest, active, onSelect }) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(quest)}
      className={`flex items-center gap-3 w-full rounded-full border px-3 py-2 text-sm transition
        ${active
          ? "border-amber-400/70 bg-amber-500/10 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]"
          : "border-stone-700/70 bg-stone-900/70 text-stone-200 hover:border-amber-400/50"}`}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-600/70 bg-stone-800/80 text-[11px] font-semibold">
        {quest.title.slice(0, 2)}
      </span>
      <div className="flex-1 text-left">
        <div>{quest.title}</div>
        {quest.rarity && (
          <span
            className={`mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${rarityStyles[quest.rarity] || rarityStyles.Common}`}
          >
            {quest.rarity}
          </span>
        )}
      </div>
    </motion.button>
  );
}

export default function Projects() {
  const [tab, setTab] = useState("main");
  const list = useMemo(() => quests[tab] ?? [], [tab]);
  const [picked, setPicked] = useState(list[0] ?? null);

  useEffect(() => {
    setPicked(list[0] ?? null);
  }, [list]);

  return (
    <section className="rounded-2xl border border-stone-700/70 bg-gradient-to-b from-stone-900/70 to-stone-950/80 p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-stone-400">Milestone</div>
          <div className="text-lg font-semibold text-stone-100">Quest Boards</div>
        </div>
        <div className="flex gap-2 text-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3 py-1 border transition
                ${tab === t.id
                  ? "border-amber-400/70 bg-amber-500/10 text-amber-100"
                  : "border-stone-700/70 bg-stone-900/80 text-stone-300 hover:border-amber-400/60"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.8fr_2fr] gap-4 md:gap-6 items-start">
        <div className="space-y-2">
          {list.length === 0 && (
            <div className="text-sm text-stone-400">No quests yet.</div>
          )}
          {list.map((q) => (
            <QuestItem
              key={q.id}
              quest={q}
              active={picked?.id === q.id}
              onSelect={setPicked}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-stone-700/70 bg-stone-900/70 p-5 space-y-3"
        >
          <div className="text-sm text-stone-400">Details</div>

          {picked ? (
            <>
              <div className="rounded-lg border border-dashed border-stone-600/70 bg-stone-950/60 p-3">
                {picked.thumbnail ? (
                  <img
                    src={picked.thumbnail}
                    alt={picked.title}
                    className="h-28 w-full rounded-md object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-28 place-items-center text-xs text-stone-500">
                    Thumbnail
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold text-stone-100 leading-snug">
                    {picked.title}
                  </div>
                  {picked.rarity && (
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${rarityStyles[picked.rarity] || rarityStyles.Common}`}
                    >
                      {picked.rarity}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-stone-200/90 leading-relaxed">
                  {picked.summary}
                </p>
                {picked.tech?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-stone-200">
                    {picked.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-stone-700/70 bg-stone-800/70 px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {picked.milestones?.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-wide text-stone-400 mb-1">
                      Quest log
                    </div>
                    <div className="space-y-2 border-l border-stone-700/70 pl-3">
                      {picked.milestones.map((m, idx) => (
                        <div key={idx} className="relative text-sm text-stone-200/90 leading-snug">
                          <span className="absolute -left-[9px] mt-1 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.2)]" />
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-sm text-stone-400">Select a quest to see details.</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
