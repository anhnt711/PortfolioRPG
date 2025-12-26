import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Swords, Scroll, Medal, Sparkles, Gauge, Quote, Code2, TerminalSquare, Bug } from "lucide-react";
import { tiers } from "@data/stats";
import { CG_COLORS } from "@data/codingame";
import codingameLogoUrl from "@assets/codingame-logo.png";

function tierKey(t = "") {
  return t.trim().toLowerCase();
}

export default function Hero({
  name,
  status,
  avatarUrl,
  rankScore,
  flow,
  alignment,
  personal_motto,
  classToken = "Software Developer",
  leader = true,
  Engname = "Noah",
  crest = "terminal",
  codingame = { tier: "Disciple", points: 7923, label: "Global Rank" },
}) {
  const CrestIcon = {
    code: Code2,
    terminal: TerminalSquare,
    bug: Bug,
    swords: Swords,
  }[crest] || Code2;

  const key = tierKey(codingame?.tier || "unranked");
  const rankAccent = codingame?.color || CG_COLORS[key] || CG_COLORS.unranked;
  const rankSep = `linear-gradient(90deg, ${rankAccent}33, rgba(255,255,255,.06))`;

  const currentTier = tiers.find((t) => rankScore >= t.min && rankScore <= t.max) || tiers[0];
  const currentIdx = Math.max(0, tiers.indexOf(currentTier));
  const nextTier = tiers[Math.min(currentIdx + 1, tiers.length - 1)];

  const tierSpan = currentTier.max - currentTier.min || 1;
  const progressWithinTier = Math.round(((rankScore - currentTier.min) / tierSpan) * 100);
  const flowPct = Math.max(0, Math.min(100, Math.round(flow)));

  const tickerMessages = useMemo(
    () => [
      { label: "Quest chính", value: "Ship Snake Game: polish input & speed scaling", icon: Swords },
      { label: "Đang luyện", value: "Framer Motion choreography cho portfolio RPG", icon: Sparkles },
      { label: "Học", value: "Game loop + render budget / canvas tối ưu", icon: Scroll },
    ],
    []
  );

  const [tickerIdx, setTickerIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTickerIdx((i) => (i + 1) % tickerMessages.length), 3600);
    return () => clearInterval(id);
  }, [tickerMessages.length]);

  const buffs = [
    { label: "+2 Focus", desc: "Deep work 9-11h", tone: "good" },
    { label: "+1 Stability", desc: "CI + preview deploys", tone: "good" },
    { label: "-1 Mana", desc: "Cà phê đã hết", tone: "warn" },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rpg-aside"
    >
      <div className="rpg-card rpg-panel space-y-5">
        <h2 className="rpg-h2">Champion</h2>

        {/* Identity block */}
        <header className="rpg-header">
          <div className="rpg-header-row gap-5">
            <div className="rpg-shield" role="img" aria-label={`${name} avatar badge`}>
              {leader && (
                <div className="rpg-ribbon">
                  <span>{currentTier.label}</span>
                </div>
              )}
              <div className="rpg-shield-frame">
                <div className="rpg-portrait-ring">
                  <img src={avatarUrl} alt={`${name} portrait`} className="rpg-portrait" />
                  <div className="rpg-shield-crest rpg-shield-crest--on-avatar" title={classToken}>
                    <CrestIcon size={14} />
                  </div>
                </div>
                <div className="rpg-shield-caption">
                  <div className="rpg-shield-name">{Engname}</div>
                  <div className="rpg-shield-role">{classToken}</div>
                </div>
              </div>
            </div>

            <div className="rpg-meta rpg-meta--compact space-y-3" style={{ "--rank-accent": rankAccent, "--rank-sep": rankSep }}>
              <div className="rpg-name-row">
                <Crown className="rpg-name-icon" />
                <h2 className="rpg-h2">{name}</h2>
              </div>
              <div className="rpg-status rpg-status--tight">
                <Scroll className="rpg-status-icon" />
                <span>{status}</span>
              </div>
              <div className="rpg-meta-sep" />
              <div className="flex items-center gap-2">
                <div className="rpg-rank-brand" aria-label="Rank source: CodinGame">
                  <img src={codingameLogoUrl} alt="CodinGame" className="rpg-rank-brand-logo" loading="lazy" decoding="async" />
                </div>
                <div className="rpg-rank">
                  <Medal className="rpg-rank-icon" />
                  <div className="rpg-rank-texts">
                    <div className="rpg-rank-line">
                      <strong className="rpg-rank-icon">
                        Rank: <label className="rpg-rank-tier">{codingame.tier || "Unranked"}</label>
                      </strong>
                      {codingame.points != null && <span className="rpg-rank-pts"> ({codingame.points.toLocaleString()} pts)</span>}
                    </div>
                    {codingame.label && <div className="rpg-rank-sub">{codingame.label}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Progression block */}
        <section className="rpg-section space-y-4">
          <div className="rpg-bar rpg-bar--hp">
            <div className="rpg-bar-top">
              <span className="rpg-bar-label">
                <Gauge className="rpg-bar-icon" /> Focus
              </span>
              <span className="rpg-bar-val">{flowPct}%</span>
            </div>
            <div className="rpg-progress">
              <div className="rpg-progress-fill" style={{ width: `${flowPct}%` }} />
            </div>
          </div>

          <div className="rpg-bar rpg-bar--xp">
            <div className="rpg-bar-top">
              <span className="rpg-bar-label">
                <Sparkles className="rpg-bar-icon" /> Rank: {currentTier.label}
              </span>
              <span className="rpg-bar-val">
                {currentTier.label === "Principal" ? "Top Tier" : `Next: ${nextTier.label} in ${100 - progressWithinTier}%`}
              </span>
            </div>
            <div className="rpg-progress rpg-progress--thick">
              <div className="rpg-progress-fill rpg-progress-fill--xp" style={{ width: `${progressWithinTier}%` }} />
            </div>
            <div className="rpg-bar-foot">
              <span>Score: {rankScore} / 100</span>
              <span>{progressWithinTier}%</span>
            </div>
          </div>
        </section>

        {/* Personality */}
        <div className="rpg-motto mt-2">
          <Quote className="rpg-motto-icon" />
          <em>{personal_motto}</em>
        </div>

        {/* Current buffs */}
        <div className="mt-4 space-y-4">
          <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900/70">
            <div className="flex items-center gap-2 border-b border-stone-700/70 px-3 py-2 text-xs uppercase tracking-wide text-stone-400">
              <Sparkles size={14} />
              Status Ticker
            </div>
            <div className="relative h-16 px-3 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tickerIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center gap-3"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10 text-amber-100">
                    {(() => {
                      const Icon = tickerMessages[tickerIdx].icon || Scroll;
                      return <Icon size={16} />;
                    })()}
                  </span>
                  <div className="space-y-0.5">
                    <div className="text-[13px] text-stone-400">{tickerMessages[tickerIdx].label}</div>
                    <div className="text-sm text-stone-100 leading-snug">{tickerMessages[tickerIdx].value}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {buffs.map((buff) => (
              <div
                key={buff.label}
                className={`rounded-md border px-3 py-3 text-sm shadow-sm ${
                  buff.tone === "warn"
                    ? "border-orange-500/60 bg-orange-500/10 text-orange-50"
                    : "border-emerald-500/50 bg-emerald-500/10 text-emerald-50"
                }`}
              >
                <div className="font-semibold leading-snug">{buff.label}</div>
                <div className="text-xs opacity-85 leading-snug">{buff.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
