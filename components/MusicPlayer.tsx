'use client';

import { useState } from 'react';
import { Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  const mixcloudUrl = "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FInvsblemusic%2F1-am-study-session-lofi-hip-hopchill-beats%2F";

  return (
    <div className="fixed bottom-5 right-28 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-xl bg-black/30 backdrop-blur-md flex items-center justify-center shadow-2xl cursor-pointer"
      >
      <Music className="w-7 h-7 text-red-50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0  p-3"
          >
            <iframe
              width="320"
              height="120"
              src={mixcloudUrl}
              frameBorder="0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}