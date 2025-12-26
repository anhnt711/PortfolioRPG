export const quests = {
  main: [
    {
      id: "portfolio",
      title: "My Portfolio",
      summary:
        "Built an RPG-flavored developer hub with React + Vite, Tailwind, and Framer Motion. Crafted quest boards, an animated hero, and an interactive 3D armor viewer (model-viewer). Focused on UX polish, component composition, and fast build tooling.",
      rarity: "Epic",
      tech: ["React", "Vite", "Tailwind", "Framer Motion", "model-viewer"],
      milestones: [
        "Thiết kế layout kiểu bảng nhiệm vụ, tối ưu UX và copy.",
        "Thêm hero động + radar stats, tối ưu motion và load thời gian thực.",
        "Tích hợp model-viewer 3D và tối ưu build Vite/Tailwind.",
      ],
      thumbnail: "/thumbs/portfolio.png",
    },
    {
      id: "snake",
      title: "Snake game",
      summary:
        "Retro snake built with vanilla JS and HTML5 Canvas: smooth keyboard input, speed scaling, collision detection, and localStorage highscores. Practiced game-loop architecture, frame budgeting, and clean state management without frameworks.",
      rarity: "Rare",
      tech: ["JavaScript", "Canvas", "LocalStorage"],
      milestones: [
        "Xây core loop: input, di chuyển, collision với tường và đuôi.",
        "Tăng tốc độ theo điểm, giữ cảm giác điều khiển mượt.",
        "Lưu highscore bằng localStorage, tối ưu render/clear canvas.",
      ],
      thumbnail: "/thumbs/snake.png",
    },
  ],
  dailyTemplate: [
    { id: "check-mail", title: "Check mail", desc: "Inbox triage" },
    { id: "code-1h", title: "Code 1h", desc: "Focus block" },
    { id: "review-1pr", title: "Review 1 PR", desc: "Quality pass" },
  ],
};
