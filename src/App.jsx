import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Introduction from "@sections/Introduction";
import Projects from "@sections/Projects";
import SkillsTree from "@sections/SkillsTree";
import Contact from "@sections/Contact";
import Begin from "./pages/Begin";

export default function App() {
  const [showHub, setShowHub] = useState(true);
  const originalBodyOverflow = useRef("");

  const handleHubNavigate = useCallback((href) => {
    setShowHub(false);
    requestAnimationFrame(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", href);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    if (!originalBodyOverflow.current) {
      originalBodyOverflow.current = document.body.style.overflow;
    }

    if (showHub) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow.current;
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow.current;
    };
  }, [showHub]);

  return (
    <div id="top" className="relative min-h-screen text-neutral-900">
      <div className="theme-overlay" aria-hidden />
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-10">
        {showHub ? (
          <Begin onNavigate={handleHubNavigate} />
        ) : (
          <>
            <Header onHome={() => setShowHub(true)} />

            <div className="fixed inset-0 -z-10" />

            <main className="mx-auto pb-20 space-y-14">
              <Section id="intro" classname="section-blend-intro px-0 py-0" maxWidthClass="max-w-none">
                <Introduction />
              </Section>

              <Section id="skills" classname="px-0 py-0" maxWidthClass="max-w-none">
                <SkillsTree />
              </Section>
{/* 
              <Section id="projects">
                <Projects />
              </Section> */}

              <Section id="contact">
                <Contact />
              </Section>
            </main>
          </>
        )}
      </div>
    </div>
  );
}
