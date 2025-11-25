"use client";

import ClockCard from "@/components/ClockCard";
import PomodoroTimer from "@/components/PomodoroTimer";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      
      <ClockCard/>
      <PomodoroTimer/>
    </main>
  );
}
