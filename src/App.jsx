import Header from "./components/Header";
import Section from "./components/Section";
import Introduction from "./sections/Introduction"; 
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import SkillsTree from "./sections/SkillsTree";

export default function App() {
  return (
    <div id="top" className="relative min-h-screen text-neutral-900">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-10">
        <Header />

        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: "url('/assets/bg-main.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-14">
          <Section id="info" title="Introduction" subline="skill & identity" variant="scroll" align="left">
            <Introduction />
          </Section>

          {/* <Section id="skills" title="Skills Tree">
            <SkillsTree />
          </Section> */}

          <Section id="projects" title="Projects">
            <Projects />
          </Section>

          <Section id="contact" title="Contact">
            <Contact />
          </Section>
        </main>
      </div>
    </div>
  );
}
