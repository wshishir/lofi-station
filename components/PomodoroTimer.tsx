"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play, Pause, RotateCcw, Coffee, Target, Brain } from "lucide-react";

export default function PomodoroTimer() {
  
  const FOCUS_TIME = 25 * 60; 
  const BREAK_TIME= 5 * 60;

  // State
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // percentage
  const totalTime =mode === "focus" ?FOCUS_TIME :BREAK_TIME;
  const percentage = (secondsLeft / totalTime) * 100;

  function toggleTimer() {
    if (!isRunning) {
      const audio = new Audio("/timer-start.mp3");
      audio.play();
    }
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    const totalTime= mode === "focus" ? FOCUS_TIME : BREAK_TIME;
    setSecondsLeft(totalTime);
  }

  function switchMode(newMode: "focus" | "break") {
    setMode(newMode);
    setIsRunning(false);
    const time = newMode === "focus" ? FOCUS_TIME :BREAK_TIME;
    setSecondsLeft(time);
  }

  // Timer countdown logic
  useEffect(() => {
    // If not running, don't do anything
    if (!isRunning) return;

    // Start countdown
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        // If time is up
        if (prev <= 1) {
          setIsRunning(false);
          return FOCUS_TIME; // Reset
        }
        // Subtract 1 second
        return prev - 1;
      });
    }, 1000);

    // Cleanup function - stop interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); // Only re-run when isRunning changes

  return (
    <motion.div
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth - 320,
        bottom: window.innerHeight - 400,
      }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      className="
        fixed bottom-8 left-8
        w-68
        bg-black/30 backdrop-blur-lg
        rounded-lg p-6
        cursor-grab
        active:cursor-grabbing
        select-none
        shadow
        border
        border-white/10
      "
    >
      <div className="flex gap-4 justify-center mb-4">
  <button
    onClick={() => switchMode("focus")}
    className={`text-lg font-extralight flex items-center justify-center gap-1 ${
      mode === "focus" ? "text-white underline" : "text-white/50"
    }`}
  >
   <Brain/> Focus
  </button>
  <button
    onClick={() => switchMode("break")}
    className={`text-lg font-extralight flex gap-0.5 items-center justify-center ${
      mode === "break" ? "text-white underline" : "text-white/50"
    }`}
  >
    <Coffee className="h-5 w-6"/>Break
  </button>
</div>
      <div className="w-52 h-50 mx-auto mb-6">
        <CircularProgressbar
          value={percentage}
          text={displayTime}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: "#10b981",
            textColor: "#ffffff",
            trailColor: "rgba(255, 255, 255, 0.1)",
            
          })}
        />
      </div>
      <div className="flex gap-3 justify-center">
        <button
          onClick={toggleTimer}
          className="
            px-6 py-5 rounded-2xl
            bg-[#10b981]/80
            flex items-center justify-center
            cursor-pointer
          "
        >
          {isRunning ? (
            <Pause strokeWidth={2.5} className="w-5 h-5 text-red-50" />
          ) : (
            <Play strokeWidth={2.5} className="w-5 h-5 text-red-50 ml-1" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="
            px-6 py-5 rounded-2xl
            bg-red-50/10
            flex items-center justify-center
           cursor-pointer
          "
        >
          <RotateCcw strokeWidth={2.5} className="w-5 h-5 text-red-50" />
        </button>
      </div>
    </motion.div>
  );
}
