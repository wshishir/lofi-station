'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ControlBarProps {
    onTogglePlaylist: () => void;
}

export default function ControlBar({ onTogglePlaylist }: ControlBarProps) {
    const {
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        tracks,
        currentTrackIndex
    } = usePlayerStore();

    const currentTrack = tracks[currentTrackIndex];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl"
        >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">

                {/* Track Info */}
                <div className="flex-1 min-w-0 hidden sm:block">
                    <p className="text-white font-medium truncate">{currentTrack.title}</p>
                    <p className="text-white/60 text-xs">LoFi Station</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={prevTrack}
                        className="text-white/80 hover:text-white transition-colors p-2"
                    >
                        <SkipBack size={24} />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform active:scale-95"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>

                    <button
                        onClick={nextTrack}
                        className="text-white/80 hover:text-white transition-colors p-2"
                    >
                        <SkipForward size={24} />
                    </button>
                </div>

                {/* Volume & Playlist */}
                <div className="flex items-center gap-4 flex-1 justify-end">
                    <div className="flex items-center gap-2 group">
                        <button onClick={toggleMute} className="text-white/80 hover:text-white">
                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300 ease-in-out">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10 mx-2" />

                    <button
                        onClick={onTogglePlaylist}
                        className="text-white/80 hover:text-white p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <ListMusic size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
