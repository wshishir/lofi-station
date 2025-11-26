"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

export default function ClockCard() {
  const [time, setTime] = useState(moment().format("hh:mm A"));
  const [date, setDate] = useState(moment().format("dddd, DD.MM.YY"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("hh:mm A"));
      setDate(moment().format("dddd, DD.MM.YYYY"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [hour, minute, zone] = time.split(/[: ]/);
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 1225, top: 0, bottom:700 }}
      dragElastic={0.5}
      whileDrag={{ scale: 1.05 }}
      style={{ touchAction: "none" }}
      className="p-8 w-72 rounded-lg bg-black/40 flex flex-col items-center justify-center backdrop-blur-md backdrop:fill-transparent active:cursor-grabbing
      select-none
      cursor-grab
      "
    >
      <div className="flex items-center justify-center">
        <span
          className={`${oswald.className} text-sm font-semibold flex items-baseline justify-center gap-3 text-white`}
        >
          <p className="text-7xl">{hour}</p>
          <p className="text-7xl font-normal text-white/70">:</p>
          <p className="text-7xl">{minute}</p>
          <p className="font-normal text-white/70">{zone}</p>
        </span>
      </div>
      <div className="flex items-center justify-center font-base pt-1">
        <p className="flex items-center justify-center gap-2 text-white/50">
          <span>{date}</span>
        </p>
      </div>
    </motion.div>
  );
}
