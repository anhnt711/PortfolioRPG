import htmlcssIcon from "@assets/skills/htmlcssIcon.svg"
import javascriptIcon from "@assets/skills/javascriptIcon.svg"
import reactIcon from "@assets/skills/reactIcon.svg"
import statemgmtIcon from "@assets/skills/statemgmtIcon.svg"
import noderuntimeIcon from "@assets/skills/noderuntimeIcon.svg"
import apidesignIcon from "@assets/skills/apidesignIcon.svg"
import socketIcon from "@assets/skills/socketIcon.svg"
import authIcon from "@assets/skills/authIcon.svg"
import gitflowIcon from "@assets/skills/gitflowIcon.svg"
import observabilityIcon from "@assets/skills/observabilityIcon.svg"
import cicdIcon from "@assets/skills/cicdIcon.svg"
import dockerIcon from "@assets/skills/dockerIcon.svg"
import eslintIcon from "@assets/skills/eslintIcon.svg"
import sonarIcon from "@assets/skills/sonarIcon.svg"
import testIcon from "@assets/skills/testIcon.svg"
import dsIcon from "@assets/skills/dsIcon.png"
import networkIcon from "@assets/skills/networkIcon.svg"
import securityIcon from "@assets/skills/securityIcon.svg"

import htmlcssCover from "@assets/skills/htmlcssCover.jpg"
import javascriptCover from "@assets/skills/javascriptCover.png"
import reactCover from "@assets/skills/reactCover.jpg"
import statemgmtCover from "@assets/skills/statemgmtCover.png"
import uicraftCover from "@assets/skills/uicraftCover.jpg"

export const SKILL_COLUMNS = [
  {
    id: "frontend",
    title: "FRONTEND",
    tint: "from-rose-900/50 to-rose-800/30",
    nodes: [
      {
        id: "html-css",
        name: "HTML & CSS",
        maxLevel: 3,
        level: 3,
        desc:
          "Semantic HTML, BEM, modern layout (Flex/Grid), responsive & accessibility basics.",
        icon: htmlcssIcon,
        cover: htmlcssCover,
      },
      {
        id: "js-core",
        name: "JavaScript Core",
        maxLevel: 3,
        level: 3,
        lockedBy: "html-css",
        desc:
          "Scope/closures, async, modules, DOM API, performance patterns.",
        icon: javascriptIcon,
        cover: javascriptCover
      },
      {
        id: "react",
        name: "React",
        maxLevel: 3,
        level: 3,
        lockedBy: "js-core",
        desc:
          "Hooks, context, suspense patterns, rendering performance.",
        icon: reactIcon,
        cover: reactCover
      },
      {
        id: "state-mgmt",
        name: "State Management",
        maxLevel: 2,
        level: 1,
        lockedBy: "react",
        desc: "Zustand/Redux patterns, server cache vs UI state.",
        icon: statemgmtIcon,
        cover: statemgmtCover
      },
      {
        id: "ui-craft",
        name: "UI Craft",
        maxLevel: 2,
        level: 0,
        lockedBy: "state-mgmt",
        desc: "Design tokens, motion, accessibility, component APIs.",
        // icon: statemgmtIcon,
        cover: uicraftCover
      },
    ],
  },
  {
    id: "backend",
    title: "BACKEND",
    tint: "from-sky-900/50 to-sky-800/30",
    nodes: [
      {
        id: "node-runtime",
        name: "Node Runtime",
        maxLevel: 2,
        level: 2,
        desc: "Event loop, streams, cluster, workers.",
        icon: noderuntimeIcon,

      },
      {
        id: "api-design",
        name: "API Design",
        maxLevel: 3,
        level: 2,
        lockedBy: "node-runtime",
        desc: "REST semantics, errors, pagination, caching headers.",
        icon: apidesignIcon,

      },
      {
        id: "realtime",
        name: "Realtime",
        maxLevel: 2,
        level: 0,
        lockedBy: "api-design",
        desc: "Socket.io/phaser server ticks, reconciliation basics.",
        icon: socketIcon,

      },
      {
        id: "authz-authn",
        name: "AuthN/Z",
        maxLevel: 2,
        level: 1,
        lockedBy: "realtime",
        desc: "Sessions/JWT, RBAC, CSRF, rate limits.",
        icon: authIcon,

      },
    ],
  },
  {
    id: "devops",
    title: "DEVOPS",
    tint: "from-emerald-900/50 to-emerald-800/30",
    nodes: [
      {
        id: "git-flow",
        name: "Git & Flow",
        maxLevel: 2,
        level: 0,
        desc: "Branching, PR hygiene, rebase, release/hotfix.",
        icon: gitflowIcon,

      },
      {
        id: "docker",
        name: "Docker",
        maxLevel: 3,
        level: 1,
        lockedBy: "git-flow",
        desc: "Images, multi-stage, Compose, caching, slim builds.",
        icon: dockerIcon,

      },
      {
        id: "ci-cd",
        name: "CI/CD",
        maxLevel: 3,
        level: 0,
        lockedBy: "docker",
        desc: "Vercel/GitHub Actions pipelines, previews, checks.",
        icon: cicdIcon,

      },
      {
        id: "observability",
        name: "Observability",
        maxLevel: 3,
        level: 0,
        lockedBy: "ci-cd",
        desc: "Logs, metrics, tracing, healthchecks.",
        icon: observabilityIcon,

      },
    ],
  },
  {
    id: "quality",
    title: "QUALITY",
    tint: "from-amber-900/50 to-amber-800/30",
    nodes: [
      {
        id: "eslint",
        name: "ESLint",
        maxLevel: 2,
        level: 2,
        desc: "Flat config, types-aware rules, CI enforcement.",
        icon: eslintIcon,

      },
      {
        id: "sonar",
        name: "SonarQube",
        maxLevel: 2,
        level: 1,
        lockedBy: "tests",
        desc: "Quality Gates, code smells, hotspots & SAST basics.",
        icon: sonarIcon,

      },
      {
        id: "tests",
        name: "Testing",
        maxLevel: 3,
        level: 0,
        lockedBy: "eslint",
        desc: "Jest, coverage, integration vs unit, contract tests.",
        icon: testIcon,

      },
    ],
  },
  {
    id: "fundamentals",
    title: "CS FUNDAMENTALS",
    tint: "from-stone-900/50 to-stone-800/30",
    nodes: [
      {
        id: "ds-algo",
        name: "DS & Algos",
        maxLevel: 3,
        level: 0,
        desc: "Arrays, graphs, complexity, patterns.",
        icon: dsIcon,

      },
      {
        id: "networks",
        name: "Networks",
        maxLevel: 2,
        level: 1,
        lockedBy: "ds-algo",
        desc: "TCP/UDP, TLS, HTTP lifecycle, caching.",
        icon: networkIcon,

      },
      {
        id: "security",
        name: "Security",
        maxLevel: 2,
        level: 1,
        lockedBy: "networks",
        desc: "OWASP basics, input validation, secrets handling.",
        icon: securityIcon,

      },
    ],
  },
];
