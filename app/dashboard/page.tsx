'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/ui/StatsCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import AudioPlayer from '@/components/ui/AudioPlayer';
import { mockDashboardStats, mockCallLogs, mockCurrentClient } from '@/lib/mockData';
import { formatDuration, formatRelativeTime, formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CallLog } from '@/types';

export default function DashboardPage() {
    const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
    const [showTranscript, setShowTranscript] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const recentCalls = mockCallLogs.slice(0, 5);

    const handleFlag = (callId: string) => {
        console.log('[Dashboard] Flagging call:', callId);
        // In production, this would update the call status in the database
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                    <p className="text-[var(--text-muted)]">
                        Welcome back, {mockCurrentClient.companyName}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="badge badge-success">
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        System Active
                    </span>
                    <Button variant="primary" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Calls Handled"
                    value={mockDashboardStats.callsHandled}
                    change={mockDashboardStats.callsChange}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Minutes Used"
                    value={`${mockDashboardStats.minutesUsed}`}
                    progressValue={mockDashboardStats.minutesUsed}
                    progressMax={mockDashboardStats.minutesTotal}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Appointments Booked"
                    value={mockDashboardStats.appointmentsBooked}
                    change={mockDashboardStats.appointmentsChange}
                    subtext={`Est. Revenue: ${formatCurrency(mockDashboardStats.estimatedRevenue)}`}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Spam Blocked"
                    value={mockDashboardStats.spamBlocked}
                    subtext="Keeping your inbox clean"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    }
                />
            </div>

            {/* Recent calls */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Recent Calls</h2>
                    <Link href="/dashboard/calls">
                        <Button variant="ghost" size="sm">
                            View All
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border)]">
                                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Time</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Caller</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Duration</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCalls.map((call) => (
                                <tr
                                    key={call.id}
                                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="text-sm text-[var(--text-primary)]">
                                            {formatRelativeTime(call.createdAt)}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <div className="text-sm font-medium text-[var(--text-primary)]">
                                                {call.callerName || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)]">{call.callerNumber}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-[var(--text-secondary)]">
                                            {formatDuration(call.duration)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={cn('badge', getStatusColor(call.status))}>
                                            {getStatusLabel(call.status)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {call.recordingUrl && (
                                                <button
                                                    onClick={() => { setSelectedCall(call); setShowPlayer(true); }}
                                                    className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                                    title="Play Recording"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </button>
                                            )}
                                            {call.transcript && (
                                                <button
                                                    onClick={() => { setSelectedCall(call); setShowTranscript(true); }}
                                                    className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                                    title="View Transcript"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleFlag(call.id)}
                                                className={cn(
                                                    'p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors',
                                                    call.flagged ? 'text-[var(--warning)]' : 'text-[var(--text-muted)] hover:text-[var(--warning)]'
                                                )}
                                                title={call.flagged ? 'Flagged' : 'Flag Call'}
                                            >
                                                <svg className="w-4 h-4" fill={call.flagged ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Link href="/dashboard/settings" className="card hover:border-[var(--accent)] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium">Customize Greeting</h3>
                            <p className="text-sm text-[var(--text-muted)]">Edit what your AI says</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/settings" className="card hover:border-[var(--accent)] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium">Business Hours</h3>
                            <p className="text-sm text-[var(--text-muted)]">Set your availability</p>
                        </div>
                    </div>
                </Link>

                <div className="card bg-gradient-to-r from-[var(--accent)]/10 to-transparent border-[var(--accent)]/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium">Upgrade Plan</h3>
                            <p className="text-sm text-[var(--text-muted)]">Get unlimited minutes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transcript Modal */}
            <Modal
                isOpen={showTranscript}
                onClose={() => setShowTranscript(false)}
                title="Call Transcript"
                size="lg"
            >
                {selectedCall && (
                    <div>
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[var(--border)]">
                            <span className={cn('badge', getStatusColor(selectedCall.status))}>
                                {getStatusLabel(selectedCall.status)}
                            </span>
                            <span className="text-sm text-[var(--text-muted)]">
                                {selectedCall.callerNumber}
                            </span>
                            <span className="text-sm text-[var(--text-muted)]">
                                {formatDuration(selectedCall.duration)}
                            </span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] leading-relaxed max-h-96 overflow-y-auto">
                            {selectedCall.transcript || 'No transcript available.'}
                        </div>
                    </div>
                )}
            </Modal>

            {/* Audio Player Modal */}
            <Modal
                isOpen={showPlayer}
                onClose={() => setShowPlayer(false)}
                title="Call Recording"
                size="md"
            >
                {selectedCall && (
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-[var(--text-muted)]">
                                {selectedCall.callerName || selectedCall.callerNumber} • {formatDuration(selectedCall.duration)}
                            </p>
                        </div>
                        <AudioPlayer
                            src={selectedCall.recordingUrl}
                            showWaveform={true}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}
