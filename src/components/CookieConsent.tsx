import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('gdpr_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('gdpr_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('gdpr_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-600/10 flex flex-col md:flex-row gap-6 items-center justify-between">
              
              <div className="flex-1 flex gap-4 md:gap-6 items-start md:items-center">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl hidden sm:block shrink-0">
                  <Cookie className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                    <button 
                      onClick={() => {
                        setIsVisible(false);
                        navigateTo('privacy');
                      }} 
                      className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline font-bold"
                    >
                      Privacy Policy
                    </button>
                    {' '}and{' '}
                    <button 
                      onClick={() => {
                        setIsVisible(false);
                        navigateTo('terms');
                      }}
                      className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline font-bold"
                    >
                      Terms of Service
                    </button>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleAcceptEssential}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm transition-colors active:scale-95"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors active:scale-95 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Accept All
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
