import { useEffect } from "react";
import logoBaldur from "../assets/logo-bg3-small.png";

const cards = [
  {
    key: "1",
    title: "Character Intro",
    description: "See stats, backstory & current quest.",
    icon: "🧙",
    href: "#intro",
  },
  {
    key: "2",
    title: "Quest Log",
    description: "Browse missions I've completed (projects).",
    icon: "📜",
    href: "#projects",
  },
  {
    key: "3",
    title: "Skill Constellation",
    description: "Explore technical skills as a star map.",
    icon: "✨",
    href: "#skills",
  },
  {
    key: "4",
    title: "Journey & Tools",
    description: "Follow my journey and see my toolkit.",
    icon: "🎒",
    href: "#inventory",
  },
];

export default function QuestHub({ onNavigate }) {
  const handleNavigation = (href) => {
    if (onNavigate) {
      onNavigate(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      const card = cards.find((c) => c.key === e.key);
      if (card) {
        e.preventDefault();
        handleNavigation(card.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#120c0a] via-[#130e1a] to-[#0c0a0f] text-amber-100 flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(251,191,36,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.08),transparent_45%)]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-10 md:py-14 flex flex-col gap-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoBaldur} alt="Logo" className="h-10 w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" />
            <span className="text-sm text-amber-100/70">Quest Hub</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-100 ring-1 ring-white/10 hover:ring-amber-300/40 transition duration-200"
          >
            <span className="h-4 w-8 rounded-full bg-gradient-to-r from-stone-800 to-stone-700 relative">
              <span className="absolute left-1 top-0.5 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.15)] transition" />
            </span>
            Day / Night
          </button>
        </div>

        {/* Hero copy */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50">Choose Your Path</h1>
          <p className="text-amber-100/80 text-sm md:text-base">
            Where do you want to start your journey?
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.key}
              role="button"
              tabIndex={0}
              onClick={() => handleNavigation(card.href)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigation(card.href);
                }
              }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-5 shadow-[0_15px_45px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:ring-amber-300/50 hover:shadow-[0_18px_60px_rgba(251,191,36,0.25)] transition duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-200 bg-gradient-to-br from-amber-500/10 to-transparent" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-lg">
                    {card.icon}
                  </div>
                  <span className="text-xs text-amber-100/60">[{card.key}]</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-amber-50">{card.title}</h3>
                  <p className="text-sm text-amber-100/75">{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Hints + footer */}
        <div className="space-y-4 text-center">
          <div className="text-xs text-amber-100/70">
            Press <span className="px-2 py-0.5 rounded bg-white/5 text-amber-50">1</span>{" "}
            <span className="px-2 py-0.5 rounded bg-white/5 text-amber-50">2</span>{" "}
            <span className="px-2 py-0.5 rounded bg-white/5 text-amber-50">3</span>{" "}
            <span className="px-2 py-0.5 rounded bg-white/5 text-amber-50">4</span> or click a card to enter.
          </div>
          <div className="text-[11px] text-amber-100/60">
            © Nguyen Tien Anh – Code Disciple
          </div>
        </div>
      </div>
    </section>
  );
}
