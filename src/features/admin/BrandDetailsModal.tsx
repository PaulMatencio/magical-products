import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, RefreshCw, ExternalLink, Mail, Phone, MapPin, Building, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { useDependencies } from '../../context/DependenciesContext';
import { supabase } from '../../services/supabase';
import { toast } from 'sonner';
import { Brand } from '../../types/types';

interface BrandDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandDetailsModal({ isOpen, onClose }: BrandDetailsModalProps) {
  const { brands } = useInventory();
  const { adminRepository } = useDependencies();
  const [updatingBrandId, setUpdatingBrandId] = useState<string | null>(null);

  const handleDelete = async (brandId: string, brandName: string) => {
    if (!confirm(`Are you sure you want to delete brand "${brandName}"?`)) return;
    try {
      const { error } = await supabase.from('brands').delete().eq('id', brandId);
      if (error) throw error;
      toast.success(`Brand "${brandName}" deleted successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Failed to delete brand: ${err.message || 'It might be referenced by products.'}`);
    }
  };

  const handleUpdate = async (brand: Brand) => {
    setUpdatingBrandId(brand.id);
    try {
      // Clear description and website to force the repository enrichment flow
      await supabase
        .from('brands')
        .update({ description: null, website: null })
        .eq('id', brand.id);

      await adminRepository.getOrCreateBrand(brand.name);
      toast.success(`Brand "${brand.name}" details updated successfully via AI Concierge`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Failed to update brand details: ${err.message || String(err)}`);
    } finally {
      setUpdatingBrandId(null);
    }
  };

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-gray-150 dark:border-slate-800 overflow-hidden pointer-events-auto max-h-[85vh] flex flex-col transition-colors">
              
              {/* Header */}
              <div className="relative px-6 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-900/40 dark:to-violet-900/40 shrink-0 border-b border-gray-100 dark:border-slate-800">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-slate-850 dark:hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-lg">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Brand Details</h3>
                    <p className="text-indigo-100 text-xs mt-0.5">Manage existing brand directories and AI-powered details.</p>
                  </div>
                </div>
              </div>

              {/* Brands List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {brands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Building className="w-12 h-12 text-gray-300 dark:text-slate-700 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No brands registered in the system yet.</p>
                  </div>
                ) : (
                  brands.map((brand) => {
                    const isUpdating = updatingBrandId === brand.id;

                    return (
                      <div
                        key={brand.id}
                        className="p-5 bg-gray-50/55 dark:bg-slate-800/40 rounded-2xl border border-gray-100 dark:border-slate-800/80 hover:border-indigo-100 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row gap-5 items-start justify-between group"
                      >
                        {/* Left Side: Brand Logo & Details */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Logo */}
                          <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                            {brand.logo_url ? (
                              <img
                                src={brand.logo_url}
                                alt={`${brand.name} logo`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = ''; // Clear source to fallback
                                }}
                              />
                            ) : (
                              <Building className="w-6 h-6 text-gray-400 dark:text-slate-500" />
                            )}
                          </div>

                          {/* Brand Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                                {brand.name}
                              </h4>
                              {brand.is_manufacturer && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  Manufacturer
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed transition-colors">
                              {brand.description || (
                                <span className="text-gray-400 dark:text-slate-600 italic">No description available. Click Update to fetch details with AI Concierge.</span>
                              )}
                            </p>

                            {/* Contact Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400 pt-1">
                              {brand.website && (
                                <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                                  <ExternalLink className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                                  <a
                                    href={brand.website.startsWith('http') ? brand.website : `https://${brand.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-indigo-600 dark:text-indigo-400 transition-colors"
                                  >
                                    {brand.website.replace(/^https?:\/\/(www\.)?/, '')}
                                  </a>
                                </div>
                              )}
                              {brand.email && (
                                <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                                  <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                                  <a
                                    href={`mailto:${brand.email}`}
                                    className="hover:underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                  >
                                    {brand.email}
                                  </a>
                                </div>
                              )}
                              {brand.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                                  <span>{brand.phone}</span>
                                </div>
                              )}
                              {brand.address && (
                                <div className="flex items-center gap-2 sm:col-span-2">
                                  <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                                  <span className="line-clamp-1">{brand.address}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t border-gray-100 dark:border-slate-800/80 md:border-none pt-3 md:pt-0 w-full md:w-auto justify-end">
                          <button
                            onClick={() => handleUpdate(brand)}
                            disabled={isUpdating}
                            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-150 active:bg-indigo-200 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                            title="Complete or update brand details using AI Concierge"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                            {isUpdating ? 'Updating...' : 'Update (AI)'}
                          </button>
                          <button
                            onClick={() => handleDelete(brand.id, brand.name)}
                            className="p-2 bg-red-50 hover:bg-red-100 active:bg-red-200 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl transition-all"
                            title="Delete Brand"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-slate-850/60 shrink-0 flex justify-end border-t border-gray-100 dark:border-slate-800/60">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-750 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all text-sm cursor-pointer shadow-sm"
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
