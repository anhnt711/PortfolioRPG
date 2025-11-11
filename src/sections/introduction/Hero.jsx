import { motion } from "framer-motion";
import { Crown, Swords, Scroll, Medal, Sparkles, Gauge, Quote, Code2, TerminalSquare, Bug } from "lucide-react";
import { tiers } from "@data/stats"
import { CG_COLORS } from "@data/codingame"
import  codingameLogoUrl  from "@assets/codingame-logo.png"

function tierKey(t="") {
  return t.trim().toLowerCase();            // "grand master" giữ khoảng trắng
}

export default function Hero({ 
  name, status, avatarUrl, rankScore, flow, alignment, personal_motto,
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

  const currentTier =
  tiers.find(t => rankScore >= t.min && rankScore <= t.max) || tiers[0];
  const currentIdx = Math.max(0, tiers.indexOf(currentTier));
  const nextTier = tiers[Math.min(currentIdx + 1, tiers.length - 1)];

  const tierSpan = currentTier.max - currentTier.min || 1;
  const progressWithinTier = Math.round(
    ((rankScore - currentTier.min) / tierSpan) * 100
  );

  const flowPct = Math.max(0, Math.min(100, Math.round(flow)));

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rpg-aside"
    >
      <div className="rpg-card rpg-panel">
        <h2 className="rpg-h2 mb-2">Champion</h2>

        <header className="rpg-header">
          <div className="rpg-header-row">
            <div className="rpg-shield" role="img" aria-label={`${name} avatar badge`}>
              {leader && (
                <div className="rpg-ribbon">
                  <span>{currentTier.label}</span>
                </div>
              )}

              <div className="rpg-shield-frame">
                {/* Vòng avatar */}
                <div className="rpg-portrait-ring">
                  <img src={avatarUrl} alt={`${name} portrait`} className="rpg-portrait" />

                  {/* Crest mới — góc dưới phải của avatar */}
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


            <div
              className="rpg-meta rpg-meta--compact"
              style={{ "--rank-accent": rankAccent, "--rank-sep": rankSep }}
            >
              {/* Name */}
              <div className="rpg-name-row">
                <Crown className="rpg-name-icon" />
                <h2 className="rpg-h2">{name}</h2>
              </div>

              {/* On Quest (icon cuộn trục) */}
              <div className="rpg-status rpg-status--tight">
                <Scroll className="rpg-status-icon" />
                <span>{status}</span>
              </div>

              {/* separator */}
              <div className="rpg-meta-sep" />

              <div className="rpg-rank-brand" aria-label="Rank source: CodinGame">
                <img
                  src={codingameLogoUrl}
                  alt="CodinGame"
                  className="rpg-rank-brand-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* CodinGame Rank */}
              <div className="rpg-rank">
                <Medal className="rpg-rank-icon" />
                <div className="rpg-rank-texts">
                  <div className="rpg-rank-line">
                    <strong className="rpg-rank-icon"> Rank: <label className="rpg-rank-tier">{codingame.tier || "Unranked"}</label></strong>
                    {codingame.points != null && (
                      <span className="rpg-rank-pts"> ({codingame.points.toLocaleString()} pts)</span>
                    )}
                  </div>
                  {codingame.label && <div className="rpg-rank-sub">{codingame.label}</div>}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="rpg-section">
          {/* FLOW (thay Vitality) */}
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

          {/* RANK (thay Level/XP) */}
          <div className="rpg-bar rpg-bar--xp">
            <div className="rpg-bar-top">
              <span className="rpg-bar-label">
                <Sparkles className="rpg-bar-icon" /> Rank: {currentTier.label}
              </span>
              <span className="rpg-bar-val">
                {currentTier.label === "Principal"
                  ? "Top Tier"
                  : `Next: ${nextTier.label} in ${100 - progressWithinTier}%`}
              </span>
            </div>
            <div className="rpg-progress rpg-progress--thick">
              <div
                className="rpg-progress-fill rpg-progress-fill--xp"
                style={{ width: `${progressWithinTier}%` }}
              />
            </div>
            <div className="rpg-bar-foot">
              <span>Score: {rankScore} / 100</span>
              <span>{progressWithinTier}%</span>
            </div>
          </div>

          <div className="rpg-motto">
            <Quote className="rpg-motto-icon" />
            <em>{ personal_motto }</em>
          </div>
        </section>
      </div>
    </motion.aside>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="rpg-chip">
      <span className="rpg-chip-key">{label}</span>
      <span className="rpg-chip-dot">·</span>
      <span className="rpg-chip-val">{value}</span>
    </div>
  );
}
