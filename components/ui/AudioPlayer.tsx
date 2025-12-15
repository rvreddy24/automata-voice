'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/lib/utils';

interface AudioPlayerProps {
    src?: string;
    title?: string;
    subtitle?: string;
    showWaveform?: boolean;
    className?: string;
}

export default function AudioPlayer({
    src,
    title,
    subtitle,
    showWaveform = true,
    className
}: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const time = parseFloat(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Generate waveform bars with deterministic heights (avoids hydration mismatch)
    // Uses a simple seeded pattern based on index instead of Math.random()
    const waveformBars = Array.from({ length: 40 }, (_, i) => {
        // Deterministic "random-looking" heights using sine wave + index
        const seed = (i * 7 + 13) % 17;
        const height = 20 + (seed / 17) * 60; // Range: 20-80%
        const isActive = (i / 40) * 100 <= progress;
        return { height, isActive };
    });

    return (
        <div className={cn('card', className)}>
            {/* Hidden audio element */}
            {src && <audio ref={audioRef} src={src} preload="metadata" />}

            {/* Title and subtitle */}
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h4 className="font-medium text-[var(--text-primary)]">{title}</h4>}
                    {subtitle && <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>}
                </div>
            )}

            <div className="flex items-center gap-4">
                {/* Play/Pause button */}
                <button
                    onClick={togglePlay}
                    className={cn(
                        'flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all',
                        'bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)]',
                        isPlaying && 'animate-pulse-glow'
                    )}
                >
                    {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Waveform / Progress */}
                <div className="flex-1">
                    {showWaveform ? (
                        <div className="flex items-end gap-0.5 h-12">
                            {waveformBars.map((bar, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'flex-1 rounded-full transition-all duration-150',
                                        bar.isActive ? 'bg-[var(--accent)]' : 'bg-[var(--border-light)]',
                                        isPlaying && bar.isActive && 'animate-[waveform_0.5s_ease-in-out_infinite]'
                                    )}
                                    style={{
                                        height: `${bar.height}%`,
                                        animationDelay: `${i * 0.02}s`
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--accent)] rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}

                    {/* Seek slider (invisible but functional) */}
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full opacity-0 absolute cursor-pointer"
                        style={{ marginTop: '-48px', height: '48px' }}
                    />
                </div>
            </div>

            {/* Time display */}
            <div className="flex justify-between mt-3 text-xs text-[var(--text-muted)]">
                <span>{formatDuration(Math.floor(currentTime))}</span>
                <span>{formatDuration(Math.floor(duration || 45))}</span>
            </div>

            {/* Placeholder message if no audio */}
            {!src && (
                <p className="mt-3 text-center text-sm text-[var(--text-muted)]">
                    Audio demo will play here
                </p>
            )}
        </div>
    );
}
