'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AudioPlayer from '@/components/ui/AudioPlayer';
import { mockCallLogs } from '@/lib/mockData';
import { formatDuration, formatDate, formatTime, getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CallLog, CallStatus } from '@/types';

export default function CallLogsPage() {
    const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
    const [showTranscript, setShowTranscript] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<CallStatus | 'all'>('all');

    const filteredCalls = mockCallLogs.filter((call) => {
        const matchesSearch =
            call.callerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (call.callerName?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusOptions: { value: CallStatus | 'all'; label: string }[] = [
        { value: 'all', label: 'All Status' },
        { value: 'booked', label: 'Booked' },
        { value: 'inquiry', label: 'Inquiry' },
        { value: 'spam', label: 'Spam' },
        { value: 'missed', label: 'Missed' },
    ];

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Call Logs</h1>
                    <p className="text-[var(--text-muted)]">
                        View and manage all calls handled by your AI
                    </p>
                </div>
                <Button variant="secondary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by phone number or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as CallStatus | 'all')}
                        className="input min-w-[150px]"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Calls table */}
            <div className="card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--bg-tertiary)]">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date & Time</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Caller</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Duration</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Summary</th>
                                <th className="text-right py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCalls.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-[var(--text-muted)]">
                                        No calls found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredCalls.map((call) => (
                                    <tr
                                        key={call.id}
                                        className="border-t border-[var(--border)] hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="text-sm text-[var(--text-primary)]">
                                                {formatDate(call.createdAt)}
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)]">
                                                {formatTime(call.createdAt)}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-[var(--text-primary)]">
                                                {call.callerName || 'Unknown Caller'}
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)]">{call.callerNumber}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-[var(--text-secondary)]">
                                                {formatDuration(call.duration)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className={cn('badge', getStatusColor(call.status))}>
                                                    {getStatusLabel(call.status)}
                                                </span>
                                                {call.flagged && (
                                                    <svg className="w-4 h-4 text-[var(--warning)]" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                                    </svg>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs">
                                            <p className="text-sm text-[var(--text-secondary)] truncate">
                                                {call.summary || 'No summary available'}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
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
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-tertiary)]">
                    <p className="text-sm text-[var(--text-muted)]">
                        Showing {filteredCalls.length} of {mockCallLogs.length} calls
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                            Next
                        </Button>
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
                        <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-[var(--border)]">
                            <span className={cn('badge', getStatusColor(selectedCall.status))}>
                                {getStatusLabel(selectedCall.status)}
                            </span>
                            <span className="text-sm text-[var(--text-muted)]">
                                {selectedCall.callerName || selectedCall.callerNumber}
                            </span>
                            <span className="text-sm text-[var(--text-muted)]">
                                {formatDuration(selectedCall.duration)}
                            </span>
                            <span className="text-sm text-[var(--text-muted)]">
                                {formatDate(selectedCall.createdAt)} at {formatTime(selectedCall.createdAt)}
                            </span>
                        </div>
                        {selectedCall.summary && (
                            <div className="mb-4 p-3 rounded-lg bg-[var(--bg-tertiary)]">
                                <p className="text-xs font-medium text-[var(--text-muted)] mb-1">Summary</p>
                                <p className="text-sm text-[var(--text-primary)]">{selectedCall.summary}</p>
                            </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] leading-relaxed max-h-96 overflow-y-auto font-mono bg-[var(--bg-primary)] p-4 rounded-lg">
                            {selectedCall.transcript || 'No transcript available for this call.'}
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
