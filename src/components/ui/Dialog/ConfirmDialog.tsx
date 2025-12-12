'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'warning' | 'default';
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'default',
}: ConfirmDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isLoading) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, isLoading, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const confirmButtonClass = {
        danger: 'bg-error hover:bg-error/80 text-white',
        warning: 'bg-warning hover:bg-warning/80 text-white',
        default: 'bg-brand-primary hover:bg-brand-primary/80 text-white',
    }[variant];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                className="relative bg-surface border border-border rounded-lg shadow-xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-4 right-4 p-1 text-secondary hover:text-primary rounded-full hover:bg-surface-raised transition-colors disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <h2 className="text-xl font-semibold text-primary mb-2">{title}</h2>
                <p className="text-secondary mb-6">{message}</p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button
                        onClick={onClose}
                        variant="blank"
                        className="px-4 py-2 text-secondary bg-surface-raised hover:bg-surface border border-border rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant="blank"
                        className={`px-4 py-2 rounded-lg transition-colors ${confirmButtonClass}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
