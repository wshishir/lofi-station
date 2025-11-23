"use client";

import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Main Content Area */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-8xl font-bold tracking-tighter text-white/20 backdrop-blur-sm mix-blend-overlay select-none">
          LOFI STATION
        </h1>
        <LoginButton />
      </div>
    </main>
  );
}
