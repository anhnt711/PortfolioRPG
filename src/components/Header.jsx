import { useEffect, useMemo, useState } from "react";
import logoBaldur from "../assets/logo-bg3-small.png";

export default function Header({ activeId, onSelect, onHome }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "intro", label: "INFORMATION" },
      { id: "skills", label: "SKILLS TREE" },
      { id: "projects", label: "PROJECTS" },
      { id: "contact", label: "CONTACT" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = (id) => {
    setMenuOpen(false);
    if (onSelect) {
      onSelect(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="site-header fixed top-0 inset-x-0 z-30">
      <div className="relative flex items-center px-6 lg:px-10 py-3">
        <button
          onClick={() => {
            setMenuOpen(false);
            if (onHome) {
              onHome();
              return;
            }
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="shrink-0"
          aria-label="Back to top"
        >
          <img
            src={logoBaldur}
            alt="Logo"
            className={`w-auto object-contain transition-all duration-300 ease-out ${isScrolled ? "h-12" : "h-28"}`}
          />
        </button>

        <div className="flex-1" />
        {!isScrolled ? (
          <nav className="flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wide text-amber-100">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`uppercase transition ${activeId === s.id ? "text-amber-200" : "hover:text-amber-300"}`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        ) : (
          <div className="relative">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/30 bg-black/30 text-amber-100 hover:border-amber-300/60 transition-colors duration-200"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
                <path d="M1 1h16M1 6h16M1 11h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {menuOpen ? (
              <nav className="menu-pop absolute right-0 mt-3 w-44 rounded-xl border border-amber-200/20 bg-black/80 p-2 text-xs font-semibold tracking-wide text-amber-100 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s.id)}
                    className={`block w-full rounded-lg px-3 py-2 text-left uppercase transition hover:bg-white/5 ${
                      activeId === s.id ? "text-amber-200" : ""
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
}
