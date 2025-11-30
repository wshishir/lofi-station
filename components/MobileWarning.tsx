"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

export default function MobileWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if screen width is less than 768px (mobile/tablet)
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      setShowWarning(isMobile);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleClose = () => {
    setShowWarning(false);
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="bg-yellow-500/20 p-4 rounded-full">
                <Smartphone className="w-12 h-12 text-yellow-400" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Mobile Device Detected
              </h2>

              <p className="text-white/80 leading-relaxed">
                For best experience I would advice to switch to a larger screen
                device as this project is not meant for smaller screens.
              </p>

              <button
                onClick={handleClose}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-white/20"
              >
                OK, I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
