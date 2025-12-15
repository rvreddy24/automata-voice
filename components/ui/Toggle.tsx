'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
    enabled?: boolean;
    onChange?: (enabled: boolean) => void;
    labels?: [string, string]; // [off, on]
    size?: 'sm' | 'md';
}

export default function Toggle({
    enabled = false,
    onChange,
    labels,
    size = 'md'
}: ToggleProps) {
    const [isEnabled, setIsEnabled] = useState(enabled);

    const handleToggle = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        onChange?.(newValue);
    };

    const sizeStyles = {
        sm: {
            track: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-4',
        },
        md: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5',
        },
    };

    return (
        <div className="flex items-center gap-3">
            {labels && (
                <span
                    className={cn(
                        'text-sm transition-colors',
                        !isEnabled ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                    )}
                >
                    {labels[0]}
                </span>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={handleToggle}
                className={cn(
                    'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
                    sizeStyles[size].track,
                    isEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--border-light)]'
                )}
            >
                <span
                    className={cn(
                        'pointer-events-none inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200',
                        sizeStyles[size].thumb,
                        'absolute top-0.5 left-0.5',
                        isEnabled && sizeStyles[size].translate
                    )}
                />
            </button>

            {labels && (
                <span
                    className={cn(
                        'text-sm transition-colors',
                        isEnabled ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                    )}
                >
                    {labels[1]}
                </span>
            )}
        </div>
    );
}
