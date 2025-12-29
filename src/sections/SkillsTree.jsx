import React, { useMemo, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "UI craft, performance, and delightful interaction",
    skills: [
      { id: "html", name: "HTML", level: 4, desc: "Semantic markup, accessibility basics.", x: 14, y: 18, tags: ["a11y"] },
      { id: "css", name: "CSS", level: 4, desc: "Layouts, responsive UI, animations.", x: 86, y: 18, tags: ["layout"] },
      { id: "react", name: "React", level: 4, desc: "Component architecture, hooks, state patterns.", x: 50, y: 36, bullets: ["SPA / component design", "Reusable UI patterns"] },
      { id: "next", name: "Next.js", level: 3, desc: "Routing, SSR/SSG, app structure.", x: 32, y: 58, tags: ["SSR"] },
      { id: "tailwind", name: "Tailwind", level: 4, desc: "Utility-first styling system.", x: 68, y: 58, tags: ["UI"] },
      { id: "state", name: "Redux/Zustand", level: 3, desc: "State management, predictable flows.", x: 50, y: 78, tags: ["state"] },
    ],
    edges: [
      { from: "react", to: "html" },
      { from: "react", to: "css" },
      { from: "react", to: "next" },
      { from: "react", to: "tailwind" },
      { from: "react", to: "state" },
      { from: "next", to: "tailwind" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "APIs, data, reliability",
    skills: [
      { id: "node", name: "Node.js", level: 4, desc: "Runtime, async patterns, tooling.", x: 50, y: 26, tags: ["runtime"] },
      { id: "express", name: "Express", level: 3, desc: "Routing, middleware, REST building.", x: 24, y: 42, tags: ["API"] },
      { id: "rest", name: "REST APIs", level: 4, desc: "Resource design, pagination, auth.", x: 76, y: 42, tags: ["design"] },
      { id: "sql", name: "SQL", level: 3, desc: "Queries, joins, indexes basics.", x: 30, y: 68, tags: ["data"] },
      { id: "auth", name: "Auth/JWT", level: 3, desc: "Sessions, JWT, permissions.", x: 70, y: 68, tags: ["security"] },
      { id: "cache", name: "Redis/Cache", level: 2, desc: "Caching patterns, TTL, queue basics.", x: 50, y: 82, tags: ["perf"] },
    ],
    edges: [
      { from: "node", to: "express" },
      { from: "node", to: "rest" },
      { from: "express", to: "sql" },
      { from: "rest", to: "auth" },
      { from: "rest", to: "cache" },
      { from: "sql", to: "cache" },
    ],
  },
  {
    id: "qa",
    title: "QA Testing",
    subtitle: "Test strategy, automation, performance",
    skills: [
      { id: "postman", name: "Postman", level: 4, desc: "API testing, collections, environments.", x: 22, y: 32, tags: ["API"] },
      { id: "jmeter", name: "JMeter", level: 3, desc: "Load test plans, assertions, reports.", x: 50, y: 18, tags: ["perf"] },
      { id: "bug", name: "Bug Tracking", level: 4, desc: "Repro steps, triage, severity/priorities.", x: 50, y: 52, tags: ["process"] },
      { id: "jira", name: "Jira", level: 3, desc: "Boards, workflows, tickets clarity.", x: 78, y: 32, tags: ["agile"] },
      { id: "playwright", name: "Playwright", level: 3, desc: "E2E automation, reliable selectors.", x: 24, y: 74, tags: ["e2e"] },
      { id: "selenium", name: "Selenium", level: 2, desc: "Web automation fundamentals.", x: 76, y: 74, tags: ["e2e"] },
    ],
    edges: [
      { from: "bug", to: "postman" },
      { from: "bug", to: "jira" },
      { from: "bug", to: "jmeter" },
      { from: "bug", to: "playwright" },
      { from: "bug", to: "selenium" },
      { from: "jmeter", to: "postman" },
    ],
  },
  {
    id: "core",
    title: "Core & Tooling",
    subtitle: "Build, deploy, and review safely",
    spanAll: true,
    skills: [
      { id: "git", name: "Git", level: 4, desc: "Branching, reviews, conflict resolution.", x: 10, y: 52, tags: ["vc"] },
      { id: "gitflow", name: "GitFlow", level: 3, desc: "Release hygiene, branching strategy.", x: 22, y: 32, tags: ["process"] },
      { id: "docker", name: "Docker", level: 3, desc: "Containers, compose, local env parity.", x: 40, y: 54, tags: ["devops"] },
      { id: "cicd", name: "CI/CD", level: 3, desc: "Pipelines, quality gates, automation.", x: 60, y: 38, tags: ["automation"] },
      { id: "sonar", name: "SonarQube", level: 2, desc: "Code quality, rules, hotspots.", x: 70, y: 62, tags: ["quality"] },
      { id: "monitor", name: "Monitoring", level: 2, desc: "Logs/metrics basics, visibility.", x: 84, y: 48, tags: ["ops"] },
      { id: "soft", name: "Soft Skills", level: 4, desc: "Communication, clarity, ownership.", x: 92, y: 72, tags: ["team"] },
    ],
    edges: [
      { from: "git", to: "gitflow" },
      { from: "gitflow", to: "docker" },
      { from: "docker", to: "cicd" },
      { from: "cicd", to: "sonar" },
      { from: "sonar", to: "monitor" },
      { from: "monitor", to: "soft" },
      { from: "docker", to: "sonar" },
    ],
  },
];

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function levelToPercent(level) {
  return (level / 5) * 100;
}

function getSkillById(sections, id) {
  for (const sec of sections) {
    const hit = sec.skills.find((s) => s.id === id);
    if (hit) return hit;
  }
  return null;
}

/** ---------- Page ---------- */
export default function SkillTreePage() {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const selectedSkill = useMemo(() => {
    return selectedSkillId ? getSkillById(SECTIONS, selectedSkillId) : null;
  }, [selectedSkillId]);

  return (
    <div className="min-h-screen w-full text-[#f3e7c9]">
      <div className="pointer-events-none fixed inset-0 skilltree-vignette" />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14">
        <header className="mb-8">
          <p className="text-xs tracking-[0.35em] text-[#e6d2a3]/70">SKILLS TREE</p>
          <h1 className="mt-3 text-3xl md:text-4xl tracking-wide font-semibold">
            Constellation Skill Map
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-[#e6d2a3]/80">
            Hover to preview. Click a node to inspect details.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SECTIONS.map((sec) => (
            <ConstellationCard
              key={sec.id}
              section={sec}
              selectedSkillId={selectedSkillId}
              onSelectSkill={setSelectedSkillId}
            />
          ))}
        </div>

        <InspectPanel skill={selectedSkill} onClose={() => setSelectedSkillId(null)} />
      </main>
    </div>
  );
}

/** ---------- Constellation Card ---------- */
function ConstellationCard({ section, selectedSkillId, onSelectSkill }) {
  const cardRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const skillMap = useMemo(() => new Map(section.skills.map((s) => [s.id, s])), [section.skills]);

  const isEdgeActive = (e) => {
    if (!hoveredId && !selectedSkillId) return true;
    const focus = hoveredId ?? selectedSkillId;
    if (!focus) return true;
    return e.from === focus || e.to === focus;
  };

  const spanClass = section.spanAll ? "lg:col-span-3" : "";

  return (
    <section
      ref={cardRef}
      className={[
        "relative overflow-hidden rounded-2xl p-5 md:p-6",
        "skilltree-card",
        spanClass,
      ].join(" ")}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl tracking-wide font-semibold">{section.title}</h2>
            {section.subtitle ? (
              <p className="mt-1 text-xs md:text-sm text-[#e6d2a3]/75">{section.subtitle}</p>
            ) : null}
          </div>
          <div className="hidden md:block text-xs tracking-[0.25em] text-[#e6d2a3]/60">
            {section.skills.length} NODES
          </div>
        </div>

        <div className="relative mt-5 h-[320px] md:h-[340px]">
          {/* edges */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id={`gold-${section.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffefbf" stopOpacity="1" />
                <stop offset="1" stopColor="#f2b85e" stopOpacity="1" />
              </linearGradient>

              <filter id={`glow-${section.id}`}>
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="
                    1 0 0 0 0
                    0 0.75 0 0 0
                    0 0 0.25 0 0
                    0 0 0 1 0"
                  result="goldBlur"
                />
                <feMerge>
                  <feMergeNode in="goldBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {section.edges.map((e, i) => {
              const a = skillMap.get(e.from);
              const b = skillMap.get(e.to);
              if (!a || !b) return null;

              const active = isEdgeActive(e);

              return (
                <line
                  key={i}
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke={`url(#gold-${section.id})`}
                  strokeWidth={active ? 2 : 1.5}
                  opacity={active ? 0.85 : 0.18}
                  strokeLinecap="round"
                  className={active ? "skilltree-edge" : ""}
                  filter={active ? `url(#glow-${section.id})` : undefined}
                />
              );
            })}
          </svg>

          {/* nodes */}
          {section.skills.map((s) => (
            <SkillNode
              key={s.id}
              skill={s}
              selected={selectedSkillId === s.id}
              hovered={hoveredId === s.id}
              onEnter={(ev) => {
                setHoveredId(s.id);
                const rect = cardRef.current?.getBoundingClientRect();
                if (!rect) return;

                const x = clamp(ev.clientX - rect.left + 12, 16, rect.width - 260);
                const y = clamp(ev.clientY - rect.top + 12, 16, rect.height - 160);
                setTooltip({ id: s.id, x, y });
              }}
              onMove={(ev) => {
                if (!tooltip || tooltip.id !== s.id) return;
                const rect = cardRef.current?.getBoundingClientRect();
                if (!rect) return;

                const x = clamp(ev.clientX - rect.left + 12, 16, rect.width - 260);
                const y = clamp(ev.clientY - rect.top + 12, 16, rect.height - 160);
                setTooltip({ id: s.id, x, y });
              }}
              onLeave={() => {
                setHoveredId(null);
                setTooltip(null);
              }}
              onClick={() => onSelectSkill(s.id)}
            />
          ))}

          {/* tooltip */}
          {tooltip ? (
            <SkillTooltip
              skill={skillMap.get(tooltip.id)}
              style={{ left: tooltip.x, top: tooltip.y }}
            />
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full skilltree-flare" />
    </section>
  );
}

/** ---------- Skill Node ---------- */
function SkillNode({ skill, selected, hovered, onEnter, onMove, onLeave, onClick }) {
  const pct = levelToPercent(skill.level);

  return (
    <button
      type="button"
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2",
        "skilltree-node",
        selected ? "is-selected" : "",
        hovered ? "is-hovered" : "",
      ].join(" ")}
      style={{
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        "--p": `${pct}%`,
      }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={skill.name}
    >
      <span className="skilltree-node__ring" />
      <span className="skilltree-node__core">
        <span className="skilltree-node__label">{skill.name}</span>
      </span>
    </button>
  );
}

/** ---------- Tooltip ---------- */
function SkillTooltip({ skill, style }) {
  if (!skill) return null;

  return (
    <div className="skilltree-tooltip" style={style}>
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold tracking-wide">{skill.name}</div>
        <div className="text-xs text-[#e6d2a3]/70">Level {skill.level}/5</div>
      </div>
      <p className="mt-2 text-xs text-[#e6d2a3]/80 leading-relaxed">{skill.desc}</p>

      {skill.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {skill.tags.map((t) => (
            <span key={t} className="skilltree-tag">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function InspectPanel({ skill, onClose }) {
  return (
    <aside
      className={[
        "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]",
        "skilltree-inspect",
        skill ? "is-open" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#e6d2a3]/70">INSPECT</p>
          <h3 className="mt-2 text-lg font-semibold tracking-wide">
            {skill ? skill.name : "Select a skill"}
          </h3>
          {skill ? (
            <p className="mt-1 text-xs text-[#e6d2a3]/75">Level {skill.level}/5</p>
          ) : (
            <p className="mt-1 text-xs text-[#e6d2a3]/75">Click a node to open details.</p>
          )}
        </div>

        <button type="button" className="skilltree-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {skill ? (
        <>
          <p className="mt-3 text-sm text-[#e6d2a3]/85 leading-relaxed">{skill.desc}</p>

          {skill.bullets?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-[#e6d2a3]/80">
              {skill.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#f2b85e]/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex gap-3">
            <a href="#projects" className="skilltree-cta">
              View Projects
            </a>
            <a href="#contact" className="skilltree-cta ghost">
              Recruit
            </a>
          </div>
        </>
      ) : null}
    </aside>
  );
}
