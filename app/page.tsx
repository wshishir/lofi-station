"use client";

import ClockCard from "@/components/ClockCard";
import FullscreenButton from "@/components/FullscreenToggle";
import MusicPlayer from "@/components/MusicPlayer";
import PomodoroTimer from "@/components/PomodoroTimer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      <FullscreenButton />
      <ClockCard/>
      <PomodoroTimer/>
      <SpotifyPlayer/>
      <MusicPlayer/>
    </main>
  );
}
