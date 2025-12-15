'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    change?: number; // Percentage change
    icon?: ReactNode;
    progressValue?: number; // For progress bar (0-100)
    progressMax?: number;
    className?: string;
}

export default function StatsCard({
    title,
    value,
    subtext,
    change,
    icon,
    progressValue,
    progressMax,
    className,
}: StatsCardProps) {
    const hasProgress = progressValue !== undefined && progressMax !== undefined;
    const progressPercent = hasProgress ? (progressValue / progressMax) * 100 : 0;

    return (
        <div className={cn('card', className)}>
            <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
                {icon && (
                    <span className="text-[var(--accent)]">{icon}</span>
                )}
            </div>

            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{value}</span>

                {change !== undefined && (
                    <span
                        className={cn(
                            'text-sm font-medium mb-1',
                            change >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'
                        )}
                    >
                        {change >= 0 ? '+' : ''}{change}%
                    </span>
                )}
            </div>

            {hasProgress && (
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                        <span>{progressValue.toLocaleString()}</span>
                        <span>{progressMax.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div
                            className={cn(
                                'h-full rounded-full transition-all duration-500',
                                progressPercent > 90 ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'
                            )}
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {subtext && !hasProgress && (
                <p className="mt-2 text-sm text-[var(--text-muted)]">{subtext}</p>
            )}
        </div>
    );
}
