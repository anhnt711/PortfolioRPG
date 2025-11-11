import { useEffect, useMemo, useRef, useState } from "react";
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
    if (!list.length) return;
    const io = new IntersectionObserver(
      (ents) => {
        for (const e of ents) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      // khoảng nhìn: lấy giữa màn hình làm chuẩn
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
  const sections = useMemo(
    () => [
      { id: "info", label: "Information" },
      { id: "inventory", label: "Inventory" },
      { id: "skilltree", label: "Skills Tree" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const active = useActive(sections.map((s) => s.id));

  // trạng thái cuộn: dùng rAF để “throttle”
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setAtTop(window.scrollY < 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile drawer
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  // click outside để đóng drawer
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // nền mạ vàng (đổi độ trong suốt theo atTop)
  const headerBackground = atTop
    ? "linear-gradient(rgba(255,255,255,.78), rgba(255,255,255,.68)) padding-box, conic-gradient(from 0deg, var(--gold1), var(--gold2), var(--gold3), var(--gold2), var(--gold1)) border-box"
    : "linear-gradient(rgba(255,255,255,.90), rgba(255,255,255,.82)) padding-box, conic-gradient(from 0deg, var(--gold1), var(--gold2), var(--gold3), var(--gold2), var(--gold1)) border-box";

  return (
    <header className="sticky top-0 z-50">
      <div className="px-3 md:px-4 pt-2">
        <div
          className="relative header-frame"
          style={{ background: headerBackground }}
        >
          {/* tapestry hoa văn mờ + rivets 4 góc */}
          <div className="tapestry" />
          <span className="rivet tl" />
          <span className="rivet tr" />
          <span className="rivet bl" />
          <span className="rivet br" />

          <div className="max-w-6xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
            {/* logo + tên */}
            <button
              onClick={() =>
                document
                  .getElementById("top")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
            <nav
              className="hidden md:flex items-center gap-2"
              aria-label="Primary"
            >
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className={`pill ${isActive ? "pill-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
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
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>

          {/* Mobile drawer */}
          {open && (
            <div
              id="mobile-drawer"
              ref={drawerRef}
              className="md:hidden border-t border-black/10"
            >
              <div className="max-w-6xl mx-auto px-3 py-3 flex flex-wrap gap-2">
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        go(s.id);
                        setOpen(false);
                      }}
                      className={`pill ${isActive ? "pill-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {s.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    go("contact");
                    setOpen(false);
                  }}
                  className="pill-cta"
                >
                  Send Scroll
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
