import { useMemo } from "react";
import logoBaldur from "../assets/logo-bg3-small.png";

export default function Header({ activeId, onSelect, onHome }) {
  const sections = useMemo(
    () => [
      { id: "intro", label: "INFORMATION" },
      { id: "skills", label: "SKILLS TREE" },
      // { id: "projects", label: "PROJECTS" },
      { id: "contact", label: "CONTACT" },
    ],
    []
  );

  return (
    <header className="site-header fixed top-0 inset-x-0 z-30">
      <div className="relative flex items-center px-6 lg:px-10 py-3">
        <button
          onClick={() => {
            if (onHome) {
              onHome();
              return;
            }
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="shrink-0"
          aria-label="Back to top"
        >
          <img src={logoBaldur} alt="Logo" className="h-28 w-auto object-contain" />
        </button>

        <div className="flex-1" />
        <nav className="flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wide text-amber-100">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect ? onSelect(s.id) : document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`uppercase transition ${activeId === s.id ? "text-amber-200" : "hover:text-amber-300"}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
