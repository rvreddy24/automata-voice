import AudioPlayer from '@/components/ui/AudioPlayer';

export default function AudioProof() {
    return (
        <section id="audio-proof" className="py-24 bg-[var(--bg-secondary)]">
            <div className="container-narrow">
                <div className="text-center mb-12">
                    {/* Section badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 mb-6">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9zM7 14v4H6c-.55 0-1-.45-1-1v-3h2zm12 3c0 .55-.45 1-1 1h-1v-4h2v3z" />
                        </svg>
                        <span className="text-sm font-medium text-[var(--accent)]">Live Audio Demo</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Don't believe us?{' '}
                        <span className="text-gradient-accent">Listen</span> to 'Sarah' handle a real patient.
                    </h2>

                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        This is an actual call recording where our AI receptionist schedules an appointment,
                        handles objections, and provides information — all without human intervention.
                    </p>
                </div>

                {/* Audio Player */}
                <div className="max-w-2xl mx-auto">
                    <AudioPlayer
                        title="Live Demo Call: Dental Appointment Booking"
                        subtitle="Duration: 00:45 • Caller: New Patient"
                        showWaveform={true}
                    />

                    {/* AI voice notice */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        <span>Note: The voice above is 100% AI-generated. No human actors were used.</span>
                    </div>
                </div>

                {/* Call highlights */}
                <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        {
                            time: '0:05',
                            action: 'Caller asks for appointment',
                            response: 'Sarah checks availability in real-time',
                        },
                        {
                            time: '0:22',
                            action: 'Caller wants to change time',
                            response: 'Handles rescheduling smoothly',
                        },
                        {
                            time: '0:38',
                            action: 'Caller confirms booking',
                            response: 'Sends SMS confirmation instantly',
                        },
                    ].map((highlight, i) => (
                        <div key={i} className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--accent)]/20 text-[var(--accent)]">
                                    {highlight.time}
                                </span>
                            </div>
                            <h4 className="font-medium text-[var(--text-primary)] mb-1">{highlight.action}</h4>
                            <p className="text-sm text-[var(--text-muted)]">{highlight.response}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
