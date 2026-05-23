/**
 * RetailerContactModal – shows the retailer's contact details
 * fetched from the `public.retailer` Supabase table.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Store, Phone, Mail, MapPin, Globe, MessageCircle,
  ExternalLink, Loader2, AlertCircle
} from 'lucide-react';
import { supabase } from '../services/supabase';

interface RetailerData {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  map_url: string;
  support_email: string;
  website: string;
}

interface RetailerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RetailerContactModal({ isOpen, onClose }: RetailerContactModalProps) {
  const [data, setData] = useState<RetailerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || data) return;
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        const { data: row, error: err } = await supabase
          .from('retailer')
          .select('name,description,phone,whatsapp,street,city,zip,country,map_url,support_email,website')
          .eq('is_active', true)
          .limit(1)
          .maybeSingle();
        if (err) setError(err.message);
        else if (row) setData(row as RetailerData);
        else setError('No retailer information found.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isOpen, data]);

  const address = data
    ? [data.street, `${data.zip} ${data.city}`.trim(), data.country]
        .filter(Boolean)
        .join(', ')
    : '';

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
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[1rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden pointer-events-auto">

              {/* Header gradient */}
              <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-indigo-600 to-violet-700">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3 shadow-lg">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-0.5">Contact Us</p>
                <h2 className="text-xl font-black text-white">
                  {isLoading ? '…' : (data?.name ?? 'Our Store')}
                </h2>
                {data?.description && (
                  <p className="text-sm text-indigo-200 mt-1 leading-relaxed">{data.description}</p>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                {isLoading && (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/30">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{error}</p>
                  </div>
                )}

                {data && !isLoading && (
                  <div className="space-y-3">

                    {/* Phone */}
                    {data.phone && (
                      <a
                        href={`tel:${data.phone}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Phone</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{data.phone}</p>
                        </div>
                      </a>
                    )}

                    {/* WhatsApp */}
                    {data.whatsapp && (
                      <a
                        href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">WhatsApp</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{data.whatsapp}</p>
                        </div>
                      </a>
                    )}

                    {/* Email */}
                    {data.support_email && (
                      <a
                        href={`mailto:${data.support_email}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Support Email</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{data.support_email}</p>
                        </div>
                      </a>
                    )}

                    {/* Address */}
                    {address && (
                      <a
                        href={data.map_url || `https://maps.google.com/?q=${encodeURIComponent(address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Address</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">{address}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 shrink-0" />
                      </a>
                    )}

                    {/* Website */}
                    {data.website && (
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Website</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">{data.website}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 shrink-0" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
