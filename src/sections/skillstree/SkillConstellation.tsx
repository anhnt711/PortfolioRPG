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
  relatedProject?: string;
};

const skills: SkillNode[] = [
  // Frontend
  { id: "html-css", label: "HTML & CSS", category: "Frontend", level: 5, status: "mastered", description: "Semantic HTML, modern layouts (Grid/Flex), responsive, accessibility basics.", relatedProject: "Portfolio RPG" },
  { id: "js-core", label: "JavaScript Core", category: "Frontend", level: 5, status: "mastered", description: "ESNext, async patterns, DOM performance, bundlers (Vite).", relatedProject: "Snake Game" },
  { id: "react", label: "React", category: "Frontend", level: 5, status: "mastered", description: "Hooks, context, suspense patterns, rendering performance tuning.", relatedProject: "Portfolio RPG" },
  { id: "motion", label: "Framer Motion", category: "Frontend", level: 4, status: "in-progress", description: "Micro-interactions, layout animations, accessibility-friendly motion." },
  { id: "state", label: "State Mgmt", category: "Frontend", level: 3, status: "in-progress", description: "Zustand/Redux patterns, server cache vs UI state, context scoping." },

  // Backend
  { id: "node", label: "Node.js", category: "Backend", level: 3, status: "in-progress", description: "Event loop, streams, workers, perf profiling basics." },
  { id: "api", label: "API Design", category: "Backend", level: 3, status: "in-progress", description: "REST semantics, pagination, error contracts, caching headers." },
  { id: "realtime", label: "Realtime", category: "Backend", level: 2, status: "planned", description: "Socket.io, server ticks, reconciliation basics." },
  { id: "auth", label: "AuthN/Z", category: "Backend", level: 2, status: "planned", description: "Sessions/JWT, RBAC, rate limits, CSRF." },

  // DevOps
  { id: "gitflow", label: "Git & Flow", category: "DevOps", level: 3, status: "in-progress", description: "Branching, PR hygiene, release/hotfix flows." },
  { id: "docker", label: "Docker", category: "DevOps", level: 3, status: "in-progress", description: "Images, multi-stage builds, caching, Compose." },
  { id: "ci", label: "CI/CD", category: "DevOps", level: 2, status: "planned", description: "GitHub Actions/Vercel pipelines, preview deploys, checks." },
  { id: "observability", label: "Observability", category: "DevOps", level: 2, status: "planned", description: "Logs, metrics, tracing, health checks." },

  // Quality
  { id: "eslint", label: "ESLint", category: "Quality", level: 4, status: "mastered", description: "Flat config, types-aware rules, CI enforcement." },
  { id: "tests", label: "Testing", category: "Quality", level: 3, status: "in-progress", description: "Jest, integration vs unit, contract tests, coverage discipline.", relatedProject: "Portfolio RPG CI" },
  { id: "security", label: "Security", category: "Quality", level: 2, status: "planned", description: "OWASP basics, input validation, secrets handling." },
  { id: "sonar", label: "SonarQube", category: "Quality", level: 2, status: "planned", description: "Quality gates, hotspots, SAST basics." },
];

type PositionedNode = SkillNode & {
  x: number;
  y: number;
  type: "center" | "domain" | "skill";
};

const domainAngles: Record<SkillNode["category"], number> = {
  Frontend: -60,
  Backend: 30,
  DevOps: 120,
  Quality: -150,
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
      type: "center",
      x: 500,
      y: 320,
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
      const angleBase = domainAngles[category as SkillNode["category"]] ?? 0;
      const domainRadius = 180;
      const rad = (angleBase * Math.PI) / 180;
      const domX = center.x + Math.cos(rad) * domainRadius;
      const domY = center.y + Math.sin(rad) * domainRadius;

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

      const step = 85;
      nodesList.forEach((n, idx) => {
        const dist = domainRadius + (idx + 1) * step;
        const x = center.x + Math.cos(rad) * dist;
        const y = center.y + Math.sin(rad) * dist;
        const pn: PositionedNode = { ...n, type: "skill", x, y };
        nodes.push(pn);
        lines.push([idx === 0 ? domainNode.id : nodesList[idx - 1].id, n.id]);
      });
    });

    return { positioned: nodes, edges: lines };
  }, []);

  const selectedNode = selected || (positioned.find((n) => n.type === "skill") ?? null);

  return (
    <section className="constellation">
      <div className="constellation__bg" />
      <div className="constellation__inner">
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
                className={`skill-node ${statusClass[n.status]} ${selected?.id === n.id ? "skill-node--active" : ""}`}
                style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
              >
                <div className="skill-node__label">{n.label}</div>
              </motion.button>
            ))}

            {hovered && (
              <div className="skill-tooltip" style={{ left: hovered.x + 12, top: hovered.y - 20 }}>
                <div className="skill-tooltip__title">{hovered.label}</div>
                <div className="skill-tooltip__meta">
                  {hovered.category} • Lv {hovered.level ?? 0}
                </div>
              </div>
            )}
          </div>

          <div className="constellation__panel">
            {selectedNode ? (
              <div className="panel">
                <div className="panel__header">
                  <div>
                    <div className="panel__eyebrow">{selectedNode.category}</div>
                    <div className="panel__title">{selectedNode.label}</div>
                  </div>
                  <div className={`panel__badge panel__badge--${selectedNode.status}`}>
                    {selectedNode.status}
                  </div>
                </div>
                <div className="panel__meta">
                  <span>Level: {selectedNode.level} / 5</span>
                </div>
                <p className="panel__desc">{selectedNode.description}</p>
                {selectedNode.relatedProject && (
                  <div className="panel__project">
                    Related project: <span>{selectedNode.relatedProject}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="panel panel--placeholder">Select a star to see skill details.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
