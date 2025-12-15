export default function ProblemSolution() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            ),
            title: '24/7 Availability',
            description: 'Humans sleep. Our AI works nights, weekends, and holidays. Never miss a call from a potential customer at 2 AM again.',
            stat: '24/7',
            statLabel: 'Coverage',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            title: 'Instant Pick-up',
            description: 'Zero hold times. We answer on the first ring. Research shows 80% of callers hang up if not answered in 20 seconds.',
            stat: '<1s',
            statLabel: 'Response Time',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            ),
            title: 'CRM Integration',
            description: 'We write the details directly into your Salesforce, HubSpot, or Google Sheets. No manual data entry required.',
            stat: '50+',
            statLabel: 'Integrations',
        },
    ];

    return (
        <section className="py-24">
            <div className="container-wide">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why businesses are switching to{' '}
                        <span className="text-gradient-accent">AI receptionists</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        The average small business misses 62% of calls. Each missed call is a lost opportunity
                        worth $100-500. Stop leaving money on the table.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="card group cursor-default animate-slide-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-110 group-hover:bg-[var(--accent)]/20 transition-all">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Stat */}
                            <div className="pt-5 border-t border-[var(--border)]">
                                <span className="text-2xl font-bold text-[var(--accent)]">{feature.stat}</span>
                                <span className="text-sm text-[var(--text-muted)] ml-2">{feature.statLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-[var(--text-muted)] mb-6">
                        Join 500+ businesses already using AutomataVoice
                    </p>
                    <a
                        href="/demo"
                        className="btn btn-primary btn-lg inline-flex"
                    >
                        See It In Action
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
