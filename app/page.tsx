"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ClockCard from "@/components/ClockCard";
import FullscreenButton from "@/components/FullscreenToggle";
import MusicPlayer from "@/components/MusicPlayer";
import PomodoroTimer from "@/components/PomodoroTimer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBackground from "@/components/VideoBackground";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      <VideoBackground onLoaded={handleVideoLoaded} />
      <FullscreenButton />
      <ClockCard />
      <PomodoroTimer />
      <SpotifyPlayer />
      <MusicPlayer />
    </main>
  );
}
