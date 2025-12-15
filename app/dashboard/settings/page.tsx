'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Toggle from '@/components/ui/Toggle';
import { mockAgentConfig, mockCurrentClient, voiceOptions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type TabId = 'profile' | 'agent' | 'notifications';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        console.log('[Settings] Saving configuration...');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        {
            id: 'profile' as TabId, label: 'Business Profile', icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            id: 'agent' as TabId, label: 'Agent Brain', icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'notifications' as TabId, label: 'Notifications', icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
    ];

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Settings</h1>
                    <p className="text-[var(--text-muted)]">
                        Customize your AI receptionist and business preferences
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    isLoading={isSaving}
                >
                    {saved ? (
                        <>
                            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Saved!
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-[var(--border)]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                            activeTab === tab.id
                                ? 'border-[var(--accent)] text-[var(--accent)]'
                                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="max-w-2xl">
                {/* Business Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Business Information</h3>
                            <div className="space-y-5">
                                <Input
                                    label="Business Name"
                                    defaultValue={mockCurrentClient.companyName}
                                />
                                <Input
                                    label="Business Email"
                                    type="email"
                                    defaultValue={mockCurrentClient.email}
                                />
                                <Input
                                    label="Business Phone"
                                    type="tel"
                                    defaultValue={mockCurrentClient.phone}
                                />
                                <Input
                                    label="Website URL"
                                    type="url"
                                    defaultValue={mockCurrentClient.website}
                                    placeholder="https://yourwebsite.com"
                                />
                                <Input
                                    label="Business Address"
                                    defaultValue={mockCurrentClient.address}
                                    placeholder="123 Main St, City, State 12345"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Subscription</h3>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--bg-tertiary)]">
                                <div>
                                    <p className="font-medium">Professional Plan</p>
                                    <p className="text-sm text-[var(--text-muted)]">Unlimited minutes, all features</p>
                                </div>
                                <Button variant="secondary" size="sm">
                                    Manage Billing
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Agent Brain Tab */}
                {activeTab === 'agent' && (
                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Voice & Personality</h3>
                            <div className="space-y-5">
                                {/* Voice selection */}
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
                                        Voice Selection
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {voiceOptions.map((voice) => (
                                            <button
                                                key={voice.id}
                                                className={cn(
                                                    'p-4 rounded-lg border text-left transition-all',
                                                    mockAgentConfig.voiceId === voice.id
                                                        ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                                                        : 'border-[var(--border)] hover:border-[var(--border-light)]'
                                                )}
                                            >
                                                <div className="font-medium text-[var(--text-primary)]">{voice.name}</div>
                                                <div className="text-xs text-[var(--text-muted)]">{voice.accent} • {voice.gender}</div>
                                                <button
                                                    className="mt-2 text-xs text-[var(--accent)] hover:underline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log('[Settings] Preview voice:', voice.id);
                                                    }}
                                                >
                                                    ▶ Preview
                                                </button>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Textarea
                                    label="Opening Greeting"
                                    defaultValue={mockAgentConfig.greeting}
                                    helperText="This is the first thing your AI says when answering a call"
                                />

                                <Textarea
                                    label="Personality Description"
                                    defaultValue={mockAgentConfig.personality}
                                    placeholder="Describe how your AI should behave..."
                                    helperText="E.g., 'Friendly and professional, uses the caller's name when known'"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Enable Business Hours</p>
                                        <p className="text-sm text-[var(--text-muted)]">AI only answers during these times</p>
                                    </div>
                                    <Toggle enabled={mockAgentConfig.businessHours.enabled} />
                                </div>

                                <div className="pt-4 border-t border-[var(--border)]">
                                    {mockAgentConfig.businessHours.schedule.map((day) => (
                                        <div
                                            key={day.day}
                                            className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="w-24 capitalize font-medium">{day.day}</span>
                                                <Toggle enabled={day.isOpen} size="sm" />
                                            </div>
                                            {day.isOpen && (
                                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                                    <input
                                                        type="time"
                                                        defaultValue={day.openTime}
                                                        className="input !py-1 !px-2 !w-auto"
                                                    />
                                                    <span>to</span>
                                                    <input
                                                        type="time"
                                                        defaultValue={day.closeTime}
                                                        className="input !py-1 !px-2 !w-auto"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Call Forwarding</h3>
                            <Input
                                label="Forward calls to this number when needed"
                                type="tel"
                                defaultValue={mockAgentConfig.forwardingNumber}
                                placeholder="+1 (555) 123-4567"
                                helperText="AI will transfer to this number if caller requests a human"
                            />
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">Email Notifications</h3>
                            <div className="space-y-5">
                                <Input
                                    label="Email for Call Summaries"
                                    type="email"
                                    defaultValue={mockAgentConfig.notificationEmail}
                                    placeholder="you@company.com"
                                />

                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Email me when:</label>
                                    {[
                                        { id: 'booked', label: 'A new appointment is booked' },
                                        { id: 'flagged', label: 'A call is flagged for review' },
                                        { id: 'missed', label: 'A call is missed or dropped' },
                                        { id: 'daily', label: 'Daily summary report' },
                                    ].map((option) => (
                                        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked={option.id !== 'missed'}
                                                className="rounded border-[var(--border)]"
                                            />
                                            <span className="text-sm text-[var(--text-secondary)]">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold mb-6">SMS Notifications</h3>
                            <div className="space-y-5">
                                <Input
                                    label="Phone Number for SMS Alerts"
                                    type="tel"
                                    defaultValue={mockAgentConfig.notificationPhone}
                                    placeholder="+1 (555) 123-4567"
                                />

                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Text me when:</label>
                                    {[
                                        { id: 'urgent', label: 'An urgent call comes in' },
                                        { id: 'human', label: 'Caller requests to speak to a human' },
                                    ].map((option) => (
                                        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="rounded border-[var(--border)]"
                                            />
                                            <span className="text-sm text-[var(--text-secondary)]">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
