"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  onLoaded?: () => void;
}

export default function VideoBackground({ videoSrc, onLoaded }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onLoaded) return;

    // Check if video is already loaded (happens on refresh when cached)
    if (video.readyState >= 3) {
      onLoaded();
      return;
    }

    const handleLoaded = () => {
      onLoaded();
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
    };
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        key={videoSrc}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
