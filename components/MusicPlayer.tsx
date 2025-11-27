'use client';

import { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Declare YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const playerRef = useRef<any>(null);

  // Load YouTube API
  useEffect(() => {
    // Load YouTube iframe API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'jfKfPfyJRdk', // Lofi Girl stream
        playerVars: {
          autoplay: 1,
          controls: 0, // Hide YouTube controls
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            setIsPlaying(true);
          },
        },
      });
    };
  }, []);

  function togglePlay() {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function toggleMute() {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  }

  return (
    <>
      {/* Hidden YouTube Player */}
      <div id="youtube-player" style={{ display: 'none' }} />

      {/* Music Control UI */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-16 h-16 rounded-full
            bg-black/60 backdrop-blur-md
            border-2 border-white/20
            flex items-center justify-center
            shadow-2xl
            hover:bg-black/70
            transition-all
            hover:scale-110
          "
        >
          <Music className="w-8 h-8 text-white" />
        </button>

        {/* Controls Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="
                absolute bottom-20 right-0
                bg-black/90 backdrop-blur-xl
                border-2 border-white/20
                rounded-2xl p-6
                shadow-2xl
                w-80
              "
            >
              {/* Now Playing */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-medium">Lofi Girl Radio</h3>
                <p className="text-white/60 text-sm">24/7 Beats to Study/Relax</p>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="
                  w-full py-3 mb-4
                  bg-gradient-to-r from-purple-500 to-pink-500
                  hover:from-purple-600 hover:to-pink-600
                  rounded-xl
                  flex items-center justify-center gap-2
                  text-white font-medium
                  transition-all
                  hover:scale-105
                "
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play
                  </>
                )}
              </button>

              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Volume</span>
                  <button
                    onClick={toggleMute}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full"
                />
              </div>

              {/* Status */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 text-green-400 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live Stream
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}