'use client';

import { useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import ControlBar from '@/components/ControlBar';
import PlaylistModal from '@/components/PlaylistModal';

export default function Home() {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <BackgroundVideo />

      {/* Main Content Area - can add a clock or welcome text here later if needed */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-8xl font-bold tracking-tighter text-white/20 backdrop-blur-sm mix-blend-overlay select-none">
          LOFI STATION
        </h1>
      </div>

      <ControlBar onTogglePlaylist={() => setIsPlaylistOpen(true)} />

      <PlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
      />
    </main>
  );
}