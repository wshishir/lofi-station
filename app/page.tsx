"use client";

import ClockCard from "@/components/ClockCard";
import FullscreenButton from "@/components/FullscreenToggle";
import PomodoroTimer from "@/components/PomodoroTimer";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      <FullscreenButton />
      <ClockCard/>
      <PomodoroTimer/>
    </main>
  );
}
