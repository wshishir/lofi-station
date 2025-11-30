"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2 } from "lucide-react";

interface Video {
  id: string;
  src: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: "1",
    src: "/videos/lofi-bg.mp4",
    thumbnail: "/videos/lofi-bg.mp4",
  },
  {
    id: "2",
    src: "/videos/lofi-bg1.mp4",
    thumbnail: "/videos/lofi-bg1.mp4",
  },
  {
    id: "3",
    src: "/videos/lofi-bg2.mp4",
    thumbnail: "/videos/lofi-bg2.mp4",
  },
];

interface VideoSelectorProps {
  currentVideo: string;
  onVideoChange: (videoSrc: string) => void;
}

export default function VideoSelector({
  currentVideo,
  onVideoChange,
}: VideoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-48">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-20 bg-black/40 backdrop-blur-md rounded-md p-4 shadow-xl"
          >
            <div className="flex flex-col gap-3 min-w-[280px]">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    onVideoChange(video.src);
                    setIsOpen(false);
                  }}
                  className={`group relative overflow-hidden rounded-md transition-all ${
                    currentVideo === video.src
                      ? "ring-2 ring-yellow-100"
                      : "hover:ring-2 hover:ring-yellow-100"
                  }`}
                >
                  <div className="relative aspect-video w-full">
                    <video
                      src={video.thumbnail}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    {currentVideo === video.src && (
                      <div className="absolute top-2 right-2 bg-black/30 text-red-50 text-xs px-2 py-1 rounded-lg font-medium">
                        Selected
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/30 backdrop-blur-md text-white h-16 w-16 flex items-center justify-center rounded-lg cursor-pointer"
      >
        <Settings2 />
      </motion.button>
    </div>
  );
}
