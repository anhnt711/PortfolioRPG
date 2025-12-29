import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./SkillConstellation.css";

type SkillStatus = "mastered" | "in-progress" | "planned";

type SkillNode = {
  id: string;
  label: string;
  category: "Frontend" | "Backend" | "DevOps" | "Quality";
  level: number; // 0-5
  status: SkillStatus;
  description: string;
  details?: string[];
  relatedProject?: string;
};

const skills: SkillNode[] = [
  // Frontend
  { id: "html-css", label: "HTML & CSS", category: "Frontend", level: 5, status: "mastered", description: "Semantic HTML, modern layouts (Grid/Flex), responsive, accessibility basics.", details: ["Semantic markup", "Responsive layouts", "A11y basics"], relatedProject: "Portfolio RPG" },
  { id: "js-core", label: "JavaScript Core", category: "Frontend", level: 5, status: "mastered", description: "ESNext, async patterns, DOM performance, bundlers (Vite).", details: ["ESNext + async", "DOM performance", "Vite tooling"], relatedProject: "Snake Game" },
  { id: "react", label: "React", category: "Frontend", level: 5, status: "mastered", description: "Hooks, context, suspense patterns, rendering performance tuning.", details: ["Hooks + Context", "Suspense patterns", "Render tuning"], relatedProject: "Portfolio RPG" },
  { id: "motion", label: "Framer Motion", category: "Frontend", level: 4, status: "in-progress", description: "Micro-interactions, layout animations, accessibility-friendly motion.", details: ["Layout animations", "Motion presets", "A11y motion"] },
  { id: "state", label: "State Mgmt", category: "Frontend", level: 3, status: "in-progress", description: "Zustand/Redux patterns, server cache vs UI state, context scoping.", details: ["Zustand/Redux", "Server cache", "Context scope"] },

  // Backend
  { id: "node", label: "Node.js", category: "Backend", level: 3, status: "in-progress", description: "Event loop, streams, workers, perf profiling basics.", details: ["Event loop", "Streams", "Profiling"] },
  { id: "api", label: "API Design", category: "Backend", level: 3, status: "in-progress", description: "REST semantics, pagination, error contracts, caching headers.", details: ["REST semantics", "Pagination", "Caching headers"] },
  { id: "realtime", label: "Realtime", category: "Backend", level: 2, status: "planned", description: "Socket.io, server ticks, reconciliation basics.", details: ["Socket.io", "Server ticks", "Reconciliation"] },
  { id: "auth", label: "AuthN/Z", category: "Backend", level: 2, status: "planned", description: "Sessions/JWT, RBAC, rate limits, CSRF.", details: ["JWT/Sessions", "RBAC", "Rate limits"] },

  // DevOps
  { id: "gitflow", label: "Git & Flow", category: "DevOps", level: 3, status: "in-progress", description: "Branching, PR hygiene, release/hotfix flows.", details: ["Branching model", "PR hygiene", "Release flow"] },
  { id: "docker", label: "Docker", category: "DevOps", level: 3, status: "in-progress", description: "Images, multi-stage builds, caching, Compose.", details: ["Containerization", "Multi-stage builds", "CI pipelines"] },
  { id: "ci", label: "CI/CD", category: "DevOps", level: 2, status: "planned", description: "GitHub Actions/Vercel pipelines, preview deploys, checks.", details: ["Pipelines", "Preview deploys", "Checks"] },
  { id: "observability", label: "Observability", category: "DevOps", level: 2, status: "planned", description: "Logs, metrics, tracing, health checks.", details: ["Logs", "Metrics", "Tracing"] },

  // Quality
  { id: "eslint", label: "ESLint", category: "Quality", level: 4, status: "mastered", description: "Flat config, types-aware rules, CI enforcement.", details: ["Flat config", "Types-aware rules", "CI enforcement"] },
  { id: "tests", label: "Testing", category: "Quality", level: 3, status: "in-progress", description: "Jest, integration vs unit, contract tests, coverage discipline.", details: ["Unit vs integration", "Contract tests", "Coverage"], relatedProject: "Portfolio RPG CI" },
  { id: "security", label: "Security", category: "Quality", level: 2, status: "planned", description: "OWASP basics, input validation, secrets handling.", details: ["OWASP basics", "Validation", "Secrets"] },
  { id: "sonar", label: "SonarQube", category: "Quality", level: 2, status: "planned", description: "Quality gates, hotspots, SAST basics.", details: ["Quality gates", "Hotspots", "SAST basics"] },
];

type PositionedNode = SkillNode & {
  x: number;
  y: number;
  type: "center" | "domain" | "skill";
};

const domainPositions: Record<SkillNode["category"], { x: number; y: number }> = {
  Frontend: { x: 360, y: 380 },
  Backend: { x: 620, y: 300 },
  DevOps: { x: 760, y: 420 },
  Quality: { x: 240, y: 440 },
};

const statusClass: Record<SkillStatus, string> = {
  mastered: "skill-node--mastered",
  "in-progress": "skill-node--progress",
  planned: "skill-node--planned",
};

export default function SkillConstellation() {
  const [selected, setSelected] = useState<PositionedNode | null>(null);
  const [hovered, setHovered] = useState<PositionedNode | null>(null);

  const { positioned, edges } = useMemo(() => {
    const center: PositionedNode = {
      id: "me",
      label: "Nguyen Tien Anh",
      category: "Frontend",
      level: 5,
      status: "mastered",
      description: "Champion",
      details: ["Engineering core", "System thinking", "Product focus"],
      type: "center",
      x: 500,
      y: 240,
    };

    const nodes: PositionedNode[] = [center];
    const lines: Array<[string, string]> = [];

    const grouped = skills.reduce<Record<SkillNode["category"], SkillNode[]>>(
      (acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
      },
      { Frontend: [], Backend: [], DevOps: [], Quality: [] }
    );

    Object.entries(grouped).forEach(([category, nodesList]) => {
      const pos = domainPositions[category as SkillNode["category"]] || { x: center.x, y: center.y };
      const domX = pos.x;
      const domY = pos.y;
      const dirX = domX - center.x;
      const dirY = domY - center.y;
      const len = Math.hypot(dirX, dirY) || 1;
      const unitX = dirX / len;
      const unitY = dirY / len;

      const domainNode: PositionedNode = {
        id: `domain-${category}`,
        label: category,
        category: category as SkillNode["category"],
        level: 0,
        status: "in-progress",
        description: `${category} domain`,
        type: "domain",
        x: domX,
        y: domY,
      };
      nodes.push(domainNode);
      lines.push([center.id, domainNode.id]);

      const step = 72;
      nodesList.forEach((n, idx) => {
        const dist = (idx + 1) * step;
        const x = domX + unitX * dist;
        const y = domY + unitY * dist;
        const pn: PositionedNode = { ...n, type: "skill", x, y };
        nodes.push(pn);
        lines.push([idx === 0 ? domainNode.id : nodesList[idx - 1].id, n.id]);
      });
    });

    return { positioned: nodes, edges: lines };
  }, []);

  return (
    <section className="constellation">
      <div className="constellation__bg" />
      <div className="constellation__inner">
        <header className="constellation__header">
          <h2 className="constellation__title">SKILL TREE</h2>
          <div className="constellation__subtitle">
            <span className="constellation__rule" />
            <span>Constellation of Expertise</span>
            <span className="constellation__rule" />
          </div>
        </header>

        <div className="constellation__grid">
          <div className="constellation__map">
            <svg className="constellation__svg" viewBox="0 0 1000 640" aria-hidden>
              <defs>
                <radialGradient id="constGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(251,191,36,0.25)" />
                  <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#constGlow)" />
              {edges.map(([fromId, toId], idx) => {
                const from = positioned.find((n) => n.id === fromId);
                const to = positioned.find((n) => n.id === toId);
                if (!from || !to) return null;
                return (
                  <line
                    key={idx}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(255,229,173,0.5)"
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {positioned.map((n) => (
              <motion.button
                key={n.id}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(n)}
                whileHover={{ scale: 1.06 }}
                className={`skill-node skill-node--${n.type} ${statusClass[n.status]} ${selected?.id === n.id ? "skill-node--active" : ""}`}
                style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
              >
                <span className="skill-node__star" />
                <span className="skill-node__label">{n.label}</span>
              </motion.button>
            ))}

            {hovered && (
              <div className="skill-tooltip" style={{ left: hovered.x + 14, top: hovered.y - 28 }}>
                <div className="skill-tooltip__title">{hovered.label}</div>
                <div className="skill-tooltip__meta">
                  {hovered.category} • Lv {hovered.level ?? 0}
                </div>
                {hovered.details?.length ? (
                  <ul className="skill-tooltip__list">
                    {hovered.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <footer className="constellation__footer">
          <div className="constellation__axis">
            <span>QUALITY &amp; RELIABILITY</span>
            <span className="constellation__axis-dot" />
            <span>DELIVERY &amp; GROWTH</span>
          </div>
          <div className="constellation__hint">[ Hover node to inspect skill ]</div>
        </footer>
      </div>
    </section>
  );
}
