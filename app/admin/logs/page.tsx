'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { mockCallLogs, mockClients } from '@/lib/mockData';
import { formatDuration, formatTime, getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function AdminLogsPage() {
    const [isLive, setIsLive] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulate live updates
    const [logs, setLogs] = useState(mockCallLogs.slice(0, 20));

    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            // Simulate new call coming in
            console.log('[Admin Logs] Checking for new calls...');
        }, 5000);

        return () => clearInterval(interval);
    }, [isLive]);

    const getClientName = (clientId: string) => {
        const client = mockClients.find(c => c.id === clientId);
        return client?.companyName || 'Unknown';
    };

    const filteredLogs = logs.filter((log) =>
        log.callerNumber.includes(searchQuery) ||
        getClientName(log.clientId).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Global Call Logs</h1>
                    <p className="text-[var(--text-muted)]">
                        Real-time view of all platform calls for debugging
                    </p>
                </div>
                <button
                    onClick={() => setIsLive(!isLive)}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                        isLive
                            ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                            : 'border-[var(--border)] text-[var(--text-muted)]'
                    )}
                >
                    <span className={cn('w-2 h-2 rounded-full', isLive ? 'bg-[var(--success)] animate-pulse' : 'bg-[var(--text-muted)]')} />
                    {isLive ? 'Live' : 'Paused'}
                </button>
            </div>

            {/* Search */}
            <Card className="mb-6">
                <Input
                    placeholder="Search by phone number or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Log stream */}
            <Card padding="none">
                <div className="max-h-[600px] overflow-y-auto">
                    {filteredLogs.map((log, i) => (
                        <div
                            key={log.id}
                            className={cn(
                                'flex items-center gap-4 px-6 py-4 border-b border-[var(--border)] last:border-0',
                                i === 0 && isLive && 'animate-fade-in bg-[var(--accent)]/5'
                            )}
                        >
                            {/* Status indicator */}
                            <div className={cn(
                                'w-2 h-2 rounded-full flex-shrink-0',
                                log.status === 'booked' && 'bg-[var(--success)]',
                                log.status === 'inquiry' && 'bg-[var(--info)]',
                                log.status === 'spam' && 'bg-[var(--error)]',
                                log.status === 'missed' && 'bg-[var(--warning)]',
                            )} />

                            {/* Time */}
                            <div className="w-20 flex-shrink-0">
                                <span className="text-xs font-mono text-[var(--text-muted)]">
                                    {formatTime(log.createdAt)}
                                </span>
                            </div>

                            {/* Client */}
                            <div className="w-40 flex-shrink-0">
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {getClientName(log.clientId)}
                                </span>
                            </div>

                            {/* Caller */}
                            <div className="w-36 flex-shrink-0">
                                <span className="text-sm text-[var(--text-secondary)]">
                                    {log.callerNumber}
                                </span>
                            </div>

                            {/* Duration */}
                            <div className="w-16 flex-shrink-0">
                                <span className="text-sm text-[var(--text-muted)]">
                                    {formatDuration(log.duration)}
                                </span>
                            </div>

                            {/* Status */}
                            <div className="w-24 flex-shrink-0">
                                <span className={cn('badge', getStatusColor(log.status))}>
                                    {getStatusLabel(log.status)}
                                </span>
                            </div>

                            {/* Summary */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-[var(--text-muted)] truncate">
                                    {log.summary || '—'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-tertiary)]">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[var(--text-muted)]">
                            Showing {filteredLogs.length} calls
                        </p>
                        {isLive && (
                            <p className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                                Auto-refreshing every 5s
                            </p>
                        )}
                    </div>
                </div>
            </Card>

            {/* Legend */}
            <div className="mt-6 flex items-center gap-6 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                    Booked
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--info)]" />
                    Inquiry
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--error)]" />
                    Spam
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                    Missed
                </div>
            </div>
        </div>
    );
}
