'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { mockLogin, devLoginAsAdmin, devLoginAsClient } from '@/lib/mockAuth';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const auth = mockLogin(email, password);

        if (auth.isAuthenticated) {
            if (auth.user?.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } else {
            setError('Invalid credentials. Try any email/password.');
            setIsLoading(false);
        }
    };

    const handleDevLogin = (role: 'admin' | 'client') => {
        if (role === 'admin') {
            devLoginAsAdmin();
            router.push('/admin');
        } else {
            devLoginAsClient();
            router.push('/dashboard');
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 flex items-center justify-center">
                <div className="w-full max-w-md mx-4">
                    <div className="card">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                            <p className="text-[var(--text-secondary)]">
                                Sign in to access your dashboard
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                error={error}
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded border-[var(--border)]" />
                                    <span className="text-[var(--text-secondary)]">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-[var(--accent)] hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--border)]" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[var(--bg-secondary)] px-2 text-[var(--text-muted)]">
                                    Dev Quick Login
                                </span>
                            </div>
                        </div>

                        {/* Dev login buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => handleDevLogin('client')}
                            >
                                Login as Client
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => handleDevLogin('admin')}
                            >
                                Login as Admin
                            </Button>
                        </div>

                        {/* Signup link */}
                        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-[var(--accent)] hover:underline">
                                Start free trial
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
