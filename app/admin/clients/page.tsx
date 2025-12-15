'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { mockClientList } from '@/lib/mockData';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ClientListItem } from '@/types';

export default function AdminClientsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState<ClientListItem | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState<'suspend' | 'impersonate' | null>(null);

    const filteredClients = mockClientList.filter((client) =>
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAction = (client: ClientListItem, action: 'suspend' | 'impersonate') => {
        setSelectedClient(client);
        setActionType(action);
        setShowConfirmModal(true);
    };

    const confirmAction = () => {
        if (!selectedClient || !actionType) return;

        if (actionType === 'impersonate') {
            console.log('[Admin] Impersonating client:', selectedClient.id);
            // In production, this would set the session to the client's account
            router.push('/dashboard');
        } else {
            console.log('[Admin] Suspending client:', selectedClient.id);
            // In production, this would update the client's status in the database
        }

        setShowConfirmModal(false);
        setSelectedClient(null);
        setActionType(null);
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Client Management</h1>
                    <p className="text-[var(--text-muted)]">
                        View, manage, and support all platform clients
                    </p>
                </div>
                <Button variant="primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Client
                </Button>
            </div>

            {/* Search */}
            <Card className="mb-6">
                <Input
                    placeholder="Search by company name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Clients table */}
            <Card padding="none">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--bg-tertiary)]">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Company</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Plan</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Usage</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Joined</th>
                                <th className="text-right py-4 px-6 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr
                                    key={client.id}
                                    className="border-t border-[var(--border)] hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-medium">
                                                {client.companyName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--text-primary)]">{client.companyName}</p>
                                                <p className="text-xs text-[var(--text-muted)]">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm capitalize text-[var(--text-secondary)]">
                                            {client.subscriptionTier}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={cn('badge', getStatusColor(client.subscriptionStatus))}>
                                            {getStatusLabel(client.subscriptionStatus)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div>
                                            <p className="text-sm text-[var(--text-primary)]">{client.callCount} calls</p>
                                            <p className="text-xs text-[var(--text-muted)]">{client.minutesUsed} minutes</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-[var(--text-secondary)]">
                                            {formatDate(client.createdAt)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleAction(client, 'impersonate')}
                                                className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                                                title="Impersonate"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleAction(client, 'suspend')}
                                                className={cn(
                                                    'p-2 rounded-lg transition-colors',
                                                    client.subscriptionStatus === 'suspended'
                                                        ? 'hover:bg-[var(--bg-primary)] text-[var(--success)] hover:text-[var(--success)]'
                                                        : 'hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--error)]'
                                                )}
                                                title={client.subscriptionStatus === 'suspended' ? 'Reactivate' : 'Suspend'}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Confirmation Modal */}
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title={actionType === 'impersonate' ? 'Impersonate Client?' : 'Suspend Client?'}
                size="sm"
            >
                {selectedClient && (
                    <div>
                        <p className="text-[var(--text-secondary)] mb-6">
                            {actionType === 'impersonate'
                                ? `You will be logged in as "${selectedClient.companyName}" and can view their dashboard.`
                                : `This will suspend "${selectedClient.companyName}"'s account and stop their AI from answering calls.`
                            }
                        </p>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={() => setShowConfirmModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant={actionType === 'suspend' ? 'danger' : 'primary'}
                                className="flex-1"
                                onClick={confirmAction}
                            >
                                {actionType === 'impersonate' ? 'Impersonate' : 'Suspend'}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
