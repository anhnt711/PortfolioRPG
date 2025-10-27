import { motion } from "framer-motion";
import RadarStats from "../components/RadarStats";
import SkillsTree from "../components/SkillsTree";
import InventoryBar from "../components/InventoryBar";
import QuestCard from "../components/QuestCard";
import { stats } from "../data/stats";
import { skills } from "../data/skills";
import { inventory } from "../data/inventory";
import { quests } from "../data/quests";
import { useRpgStore } from "../store/useRpgStore";

export default function Home() {
  const { activeQuestTab, setActiveQuestTab } = useRpgStore();
  const active = quests[activeQuestTab];

  return (
    <div className="grid gap-8">
      {/* Information */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 rounded-2xl p-5">
          <div className="h-28 w-24 bg-neutral-800 rounded-xl mb-3 flex items-center justify-center">AVATAR</div>
          <p>Name: Tien Anh</p>
          <p>Title: Trainee</p>
          <p>Level: 3/10 • Status: On Trial</p>
          <div className="mt-4">
            <h4 className="text-sm text-neutral-400 mb-2">Inventory</h4>
            <InventoryBar items={inventory} />
          </div>
        </div>
        <motion.div className="bg-neutral-900 rounded-2xl p-5"
          initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
          <RadarStats data={stats} />
        </motion.div>
      </section>

      {/* Skills Tree */}
      <section className="bg-neutral-900 rounded-2xl p-5">
        <h2 className="font-semibold mb-3">Skills Tree</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SkillsTree tree={skills} />
        </div>
      </section>

      {/* Milestone / Quests */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 rounded-2xl p-5">
          <div className="flex gap-3 mb-4">
            {["main","daily"].map(t=>(
              <button key={t}
                onClick={()=>setActiveQuestTab(t)}
                className={`px-3 py-1 rounded-xl text-sm ${activeQuestTab===t?"bg-neutral-800":"bg-neutral-900 border border-neutral-700"}`}>
                {t==="main"?"Main quest":"Daily quest"}
              </button>
            ))}
          </div>
          <button className="w-full bg-neutral-800 rounded-xl py-2">My Portfolio</button>
          <button className="w-full mt-3 border border-neutral-700 rounded-xl py-2">Snake game</button>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-5">
          <QuestCard q={active[0]} />
        </div>
      </section>

      {/* Join My Guide */}
      <section className="bg-neutral-900 rounded-2xl p-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Send a Quest Scroll</h2>
        <p className="text-neutral-400 mb-4">Got a mission, collaboration, or opportunity?</p>
        <a href="/contact" className="inline-block bg-neutral-800 rounded-xl px-4 py-2">Write your message</a>
      </section>
    </div>
  );
}
