"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  // Timer settings
  const FOCUS_TIME = 25 * 60; // 25 minutes in seconds

  // State
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Ref to store interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time for display
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Calculate progress percentage
  const percentage = (secondsLeft / FOCUS_TIME) * 100;

  function toggleTimer() {
    if (!isRunning) {
      const audio = new Audio("/timer-start.mp3");
      audio.play();
    }
    setIsRunning(!isRunning);
  }

  // Reset timer
  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(FOCUS_TIME);
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
        w-80
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
      <h3 className="text-center text-lg mb-4 font-extralight">Focus</h3>
      <div className="w-52 h-50 mx-auto mb-6">
        <CircularProgressbar
          value={percentage}
          text={displayTime}
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
            w-14 h-14 rounded-lg
            bg-[#10b981]
            flex items-center justify-center
            cursor-pointer
          "
        >
          {isRunning ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-1" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="
            w-14 h-14 rounded-lg
            bg-white/20
            flex items-center justify-center
           cursor-pointer
          "
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}
