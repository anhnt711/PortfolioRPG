import { motion } from "framer-motion";
import { Crown, Swords, Sparkles, Gauge, Quote, Scroll } from "lucide-react";
import { tiers } from "../data/stats"

export default function Hero({ name, title, status, avatarUrl, rankScore, flow, alignment, personal_motto, classToken}) {

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
            <div className="rpg-avatar-wrap">
              <img src={avatarUrl} alt={`${name} portrait`} className="rpg-avatar" />
              <div className="rpg-badge">
                <Swords className="rpg-badge-icon" />
                <span>{classToken}</span>
              </div>
            </div>

            <div className="rpg-meta">
              <div className="rpg-name-row">
                <Crown className="rpg-name-icon" />
                <h2 className="rpg-h2">{name}</h2>
              </div>
              <p className="rpg-subtitle">{title} • {alignment}</p>
              <div className="rpg-status">
                <Scroll className="rpg-status-icon" />
                <span>{status}</span>
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
