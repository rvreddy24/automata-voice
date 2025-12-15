'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { mockSignup } from '@/lib/mockAuth';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        mockSignup(formData.email, formData.companyName);
        router.push('/dashboard');
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 flex items-center justify-center pb-16">
                <div className="w-full max-w-md mx-4">
                    <div className="card">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2">Start your free trial</h1>
                            <p className="text-[var(--text-secondary)]">
                                14 days free. No credit card required.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Acme Dental Care"
                                error={errors.companyName}
                            />

                            <Input
                                label="Work Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                error={errors.email}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                helperText="Must be at least 8 characters"
                                error={errors.password}
                            />

                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                error={errors.confirmPassword}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </form>

                        {/* Terms */}
                        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
                            By signing up, you agree to our{' '}
                            <a href="/terms" className="text-[var(--accent)] hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</a>
                        </p>

                        {/* Login link */}
                        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[var(--accent)] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 space-y-3">
                        {[
                            'Answer calls 24/7 with AI',
                            'Book appointments automatically',
                            'Cancel anytime, no contracts',
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                <svg className="w-5 h-5 text-[var(--success)]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
