import Header from "./components/Header";
import Section from "./components/Section";
import Introduction from "@sections/introduction/Introduction"; 
import Inventory from "@sections/inventory/Inventory"; 
import SkillsTree from "@sections/skillstree/SkillsTree";

// import bgBase from "@assets/bg/bg-base.jpg";
// import overlayCity from "@assets/bg/overlay1.jpg";
// import overlayForest from "@assets/bg/overlay-forest.jpg";
// import overlayPortal from "@assets/bg/overlay-portal.jpg";

export default function App() {
  return (
    <div id="top" className="relative min-h-screen text-neutral-900">
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-10">
        <Header />

        <div className="fixed inset-0 -z-10" />

        <main className="mx-auto pb-20 space-y-14">
          <Section id="info" title="Introduction" subline="skill & identity" variant="scroll" align="left" classname="section-blend-intro">
            <Introduction />
          </Section>

          <Section id="inventory" title="Inventory" subline="Tools & Utilities" variant="scroll" align="left">
            <Inventory />
          </Section>

          <Section id="skilltree" title="Skills-Tree" subline="Tools & Utilities" variant="scroll" align="left">
            <SkillsTree />
          </Section>

        </main>
      </div>
    </div>
  );
}
