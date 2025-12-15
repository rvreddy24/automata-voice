import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-16">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute inset-0 bg-glow" />

            <div className="container-wide relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] mb-6 animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                            <span className="text-sm text-[var(--text-secondary)]">Now with Voice Cloning Technology</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
                            Never Miss a New{' '}
                            <span className="text-gradient-accent">Customer</span>{' '}
                            Again.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 animate-slide-up delay-100">
                            Our AI Receptionist answers your phone 24/7, qualifies leads, and books
                            appointments directly into your calendar.{' '}
                            <span className="text-[var(--text-primary)] font-medium">Costs 10% of a human salary.</span>
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 animate-slide-up delay-200">
                            <Link href="#audio-proof">
                                <Button variant="primary" size="lg" className="group">
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Hear a Live Demo
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button variant="secondary" size="lg">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-12 pt-8 border-t border-[var(--border)] animate-slide-up delay-300">
                            <p className="text-sm text-[var(--text-muted)] mb-4">Trusted by 500+ businesses</p>
                            <div className="flex flex-wrap items-center gap-6 opacity-60">
                                {['Dental', 'Legal', 'Real Estate', 'Auto', 'Medical'].map((industry) => (
                                    <div key={industry} className="text-sm font-medium text-[var(--text-secondary)]">
                                        {industry}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative hidden lg:block">
                        <div className="relative">
                            {/* Glow effect behind */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-amber-500/20 blur-3xl rounded-full" />

                            {/* Main visual container */}
                            <div className="relative grid grid-cols-2 gap-4">
                                {/* Left side: Stressed receptionist (metaphor) */}
                                <div className="card bg-red-950/30 border-red-900/50">
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/50 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-red-400 mb-2">The Old Way</h4>
                                        <p className="text-sm text-[var(--text-muted)]">Missed calls, stressed staff, lost revenue</p>
                                    </div>
                                    {/* Ringing phones animation */}
                                    <div className="flex justify-center gap-2 pb-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded bg-red-900/50 flex items-center justify-center animate-pulse"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            >
                                                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right side: AI handling smoothly */}
                                <div className="card bg-emerald-950/30 border-emerald-900/50">
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/20 flex items-center justify-center animate-pulse-glow">
                                            <svg className="w-8 h-8 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-[var(--accent)] mb-2">The AutomataVoice Way</h4>
                                        <p className="text-sm text-[var(--text-muted)]">24/7 coverage, zero wait times</p>
                                    </div>
                                    {/* Waveform visualization */}
                                    <div className="flex justify-center items-end gap-1 h-8 pb-4">
                                        {[65, 45, 80, 35, 70, 50, 85, 40, 75, 55, 60, 42].map((height, i) => (
                                            <div
                                                key={i}
                                                className="w-1.5 bg-[var(--accent)] rounded-full animate-[waveform_0.8s_ease-in-out_infinite]"
                                                style={{
                                                    height: `${height}%`,
                                                    animationDelay: `${i * 0.05}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats floating cards */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                                <div className="card !py-3 !px-5 flex items-center gap-3">
                                    <span className="text-2xl font-bold text-[var(--accent)]">98%</span>
                                    <span className="text-xs text-[var(--text-muted)]">Answer Rate</span>
                                </div>
                                <div className="card !py-3 !px-5 flex items-center gap-3">
                                    <span className="text-2xl font-bold text-[var(--success)]">{'< 1s'}</span>
                                    <span className="text-xs text-[var(--text-muted)]">Pick-up Time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
