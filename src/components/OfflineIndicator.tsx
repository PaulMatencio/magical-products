// src/components/OfflineIndicator.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, WifiOff, CloudOff } from 'lucide-react';

export function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [pendingOps, setPendingOps] = useState(0);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check pending operations
        const checkPendingOps = () => {
            const ops = localStorage.getItem('pending_operations');
            if (ops) {
                const count = JSON.parse(ops).length;
                setPendingOps(count);
            }
        };

        checkPendingOps();
        const interval = setInterval(checkPendingOps, 5000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                            <WifiOff className="w-4 h-4" />
                            <span>You are offline. Using cached data.</span>
                            {pendingOps > 0 && (
                                <span className="ml-2 bg-amber-600 px-2 py-0.5 rounded-full text-xs">
                                    {pendingOps} pending {pendingOps === 1 ? 'update' : 'updates'}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {!isOffline && pendingOps > 0 && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <div className="bg-blue-500 text-white px-4 py-2 text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                            <CloudOff className="w-4 h-4 animate-pulse" />
                            <span>Syncing {pendingOps} pending {pendingOps === 1 ? 'update' : 'updates'}...</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}