import { create } from "zustand";

export const useRpgStore = create((set) => ({
  activeQuestTab: "main",
  setActiveQuestTab: (t) => set({ activeQuestTab: t }),
}));
