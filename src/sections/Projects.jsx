import { useEffect, useMemo, useState } from "react";

// Nếu bạn đã có data riêng thì thay thế sampleQuests bằng import của bạn.
// Ví dụ: import { quests } from "@data/quests";

const TABS = [{ id: "main", label: "Main quests" }];

const RARITIES = ["All", "Epic", "Rare", "Common"];

const sampleQuests = [
  {
    id: "my-portfolio",
    type: "main",
    code: "MY",
    title: "My Portfolio",
    rarity: "Epic",
    summary: "RPG-style personal portfolio with day/night vibe.",
    description:
      "A cinematic portfolio interface inspired by RPG UI. Focused on clarity, micro-interactions, and a cohesive visual system across sections.",
    tags: ["React", "Tailwind", "Framer Motion"],
    meta: { role: "Solo", focus: "UI Craft", duration: "Ongoing" },
    links: { inspect: "#", recruit: "#" },
    cover: "/src/assets/portfolio-image.png",
  },
  {
    id: "snake-game",
    type: "main",
    code: "SN",
    title: "Snake game",
    rarity: "Rare",
    summary: "Retro snake built with vanilla JS and HTML5 Canvas.",
    description:
      "Get longer than the rest! In a world where food is scarce, only the longest snake survives. Move smart, slither ahead, and eat everything you can to be the best in our multiplayer snake game.",
    tags: ["Type Script", "Phaser"],
    meta: { role: "Team", focus: "Reconciliation • Collision", duration: "1–2 months" },
    links: { inspect: "#", recruit: "#" },
    cover: "/src/assets/snakegame-image.png",
  },
  {
    id: "daily-ui-tweak",
    type: "daily",
    code: "UI",
    title: "Daily UI Tweak",
    rarity: "Common",
    summary: "Small UI polish: spacing, hover, responsive fixes.",
    description:
      "Quick iteration to keep the UI consistent: typography rhythm, spacing scale, and small hover states aligned with the site visual system.",
    tags: ["CSS", "UI", "Refactor"],
    meta: { role: "Solo", focus: "Polish • Consistency", duration: "1–2 hours" },
    links: { inspect: "#", recruit: "#" },
    cover: "",
  },
];

function clampText(str = "", max = 80) {
  if (!str) return "";
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

export default function Project() {
  // Nếu có data thật: const quests = sampleQuests; -> thay bằng quests từ data của bạn
  const quests = sampleQuests;

  const [tab, setTab] = useState("main");
  const [rarity, setRarity] = useState("All");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return quests
      .filter((x) => x.type === tab)
      .filter((x) => (rarity === "All" ? true : x.rarity === rarity))
      .filter((x) => {
        if (!q) return true;
        const hay = `${x.title} ${x.summary} ${x.description} ${(x.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
  }, [quests, tab, rarity, query]);

  const activeQuest = useMemo(() => {
    return filtered.find((x) => x.id === activeId) || filtered[0] || null;
  }, [filtered, activeId]);

  // Auto-select first item when filter changes
  useEffect(() => {
    if (!filtered.length) {
      setActiveId(null);
      return;
    }
    if (!activeId || !filtered.some((x) => x.id === activeId)) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  return (
    <section className="qb-page" id="projects">
      <main className="mx-auto w-full max-w-[1440px] px-6 py-[clamp(32px,5vw,72px)]">

      <div className="qb-shell">
        <header className="qb-head">
          <div className="qb-title">
            <div className="qb-eyebrow">MILESTONE</div>
            <h2 className="qb-h2">Quest Boards</h2>
          </div>
        </header>

        <div className="qb-grid">
          {/* LEFT: LIST */}
          <aside className="qb-panel qb-left" aria-label="Quest list">
            <div className="qb-search">
              <span className="qb-searchIcon" aria-hidden="true">⌕</span>
              <input
                className="qb-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search quests"
              />
            </div>

            <div className="qb-filters" aria-label="Rarity filters">
              {RARITIES.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`qb-filter ${rarity === r ? "is-active" : ""}`}
                  onClick={() => setRarity(r)}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="qb-sectionLabel">QUEST LIST</div>

            <div className="qb-list" role="list">
              {filtered.length === 0 ? (
                <div className="qb-empty">
                  No quests found.
                </div>
              ) : (
                filtered.map((q) => {
                  const isActive = q.id === activeQuest?.id;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={`qb-item ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveId(q.id)}
                      role="listitem"
                    >
                      <div className="qb-itemTop">
                        <div className="qb-avatar" aria-hidden="true">
                          {q.code || q.title?.slice(0, 2)?.toUpperCase()}
                        </div>

                        <div className="qb-itemText">
                          <div className="qb-itemRow">
                            <div className="qb-itemTitle">{q.title}</div>
                            <span className={`qb-badge qb-${(q.rarity || "Common").toLowerCase()}`}>
                              {q.rarity}
                            </span>
                          </div>
                          <div className="qb-itemSub">{clampText(q.summary, 90)}</div>
                        </div>

                        <div className="qb-chevron" aria-hidden="true">›</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* RIGHT: DETAILS */}
          <main className="qb-panel qb-right" aria-label="Quest details">
            <div className="qb-sectionLabel">DETAILS</div>

            {!activeQuest ? (
              <div className="qb-empty qb-emptyRight">
                Select a quest to view details.
              </div>
            ) : (
              <>
                <div className="qb-detailHead">
                  <h3 className="qb-h3">{activeQuest.title}</h3>
                  <span className={`qb-badge qb-${(activeQuest.rarity || "Common").toLowerCase()}`}>
                    {activeQuest.rarity}
                  </span>
                </div>

                <div className="qb-cover">
                  {activeQuest.cover ? (
                    <img className="qb-coverImg" src={activeQuest.cover} alt="" />
                  ) : (
                    <div className="qb-coverPh">
                      <span className="qb-coverIcon" aria-hidden="true">▦</span>
                      <div className="qb-coverText">Cover preview</div>
                    </div>
                  )}
                </div>

                <p className="qb-desc">{activeQuest.description}</p>

                <div className="qb-tags" aria-label="Tech tags">
                  {(activeQuest.tags || []).map((t) => (
                    <span key={t} className="qb-chip">{t}</span>
                  ))}
                </div>

                {/* Quest Log removed — replace with compact meta row */}
                <div className="qb-meta" aria-label="Quest meta">
                  <div className="qb-metaItem">
                    <div className="qb-metaKey">Role</div>
                    <div className="qb-metaVal">{activeQuest.meta?.role || "—"}</div>
                  </div>
                  <div className="qb-metaItem">
                    <div className="qb-metaKey">Focus</div>
                    <div className="qb-metaVal">{activeQuest.meta?.focus || "—"}</div>
                  </div>
                  <div className="qb-metaItem">
                    <div className="qb-metaKey">Duration</div>
                    <div className="qb-metaVal">{activeQuest.meta?.duration || "—"}</div>
                  </div>
                </div>

              </>
            )}
          </main>
        </div>
      </div>
      </main>
    </section>
  );
}
