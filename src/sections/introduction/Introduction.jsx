// src/sections/Introduction.jsx
import Hero from "./Hero";
import RadarStats from "./RadarStats";
import { heroInfo, radarStats } from "@data/stats";

export default function Introduction() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
       <Hero
          name = "Nguyen Tien Anh"
          status = "On Quest: Snake Game"
          avatarUrl = "/assets/avatar.jpg"
          rankScore = {15}
          flow = {86}            
          alignment = "Neutral Good"
          personal_motto = "Clarity first, safety always, speed by design—small, reversible changes that ship value every day."
          classToken = "Developer"
        />
      <RadarStats stats={radarStats} />
    </div>
  );
}
