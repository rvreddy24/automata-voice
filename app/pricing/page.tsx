'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import { pricingTiers } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);

    const handleSubscribe = (tierId: string) => {
        console.log(`[Stripe] Redirect to checkout for tier: ${tierId}, billing: ${isYearly ? 'yearly' : 'monthly'}`);
        // In production, this would redirect to Stripe Checkout
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 pb-16">
                <div className="container-wide">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Cheaper than a <span className="text-gradient-accent">Part-Time Intern.</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                            The average receptionist costs $35,000/year. Our AI works 24/7 for a fraction of that price.
                        </p>

                        {/* Billing toggle */}
                        <div className="flex items-center justify-center gap-4">
                            <Toggle
                                enabled={isYearly}
                                onChange={setIsYearly}
                                labels={['Monthly', 'Yearly']}
                            />
                            {isYearly && (
                                <span className="px-3 py-1 rounded-full bg-[var(--success)]/20 text-[var(--success)] text-sm font-medium">
                                    Save 20%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Pricing cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingTiers.map((tier, i) => (
                            <div
                                key={tier.id}
                                className={cn(
                                    'card relative transition-all duration-300',
                                    tier.highlighted && 'border-[var(--accent)] shadow-[0_0_40px_var(--accent-glow)] scale-105',
                                    'hover:translate-y-[-4px]'
                                )}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Popular badge */}
                                {tier.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent)] text-black text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    {tier.monthlyPrice > 0 ? (
                                        <>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-bold text-[var(--text-primary)]">
                                                    ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                                                </span>
                                                <span className="text-[var(--text-muted)]">/month</span>
                                            </div>
                                            {isYearly && (
                                                <p className="text-sm text-[var(--text-muted)] mt-1">
                                                    Billed annually (${tier.yearlyPrice * 12}/year)
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-3xl font-bold text-[var(--text-primary)]">
                                            Contact Us
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm">
                                            <svg className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                            <span className="text-[var(--text-secondary)]">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Button
                                    variant={tier.highlighted ? 'primary' : 'secondary'}
                                    className="w-full"
                                    onClick={() => handleSubscribe(tier.id)}
                                >
                                    {tier.ctaText}
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* FAQ or comparison */}
                    <div className="mt-24 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "How does the AI receptionist answer calls?",
                                    a: "When a call comes in, our AI answers within the first ring using advanced voice synthesis. It engages in natural conversation, handles common inquiries, and can book appointments directly into your calendar."
                                },
                                {
                                    q: "Can I try before I subscribe?",
                                    a: "Absolutely! We offer a 14-day free trial on all plans. No credit card required to start. You'll get full access to all features during your trial."
                                },
                                {
                                    q: "What happens if the AI can't answer a question?",
                                    a: "If the AI encounters a question beyond its training, it gracefully offers to take a message or transfer to a human. You'll receive an instant notification via email or SMS."
                                },
                                {
                                    q: "Can I customize what the AI says?",
                                    a: "Yes! You can fully customize the greeting, personality, supported languages, and business-specific knowledge base. Higher tiers allow custom voice cloning to match your brand."
                                },
                            ].map((faq, i) => (
                                <div key={i} className="card">
                                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h4>
                                    <p className="text-sm text-[var(--text-secondary)]">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-24 text-center">
                        <p className="text-[var(--text-muted)] mb-4">Have more questions?</p>
                        <Link href="/contact">
                            <Button variant="secondary">Talk to Sales</Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
