import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, FileText, Calendar, Info } from 'lucide-react';
import { CancellationPolicyData } from '../types/cancellationAndRefundPolicyData';

interface CancelRefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyData: CancellationPolicyData;
}

export function CancelRefundPolicyModal({ isOpen, onClose, policyData }: CancelRefundPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden pointer-events-auto max-h-[85vh] flex flex-col">

              {/* Header gradient */}
              <div className="relative px-6 py-6 bg-gradient-to-br from-indigo-600 to-violet-750 shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">
                      {policyData.policy_name}
                    </h2>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-indigo-200 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Last Updated: {policyData.last_updated}
                      </span>
                      <span>•</span>
                      <span>Version {policyData.version}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
                {policyData.sections.map((section, idx) => (
                  <section key={section.id || idx} className="space-y-3">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">0{idx + 1}.</span>
                      {section.title}
                    </h3>

                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>

                    {/* Highlights */}
                    {section.highlights && section.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {section.highlights.map((highlight, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-100/50 dark:border-indigo-900/30"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Restrictions */}
                    {section.restrictions && (
                      <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold">
                        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{section.restrictions}</p>
                      </div>
                    )}

                    {/* Note/Tips (some sections might have note/tips) */}
                    {(section as any).note && (
                      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-semibold">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{(section as any).note}</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800 flex justify-end shrink-0">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
