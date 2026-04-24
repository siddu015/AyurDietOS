'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    kind: ToastKind;
    title: string;
    description?: string;
    durationMs?: number;
}

interface ToastContextValue {
    toast: (t: Omit<Toast, 'id'>) => string;
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Toast[]>([]);

    const dismiss = useCallback((id: string) => {
        setItems((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback((t: Omit<Toast, 'id'>) => {
        const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const item: Toast = { durationMs: 4000, ...t, id };
        setItems((prev) => [...prev, item]);
        if (item.durationMs && item.durationMs > 0) {
            setTimeout(() => dismiss(id), item.durationMs);
        }
        return id;
    }, [dismiss]);

    const value = useMemo<ToastContextValue>(() => ({
        toast,
        success: (title, description) => toast({ kind: 'success', title, description }),
        error: (title, description) => toast({ kind: 'error', title, description, durationMs: 6000 }),
        info: (title, description) => toast({ kind: 'info', title, description }),
        dismiss,
    }), [toast, dismiss]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastViewport items={items} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}

function ToastViewport({ items, onDismiss }: { items: Toast[]; onDismiss: (id: string) => void }) {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-[calc(100vw-3rem)]">
            <AnimatePresence initial={false}>
                {items.map((t) => (
                    <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
                ))}
            </AnimatePresence>
        </div>
    );
}

const ICONS: Record<ToastKind, React.ReactNode> = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    error: <AlertCircle className="h-4 w-4 text-red-400" />,
    info: <Info className="h-4 w-4 text-[#c9a227]" />,
};

const TONE: Record<ToastKind, string> = {
    success: 'border-emerald-500/30 bg-emerald-500/5',
    error: 'border-red-500/30 bg-red-500/5',
    info: 'border-[#c9a227]/30 bg-[#c9a227]/5',
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
    useEffect(() => { /* durationMs handled in provider */ }, []);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${TONE[toast.kind]} bg-[#1a1a1a]/95 backdrop-blur-md p-3.5 shadow-xl shadow-black/40`}
            role="status"
            aria-live="polite"
        >
            <div className="mt-0.5 flex-shrink-0">{ICONS[toast.kind]}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white leading-snug">{toast.title}</p>
                {toast.description && (
                    <p className="text-xs text-white/60 mt-0.5 leading-relaxed break-words">{toast.description}</p>
                )}
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                className="flex-shrink-0 p-0.5 rounded text-white/40 hover:text-white/80 transition-colors"
                aria-label="Dismiss"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </motion.div>
    );
}
