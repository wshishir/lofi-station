'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { X, Plus, Music, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
    const { tracks, currentTrackIndex, setTrack, addTrack } = usePlayerStore();
    const [newTrackUrl, setNewTrackUrl] = useState('');
    const [error, setError] = useState('');

    const handleAddTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newTrackUrl.trim()) return;

        try {
            addTrack(newTrackUrl);
            setNewTrackUrl('');
        } catch (err) {
            setError('Invalid YouTube URL');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/90 border-l border-white/10 p-6 shadow-2xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">Playlist</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Add Track Form */}
                        <form onSubmit={handleAddTrack} className="mb-8">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTrackUrl}
                                    onChange={(e) => setNewTrackUrl(e.target.value)}
                                    placeholder="Paste YouTube URL..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                                >
                                    <Plus size={20} />
                                    Add
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        </form>

                        {/* Track List */}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {tracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    onClick={() => setTrack(index)}
                                    className={cn(
                                        "group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200",
                                        currentTrackIndex === index
                                            ? "bg-white/10 border border-white/10"
                                            : "hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                        currentTrackIndex === index ? "bg-white text-black" : "bg-white/5 text-white/40 group-hover:text-white/60"
                                    )}>
                                        <Music size={20} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            "font-medium truncate transition-colors",
                                            currentTrackIndex === index ? "text-white" : "text-white/70 group-hover:text-white"
                                        )}>
                                            {track.title}
                                        </p>
                                        <p className="text-xs text-white/40 truncate">
                                            {currentTrackIndex === index ? "Now Playing" : "Track " + (index + 1)}
                                        </p>
                                    </div>

                                    {currentTrackIndex === index && (
                                        <div className="flex gap-1">
                                            <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
                                            <span className="w-1 h-5 bg-white rounded-full animate-pulse delay-75" />
                                            <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
