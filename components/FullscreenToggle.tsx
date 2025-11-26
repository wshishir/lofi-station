"use client";

import { useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Maximize, Minimize } from "lucide-react";
import { TooltipContent } from "./ui/tooltip";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleFullscreen}
            className="
              fixed top-3 right-3 z-50
              p-3.5 rounded-lg
              bg-black/20
              text-white
              cursor-pointer
              justify-center
              flex
              backdrop-blur-sm
            "
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
