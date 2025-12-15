'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { startSarahCall, stopCall, setupVapiListeners } from '@/lib/vapi';

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended' | 'error';

export default function DemoPage() {
    const [copied, setCopied] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>('idle');
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const volumeBarsRef = useRef<number[]>(Array(24).fill(10));

    const phoneNumber = '+1 (555) 019-2834';

    // Setup Vapi event listeners
    useEffect(() => {
        const cleanup = setupVapiListeners({
            onCallStart: () => {
                console.log('[Vapi] Call started');
                setCallStatus('active');
                setErrorMessage(null);
            },
            onCallEnd: () => {
                console.log('[Vapi] Call ended');
                setCallStatus('ended');
                setVolumeLevel(0);
                setIsSpeaking(false);
                // Reset to idle after showing "ended" briefly
                setTimeout(() => setCallStatus('idle'), 2000);
            },
            onSpeechStart: () => {
                console.log('[Vapi] Speech started');
                setIsSpeaking(true);
            },
            onSpeechEnd: () => {
                console.log('[Vapi] Speech ended');
                setIsSpeaking(false);
            },
            onVolumeLevel: (level: number) => {
                setVolumeLevel(level);
            },
            onError: (error: Error) => {
                console.error('[Vapi] Error:', error);
                setCallStatus('error');
                setErrorMessage(error.message || 'An error occurred');
            },
        });

        return cleanup;
    }, []);

    // Update volume bars based on volume level
    useEffect(() => {
        if (callStatus === 'active') {
            const newBars = volumeBarsRef.current.map((_, i) => {
                const baseHeight = 15 + Math.sin(i * 0.5) * 10;
                const volumeBoost = volumeLevel * 70;
                const randomVariation = Math.random() * 15;
                return Math.min(95, baseHeight + volumeBoost + randomVariation);
            });
            volumeBarsRef.current = newBars;
        }
    }, [volumeLevel, callStatus]);

    const handleCopy = async () => {
        await copyToClipboard(phoneNumber.replace(/\D/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleStartWebCall = useCallback(async () => {
        setCallStatus('connecting');
        setErrorMessage(null);

        try {
            console.log('[Demo] Starting call with Sarah...');
            await startSarahCall();
        } catch (error) {
            console.error('[Demo] Failed to start call:', error);
            setCallStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to start call');
        }
    }, []);

    const handleEndCall = useCallback(() => {
        console.log('[Demo] Ending call...');
        stopCall();
        setCallStatus('ended');
        setTimeout(() => setCallStatus('idle'), 2000);
    }, []);

    const getStatusDisplay = () => {
        switch (callStatus) {
            case 'connecting':
                return { text: 'Connecting...', color: 'var(--warning)' };
            case 'active':
                return { text: isSpeaking ? 'Sarah is speaking...' : 'Listening...', color: 'var(--success)' };
            case 'ended':
                return { text: 'Call ended', color: 'var(--text-muted)' };
            case 'error':
                return { text: errorMessage || 'Error', color: 'var(--danger)' };
            default:
                return null;
        }
    };

    const statusDisplay = getStatusDisplay();

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 pb-16">
                <div className="container-narrow">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 mb-6">
                            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                            <span className="text-sm font-medium text-[var(--accent)]">Live Demo Available</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Meet <span className="text-gradient-accent">Sarah.</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Sarah is your AI dental receptionist. Talk to her directly from your browser.
                            Try booking an appointment, asking about prices, or rescheduling.
                        </p>
                    </div>

                    {/* Phone Number Display */}
                    <div className="card max-w-xl mx-auto text-center mb-8">
                        <p className="text-sm text-[var(--text-muted)] mb-4">Demo Line (Available 24/7)</p>

                        <div
                            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-wide cursor-pointer hover:text-[var(--accent)] transition-colors"
                            onClick={handleCopy}
                        >
                            {phoneNumber}
                        </div>

                        <Button
                            variant="secondary"
                            onClick={handleCopy}
                            className="mb-4"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-5 h-5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy Number
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Web Call Option */}
                    <div className="card max-w-xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4">Or talk directly from your browser</h3>
                        <p className="text-[var(--text-secondary)] mb-6">
                            No phone needed. Click below to start a voice conversation with Sarah.
                        </p>

                        {callStatus === 'idle' ? (
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleStartWebCall}
                                className="group"
                            >
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                                </svg>
                                Talk to Sarah
                            </Button>
                        ) : callStatus === 'connecting' ? (
                            <div className="space-y-6">
                                {/* Connecting indicator */}
                                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--warning)]/20 border-2 border-[var(--warning)] flex items-center justify-center">
                                    <div className="w-8 h-8 border-3 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
                                </div>
                                <p className="text-[var(--warning)]">Connecting to Sarah...</p>
                            </div>
                        ) : callStatus === 'active' ? (
                            <div className="space-y-6">
                                {/* Active call UI */}
                                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--success)] flex items-center justify-center animate-pulse-glow">
                                    <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                                    </svg>
                                </div>

                                {/* Status indicator */}
                                {statusDisplay && (
                                    <div className="flex items-center justify-center gap-2">
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{ backgroundColor: statusDisplay.color }}
                                        />
                                        <span style={{ color: statusDisplay.color }}>{statusDisplay.text}</span>
                                    </div>
                                )}

                                {/* Waveform visualization */}
                                <div className="flex justify-center items-end gap-1 h-16">
                                    {volumeBarsRef.current.map((height, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-[var(--accent)] rounded-full transition-all duration-100"
                                            style={{
                                                height: `${height}%`,
                                                opacity: 0.5 + volumeLevel * 0.5,
                                            }}
                                        />
                                    ))}
                                </div>

                                <Button variant="danger" onClick={handleEndCall}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
                                    </svg>
                                    End Call
                                </Button>
                            </div>
                        ) : callStatus === 'ended' ? (
                            <div className="space-y-6">
                                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--surface-elevated)] flex items-center justify-center">
                                    <svg className="w-10 h-10 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                                    </svg>
                                </div>
                                <p className="text-[var(--text-muted)]">Call ended</p>
                            </div>
                        ) : callStatus === 'error' ? (
                            <div className="space-y-6">
                                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--danger)]/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p className="text-[var(--danger)]">{errorMessage || 'An error occurred'}</p>
                                <Button variant="primary" onClick={handleStartWebCall}>
                                    Try Again
                                </Button>
                            </div>
                        ) : null}
                    </div>

                    {/* Instructions */}
                    <div className="mt-16 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-center mb-8">Things to try with Sarah</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                'Book an appointment for next Tuesday at 2pm',
                                'Ask about teeth whitening prices',
                                'Try to reschedule to a different time',
                                'Ask if they accept your insurance',
                                'Request an emergency same-day appointment',
                                'Ask to speak with a human',
                            ].map((suggestion, i) => (
                                <div key={i} className="card !p-4 flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-sm font-medium text-[var(--accent)]">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm text-[var(--text-secondary)]">"{suggestion}"</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
