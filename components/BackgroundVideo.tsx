'use client';

import { useEffect, useRef } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function BackgroundVideo() {
    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        volume,
        isMuted,
        nextTrack,
        play,
        pause
    } = usePlayerStore();

    const playerRef = useRef<YouTubePlayer | null>(null);
    const currentTrack = tracks[currentTrackIndex];

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
    };

    const onReady = (event: { target: YouTubePlayer }) => {
        playerRef.current = event.target;
        event.target.setVolume(volume);
        if (isMuted) {
            event.target.mute();
        } else {
            event.target.unMute();
        }

        if (isPlaying) {
            event.target.playVideo();
        }
    };

    const onStateChange = (event: { data: number }) => {
        // 0 is ended
        if (event.data === 0) {
            nextTrack();
        }
        // 1 is playing
        if (event.data === 1 && !isPlaying) {
            play();
        }
        // 2 is paused
        if (event.data === 2 && isPlaying) {
            pause();
        }
    };

    // Sync volume
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    }, [volume]);

    // Sync mute
    useEffect(() => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
            }
        }
    }, [isMuted]);

    // Sync play/pause
    useEffect(() => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.playVideo();
            } else {
                playerRef.current.pauseVideo();
            }
        }
    }, [isPlaying]);

    return (
        <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-black">
            <div className="absolute inset-0 pointer-events-none transform scale-[1.35]">
                <YouTube
                    videoId={currentTrack.videoId}
                    opts={opts}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    className="h-full w-full"
                    iframeClassName="h-full w-full object-cover"
                />
            </div>
            {/* Overlay to darken/tint if needed for text readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
    );
}
