'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        console.log('[Contact] Form submitted');
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 pb-16">
                <div className="container-narrow">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Let's <span className="text-gradient-accent">Talk</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
                            Have questions about AutomataVoice? Want a custom demo for your business?
                            We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="card">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                    <p className="text-[var(--text-secondary)]">
                                        We'll get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Full Name"
                                            name="name"
                                            placeholder="John Smith"
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="john@company.com"
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Company Name"
                                        name="company"
                                        placeholder="Smith Dental Care"
                                        required
                                    />

                                    <Input
                                        label="Phone (optional)"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                    />

                                    <Textarea
                                        label="How can we help?"
                                        name="message"
                                        placeholder="Tell us about your business and what you're looking for..."
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full"
                                        isLoading={isSubmitting}
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-6">Other ways to reach us</h3>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:hello@automatavoice.com"
                                        className="card flex items-center gap-4 hover:border-[var(--accent)] transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Email</p>
                                            <p className="text-sm text-[var(--text-muted)]">hello@automatavoice.com</p>
                                        </div>
                                    </a>

                                    <a
                                        href="tel:+15550192834"
                                        className="card flex items-center gap-4 hover:border-[var(--accent)] transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Phone</p>
                                            <p className="text-sm text-[var(--text-muted)]">+1 (555) 019-2834</p>
                                        </div>
                                    </a>

                                    <div className="card flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Office</p>
                                            <p className="text-sm text-[var(--text-muted)]">San Francisco, CA (Remote-first)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick links */}
                            <div className="card bg-[var(--bg-tertiary)]">
                                <h4 className="font-medium mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/demo" className="text-[var(--accent)] hover:underline">→ Try Live Demo</a>
                                    </li>
                                    <li>
                                        <a href="/pricing" className="text-[var(--accent)] hover:underline">→ View Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-[var(--accent)] hover:underline">→ Schedule a Call</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
