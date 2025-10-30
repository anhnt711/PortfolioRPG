import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// khung màu "rarity" kiểu RPG
const rarityStyle = {
  common:  "from-stone-800/70 to-stone-900/80 border-stone-600/60 ring-stone-400/20",
  rare:    "from-sky-900/60   to-stone-900/80 border-sky-600/60   ring-sky-400/30",
  epic:    "from-violet-900/60 to-stone-900/80 border-violet-600/60 ring-violet-400/30",
  legendary:"from-amber-900/60 to-stone-900/80 border-amber-600/60  ring-amber-400/30",
};

// gold palette đồng bộ (dùng cho viền đinh tán…)
const GOLD = {
  base: "#D4AF37",
  deep: "#B8860B",
  glow: "#FFE9A6",
};

const DATA = [
  { id:"docker",    name:"Docker",     type:"DevOps",   rarity:"legendary", level: 85, img:"/src/assets/tools/docker.svg",
    desc:"Containerization • images • Compose • multi-stage builds",
    passives:["+Reproducibility","+Isolation"], mastered:true },
  { id:"github",    name:"GitHub",     type:"VCS",      rarity:"epic",      level: 82, img:"/src/assets/tools/github.svg",
    desc:"PRs • Actions • Issues • Releases", passives:["+Collab","+CI"], mastered:true },
  { id:"node",      name:"Node.js",    type:"Backend",  rarity:"epic",      level: 80, img:"/src/assets/tools/node.svg",
    desc:"APIs • Socket.io • Tooling", passives:["+Throughput"], mastered:true },
  { id:"react",     name:"React",      type:"Frontend", rarity:"epic",      level: 78, img:"/src/assets/tools/react.svg",
    desc:"SPA • Hooks • State mgmt", passives:["+DX"], mastered:true },
  { id:"vite",      name:"Vite",       type:"Build",    rarity:"rare",      level: 76, img:"/src/assets/tools/vite.svg",
    desc:"Dev server • Build • HMR", passives:["+Speed"], mastered:true },
  { id:"tailwind",  name:"Tailwind",   type:"Frontend", rarity:"rare",      level: 74, img:"/src/assets/tools/tailwind.svg",
    desc:"Utility-first CSS • Design system", passives:["+Consistency"], mastered:true },
  { id:"sonar",     name:"SonarQube",  type:"Quality",  rarity:"rare",      level: 73, img:"/src/assets/tools/sonarqube.svg",
    desc:"Static analysis • Quality Gates", passives:["+Safety","+Clean Code"], mastered:true },
  { id:"jest",      name:"Jest",       type:"Testing",  rarity:"rare",      level: 71, img:"/src/assets/tools/jest.svg",
    desc:"Unit tests • Coverage • Watch", passives:["+Confidence"], mastered:true },
  { id:"vscode",    name:"VSCode",     type:"IDE",      rarity:"common",    level: 88, img:"/src/assets/tools/vscode.svg",
    desc:"Editor • Debugger • Extensions", passives:["+Velocity"], mastered:true },
  { id:"git",       name:"Git",        type:"VCS",      rarity:"legendary", level: 90, img:"/src/assets/tools/git.svg",
    desc:"Branching • Rebase • Cherry-pick", passives:["+Control"], mastered:true },
];

const tabs = ["All","Frontend","Backend","DevOps","VCS","Build","Quality","Testing","IDE"];

function Slot({ item, selected, onSelect }) {
  const frame =
    "relative aspect-square rounded-2xl p-1 ring-1 border backdrop-blur-md " +
    `bg-gradient-to-b ${rarityStyle[item.rarity]} ` +
    (selected ? "outline outline-2 outline-amber-400/70" : "");
  return (
    <button onClick={() => onSelect(item)} className="group">
      <motion.div whileHover={{ y:-3, scale:1.02 }} className={frame}>
        {/* viền đinh tán */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
             style={{ boxShadow:`inset 0 0 0 2px ${GOLD.base}33, 0 0 12px ${GOLD.glow}22` }}/>
        {/* ảnh */}
        <div className="h-full w-full rounded-xl bg-stone-900/40 overflow-hidden flex items-center justify-center">
          <img src={item.img} alt={item.name} className="h-4/5 w-4/5 object-contain drop-shadow" />
        </div>
        {/* nhãn tên */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[11px] font-semibold
                        bg-stone-900/80 text-amber-200 border border-amber-600/40 shadow">
          {item.name}
        </div>
      </motion.div>
    </button>
  );
}

export default function Inventory() {
  const [tab, setTab] = useState("All");
  const [picked, setPicked] = useState(DATA[0]);

  const list = useMemo(() => {
    if (tab === "All") return DATA;
    return DATA.filter(d => d.type === tab || (tab==="Frontend" && d.type==="Frontend"));
  }, [tab]);

  return (
    <section id="inventory" className="relative">
      {/* Header */}
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-6">
          {/* Lưới item */}
          <div className="rounded-3xl border border-amber-700/40 bg-stone-900/40 backdrop-blur-md p-4
                          shadow-[inset_0_0_0_2px_rgba(212,175,55,0.25)]">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map(t => (
                <button key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-full text-sm border
                    ${tab===t
                      ? "bg-amber-800/40 border-amber-500/60 text-amber-100"
                      : "bg-stone-800/40 border-stone-600/60 text-stone-200 hover:border-amber-500/40"}`}
                >
                  {t}
                </button>
              ))}
            </div>

           <div className="relative" style={{ height: 'calc((7.25rem * 2) + 1.25rem)' }}>
              <div className="h-full overflow-y-auto pr-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {list.map((item, idx) => (
                    <Slot key={`${item.id}-${idx}`} item={item} selected={picked?.id===item.id} onSelect={setPicked} />
                  ))}
                </div>
              </div>
            </div>


            {/* footer RPG */}
            <div className="mt-4 text-xs text-amber-200/70 italic flex justify-between">
              <span>Slots: {list.length} / 20</span>
              <span>Gold trim: {GOLD.base}</span>
            </div>
          </div>

          {/* Panel “Inspect” chi tiết */}
          <div className="rounded-3xl border border-amber-700/40 bg-gradient-to-b from-stone-900/50 to-stone-950/70
                          p-5 shadow-[inset_0_0_0_2px_rgba(212,175,55,0.25)]">
            <h3 className="text-xl font-bold text-amber-200 mb-3">Inspect</h3>
            <AnimatePresence mode="wait">
              {picked && (
                <motion.div key={picked.id}
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                  className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={picked.img} alt={picked.name} className="h-16 w-16 object-contain rounded-lg bg-stone-900/40 p-2 border border-amber-600/30" />
                    <div>
                      <div className="text-amber-100 font-semibold text-lg leading-tight">{picked.name}</div>
                      <div className="text-xs text-amber-200/70">{picked.type} • {picked.rarity.toUpperCase()}</div>
                    </div>
                  </div>

                  <p className="text-sm text-stone-200/90">{picked.desc}</p>

                  <div className="text-xs text-amber-200/80">
                    Passives:
                    <ul className="list-disc ml-5 mt-1">
                      {picked.passives.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs mb-1 text-amber-200/80">Mastery</div>
                    <div className="h-2 rounded-full bg-stone-700/60 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-700 to-amber-400" style={{ width:`${picked.level}%` }}/>
                    </div>
                    <div className="text-right text-xs text-amber-200/70 mt-1">{picked.level}%</div>
                  </div>

                  <div className="text-xs text-amber-300/80 italic">
                    Flavor: “Equipped for quests in Dev & Ops.”
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
