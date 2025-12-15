'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const textareaId = id || label?.toLowerCase().replace(/\s/g, '-');

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="text-sm font-medium text-[var(--text-primary)]"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        'input min-h-[120px] resize-y',
                        error && 'border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-[var(--error)]">{error}</span>
                )}
                {helperText && !error && (
                    <span className="text-xs text-[var(--text-muted)]">{helperText}</span>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
