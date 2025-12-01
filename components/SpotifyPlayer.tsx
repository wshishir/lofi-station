"use client";

import { useState } from "react";
import Image from "next/image";
import Spotify from "@/public/spotify.png";
import { motion, AnimatePresence } from "framer-motion";

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  const spotifyUrl =
    "https://open.spotify.com/embed/playlist/1X4m3caIi1cAXAC5gUO0Ny?utm_source=generator";

  return (
    <div className="fixed bottom-5 right-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-16 h-16 rounded-xl
          bg-black/30 backdrop-blur-md
          flex items-center justify-center
          shadow-2xl
          cursor-pointer
        "
      >
        <Image
          src={Spotify}
          alt="Spotify"
          width={30}
          height={30}
          className="object-contain"
        />
      </button>

      {/* Spotify Player */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="
              absolute bottom-20 right-5 p-3
            "
          >
            <iframe
              src={spotifyUrl}
              width="400"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
