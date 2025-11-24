"use client";

import ClockCard from "@/components/ClockCard";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      
      <ClockCard/>
    </main>
  );
}
