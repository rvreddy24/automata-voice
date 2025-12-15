'use client';

import StatsCard from '@/components/ui/StatsCard';
import { Card } from '@/components/ui/Card';
import { mockAdminStats, mockClientList } from '@/lib/mockData';
import { formatCurrency, formatCompactNumber, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const activeClients = mockClientList.filter(c => c.subscriptionStatus === 'active');
    const recentClients = mockClientList.slice(0, 5);

    return (
        <div>
            {/* Page header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <span className="badge bg-purple-500/20 text-purple-400">God Mode</span>
                </div>
                <p className="text-[var(--text-muted)]">
                    Platform overview and management
                </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Monthly Revenue"
                    value={formatCurrency(mockAdminStats.monthlyRevenue)}
                    change={mockAdminStats.revenueChange}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Total Clients"
                    value={mockAdminStats.totalClients}
                    subtext={`${mockAdminStats.activeClients} active`}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Total Calls"
                    value={formatCompactNumber(mockAdminStats.totalCalls)}
                    subtext="All time"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Total Minutes"
                    value={formatCompactNumber(mockAdminStats.totalMinutes)}
                    subtext="This month"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent clients */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Recent Clients</h2>
                            <Link href="/admin/clients" className="text-sm text-[var(--accent)] hover:underline">
                                View All →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentClients.map((client) => (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-medium">
                                            {client.companyName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">{client.companyName}</p>
                                            <p className="text-xs text-[var(--text-muted)]">{client.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn('badge', getStatusColor(client.subscriptionStatus))}>
                                            {getStatusLabel(client.subscriptionStatus)}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{client.callCount} calls</p>
                                            <p className="text-xs text-[var(--text-muted)]">{client.minutesUsed} min</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Quick actions */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/admin/clients"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <span className="font-medium">Add New Client</span>
                            </Link>
                            <Link
                                href="/admin/logs"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <span className="font-medium">View Global Logs</span>
                            </Link>
                            <button
                                onClick={() => console.log('[Admin] Export reports')}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors w-full text-left"
                            >
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                                <span className="font-medium">Export Reports</span>
                            </button>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-[var(--accent)]/20 to-transparent border-[var(--accent)]/30">
                        <h3 className="font-semibold mb-2">Platform Health</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                            <span className="text-sm text-[var(--success)]">All systems operational</span>
                        </div>
                        <div className="space-y-2 text-sm text-[var(--text-muted)]">
                            <div className="flex justify-between">
                                <span>API Uptime</span>
                                <span className="text-[var(--text-primary)]">99.9%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Avg Response</span>
                                <span className="text-[var(--text-primary)]">45ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Active Calls</span>
                                <span className="text-[var(--text-primary)]">12</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
