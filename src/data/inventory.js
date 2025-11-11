import docker from "../assets/tools/docker.svg";
import github from "../assets/tools/github.svg";
import node from "../assets/tools/node.svg";
import react from "../assets/tools/react.svg";
import vite from "../assets/tools/vite.svg";
import tailwind from "../assets/tools/tailwind.svg";
import sonar from "../assets/tools/sonarqube.svg";
import jest from "../assets/tools/jest.svg";
import vscode from "../assets/tools/vscode.svg";
import git from "../assets/tools/git.svg";

export const rarityStyle = {
  common:  "from-stone-800/70 to-stone-900/80 border-stone-600/60 ring-stone-400/20",
  rare:    "from-sky-900/60   to-stone-900/80 border-sky-600/60   ring-sky-400/30",
  epic:    "from-violet-900/60 to-stone-900/80 border-violet-600/60 ring-violet-400/30",
  legendary:"from-amber-900/60 to-stone-900/80 border-amber-600/60  ring-amber-400/30",
};

export const GOLD = {
  base: "#D4AF37",
  deep: "#B8860B",
  glow: "#FFE9A6",
};

export const tabs = ["All","Frontend","Backend","DevOps","VCS","Build","Quality","Testing","IDE"];

export const DATA = [
  { id:"docker",    name:"Docker",     type:"DevOps",   rarity:"legendary", level: 85, img:docker, desc:"Containerization • images • Compose • multi-stage builds",
    passives:["+Reproducibility","+Isolation"], mastered:true },
  { id:"github",    name:"GitHub",     type:"VCS",      rarity:"epic",      level: 82, img:github, desc:"PRs • Actions • Issues • Releases", passives:["+Collab","+CI"], mastered:true },
  { id:"node",      name:"Node.js",    type:"Backend",  rarity:"epic",      level: 80, img:node, desc:"APIs • Socket.io • Tooling", passives:["+Throughput"], mastered:true },
  { id:"react",     name:"React",      type:"Frontend", rarity:"epic",      level: 78, img:react, desc:"SPA • Hooks • State mgmt", passives:["+DX"], mastered:true },
  { id:"vite",      name:"Vite",       type:"Build",    rarity:"rare",      level: 76, img:vite, desc:"Dev server • Build • HMR", passives:["+Speed"], mastered:true },
  { id:"tailwind",  name:"Tailwind",   type:"Frontend", rarity:"rare",      level: 74, img:tailwind, desc:"Utility-first CSS • Design system", passives:["+Consistency"], mastered:true },
  { id:"sonar",     name:"SonarQube",  type:"Quality",  rarity:"rare",      level: 73, img:sonar, desc:"Static analysis • Quality Gates", passives:["+Safety","+Clean Code"], mastered:true },
  { id:"jest",      name:"Jest",       type:"Testing",  rarity:"rare",      level: 71, img:jest, desc:"Unit tests • Coverage • Watch", passives:["+Confidence"], mastered:true },
  { id:"vscode",    name:"VSCode",     type:"IDE",      rarity:"common",    level: 88, img:vscode, desc:"Editor • Debugger • Extensions", passives:["+Velocity"], mastered:true },
  { id:"git",       name:"Git",        type:"VCS",      rarity:"legendary", level: 90, img:git, desc:"Branching • Rebase • Cherry-pick", passives:["+Control"], mastered:true },
];
