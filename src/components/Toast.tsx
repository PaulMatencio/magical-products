// components/Toast.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
}

// Global toast state (simplified - use Context or Zustand for production)
let toastCallbacks: ((msg: ToastMessage) => void) | null = null;

export const toast = {
    success: (message: string) =>
        toastCallbacks?.({ id: crypto.randomUUID(), type: 'success', message }),
    error: (message: string) =>
        toastCallbacks?.({ id: crypto.randomUUID(), type: 'error', message }),
    warning: (message: string) =>
        toastCallbacks?.({ id: crypto.randomUUID(), type: 'warning', message }),
    info: (message: string) =>
        toastCallbacks?.({ id: crypto.randomUUID(), type: 'info', message }),
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        toastCallbacks = (msg: ToastMessage) => {
            setToasts(prev => [...prev, msg]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== msg.id));
            }, 4000);
        };
        return () => { toastCallbacks = null; };
    }, []);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const colors = {
        success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
        <>
            {children}
            <div className="fixed bottom-4 right-4 z-[200] space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.9 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors[toast.type]}`}
                        >
                            {icons[toast.type]}
                            <span className="text-sm font-medium">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
}

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const colors = {
        success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[250] flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md ${colors[type]}`}
        >
            {icons[type]}
            <span className="text-sm font-bold tracking-tight">{message}</span>
            <button onClick={onClose} className="ml-2 opacity-40 hover:opacity-100 transition-opacity">
                <XCircle className="w-4 h-4" />
            </button>
        </motion.div>
    );
}