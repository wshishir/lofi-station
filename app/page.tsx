"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ClockCard from "@/components/ClockCard";
import FullscreenButton from "@/components/FullscreenToggle";
import MusicPlayer from "@/components/MusicPlayer";
import PomodoroTimer from "@/components/PomodoroTimer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBackground from "@/components/VideoBackground";
import VideoSelector from "@/components/VideoSelector";
import Loader from "@/components/Loader";
import MobileWarning from "@/components/MobileWarning";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // Initialize state with localStorage value
  const [currentVideo, setCurrentVideo] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedVideo") || "/videos/lofi-bg1.mp4";
    }
    return "/videos/lofi-bg1.mp4";
  });

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoChange = (videoSrc: string) => {
    setIsLoading(true);
    setCurrentVideo(videoSrc);
    // Save the selected video to localStorage
    localStorage.setItem("selectedVideo", videoSrc);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <MobileWarning />

      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      <VideoBackground videoSrc={currentVideo} onLoaded={handleVideoLoaded} />
      <FullscreenButton />
      <ClockCard />
      <PomodoroTimer />
      <SpotifyPlayer />
      <MusicPlayer />
      <VideoSelector
        currentVideo={currentVideo}
        onVideoChange={handleVideoChange}
      />
    </main>
  );
}
