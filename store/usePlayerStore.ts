import { create } from 'zustand';

export interface Track {
    id: string;
    title: string;
    url: string;
    videoId: string;
}

interface PlayerState {
    isPlaying: boolean;
    currentTrackIndex: number;
    tracks: Track[];
    volume: number;
    isMuted: boolean;

    // Actions
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    addTrack: (url: string) => void;
    setTrack: (index: number) => void;
}

const DEFAULT_TRACKS: Track[] = [
    {
        id: '1',
        title: 'lofi hip hop radio - beats to relax/study to',
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        videoId: 'jfKfPfyJRdk'
    },
    {
        id: '2',
        title: 'synthwave radio - beats to chill/game to',
        url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
        videoId: '4xDzrJKXOOY'
    },
    {
        id: '3',
        title: 'coffee shop radio // 24/7 lofi hip-hop beats',
        url: 'https://www.youtube.com/watch?v=-5KAN9_CzSA',
        videoId: '-5KAN9_CzSA'
    },
    {
        id: '4',
        title: 'lofi hip hop radio - beats to sleep/chill to',
        url: 'https://www.youtube.com/watch?v=rUxyKA_-grg',
        videoId: 'rUxyKA_-grg'
    }
];

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    currentTrackIndex: 0,
    tracks: DEFAULT_TRACKS,
    volume: 50,
    isMuted: false,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    nextTrack: () => set((state) => {
        const nextIndex = (state.currentTrackIndex + 1) % state.tracks.length;
        return { currentTrackIndex: nextIndex };
    }),

    prevTrack: () => set((state) => {
        const prevIndex = (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
        return { currentTrackIndex: prevIndex };
    }),

    setVolume: (volume) => set({ volume }),

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    addTrack: (url) => {
        // Basic extraction of video ID
        let videoId = '';
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v') || '';
            } else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.slice(1);
            }
        } catch (e) {
            console.error('Invalid URL', e);
            return;
        }

        if (!videoId) return;

        const newTrack: Track = {
            id: Date.now().toString(),
            title: `Custom Track ${get().tracks.length + 1}`, // Placeholder title, real app might fetch from API
            url,
            videoId
        };

        set((state) => ({ tracks: [...state.tracks, newTrack] }));
    },

    setTrack: (index) => set({ currentTrackIndex: index })
}));
