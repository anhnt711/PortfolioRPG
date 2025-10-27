import { useEffect, useMemo, useState } from "react";
import logoDevGame from "../assets/logo-devgame.png";
/* smooth scroll */
const go = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* active section by IntersectionObserver */
function useActive(ids) {
  const [active, setActive] = useState(ids?.[0] || "info");
  const list = useMemo(() => ids || [], [ids]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.6] }
    );
    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [list]);
  return active;
}

export default function Header() {
  const sections = [
    { id: "info", label: "Information" },
    { id: "skills", label: "Skills Tree" },
    { id: "quests", label: "Milestones" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  const active = useActive(sections.map((s) => s.id));

  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="px-3 md:px-4 pt-2">
        <div className="relative header-frame">
          {/* tapestry hoa văn mờ + rivets 4 góc */}
          <div className="tapestry" />
          <span className="rivet tl" /><span className="rivet tr" />
          <span className="rivet bl" /><span className="rivet br" />

          <div className="max-w-6xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
            {/* logo + tên */}
            <button
            onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3"
            aria-label="Back to top"
            >
            <div className="relative w-12 h-12">
                <img
                src={logoDevGame}
                alt="Dev RPG Logo"
                className="logo-glow w-full h-full object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
                />
            </div>
            <div className="leading-5 text-left">
                <div className="font-semibold text-slate-900 tracking-wide text-base">
                Tien Anh
                </div>
                <div className="text-[11px] text-slate-600/90">
                Dev & RPG Portfolio
                </div>
            </div>
            </button>

            {/* Nav Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className="pill"
                  >
                    {s.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 border border-black/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>

          {/* Mobile drawer */}
          {open && (
            <div className="md:hidden border-t border-black/10">
              <div className="max-w-6xl mx-auto px-3 py-3 flex flex-wrap gap-2">
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { go(s.id); setOpen(false); }}
                      className={`pill ${isActive ? "pill-active" : ""}`}
                    >
                      {s.label}
                    </button>
                  );
                })}
                <button onClick={() => { go("contact"); setOpen(false); }} className="pill-cta">
                  Send Scroll
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* khi cuộn xa, giảm độ trong cho dễ đọc (tùy chọn) */}
      <style>{`
        .header-frame { background: ${
          /* dùng 2 mức trong suốt tùy trạng thái cuộn */
          atTop
            ? "linear-gradient(rgba(255,255,255,.78), rgba(255,255,255,.68)) padding-box, conic-gradient(from 0deg, var(--gold1), var(--gold2), var(--gold3), var(--gold2), var(--gold1)) border-box"
            : "linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.82)) padding-box, conic-gradient(from 0deg, var(--gold1), var(--gold2), var(--gold3), var(--gold2), var(--gold1)) border-box"
        }; }
      `}</style>
    </header>
  );
}
