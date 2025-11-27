"use client";

import { useState } from "react";
import { Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpotifyPlayer() {

  const [isOpen, setIsOpen] = useState(false);

  const spotifyUrl =
    "https://open.spotify.com/embed/playlist/1X4m3caIi1cAXAC5gUO0Ny?utm_source=generator";

  return (
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
          active:scale-95
        "
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Music className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Spotify Player */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="
              absolute bottom-20 right-0
              bg-black/90 backdrop-blur-xl
              border-2 border-white/20
              rounded-2xl p-3
              shadow-2xl
            "
          >
            {/* Spotify Embed */}
            <iframe
              src={spotifyUrl}
              width="300"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />

            {/* Optional: Playlist label */}
            <p className="text-white/60 text-xs text-center mt-2">
              Lofi Hip Hop Radio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
