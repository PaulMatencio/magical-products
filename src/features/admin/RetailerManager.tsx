/**
 * RetailerManager – Admin panel section for editing the retailer profile.
 * Reads from and writes to the `public.retailer` Supabase table.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Store, Phone, Mail, MapPin, Globe, MessageCircle,
  Loader2, Check, AlertCircle, ExternalLink, Save
} from 'lucide-react';
import { supabase } from '../../services/supabase';

interface RetailerRow {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  map_url: string;
  latitude: number | null;
  longitude: number | null;
  support_email: string;
  website: string;
  description: string;
  is_active: boolean;
}

const EMPTY: Omit<RetailerRow, 'id'> = {
  name: '', phone: '', whatsapp: '', street: '', city: '',
  zip: '', country: '', map_url: '', latitude: null, longitude: null,
  support_email: '', website: '', description: '', is_active: true,
};

type FieldDef = { key: keyof Omit<RetailerRow, 'id'>; label: string; placeholder: string; icon: any; type?: string };

const FIELDS: FieldDef[] = [
  { key: 'name',          label: 'Store Name',      placeholder: 'Tots & Trends',                  icon: Store },
  { key: 'description',   label: 'Description',     placeholder: 'Short description of your store', icon: Store,          type: 'textarea' },
  { key: 'phone',         label: 'Phone Number',    placeholder: '+1 555 000 0000',                icon: Phone },
  { key: 'whatsapp',      label: 'WhatsApp Number', placeholder: '+1 555 000 0000',                icon: MessageCircle },
  { key: 'support_email', label: 'Support Email',   placeholder: 'support@example.com',            icon: Mail,           type: 'email' },
  { key: 'website',       label: 'Website URL',     placeholder: 'https://example.com',            icon: Globe,          type: 'url' },
  { key: 'street',        label: 'Street',          placeholder: '1 Main Street',                  icon: MapPin },
  { key: 'city',          label: 'City',            placeholder: 'Paris',                          icon: MapPin },
  { key: 'zip',           label: 'ZIP / Postcode',  placeholder: '75001',                          icon: MapPin },
  { key: 'country',       label: 'Country',         placeholder: 'France',                         icon: MapPin },
  { key: 'map_url',       label: 'Map Link (URL)',  placeholder: 'https://maps.google.com/?q=…',   icon: ExternalLink,   type: 'url' },
  { key: 'latitude',      label: 'Latitude',        placeholder: '48.8566',                        icon: MapPin,         type: 'number' },
  { key: 'longitude',     label: 'Longitude',       placeholder: '2.3522',                         icon: MapPin,         type: 'number' },
];

export function RetailerManager() {
  const [retailer, setRetailer] = useState<RetailerRow | null>(null);
  const [form, setForm] = useState<Omit<RetailerRow, 'id'>>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('retailer')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setRetailer(data as RetailerRow);
        setForm(data as Omit<RetailerRow, 'id'>);
      }
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Failed to load retailer data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleChange = (key: keyof Omit<RetailerRow, 'id'>, value: string | boolean | number | null) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMsg('');
    try {
      if (retailer?.id) {
        const { error } = await supabase
          .from('retailer')
          .update({ ...form })
          .eq('id', retailer.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('retailer')
          .insert({ ...form })
          .select()
          .single();
        if (error) throw error;
        setRetailer(data as RetailerRow);
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Save failed.');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg shadow-indigo-500/20">
          <Store className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Retailer Profile</h2>
          <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">
            Store contact info, location and map link
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">

        {/* Active toggle */}
        <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100 dark:border-white/10">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Store is Active</span>
          <button
            onClick={() => handleChange('is_active', !form.is_active)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.is_active ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-700'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${form.is_active ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, placeholder, icon: Icon, type }) => (
            <div key={key} className={type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1">
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 dark:text-slate-600 pointer-events-none" />
                {type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={String(form[key] ?? '')}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-8 pr-3 py-2.5 text-sm font-medium bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 dark:text-white transition-all"
                  />
                ) : (
                  <input
                    type={type ?? 'text'}
                    value={form[key] === null ? '' : String(form[key] ?? '')}
                    onChange={e => {
                      const val = type === 'number' ? (e.target.value === '' ? null : parseFloat(e.target.value)) : e.target.value;
                      handleChange(key, val);
                    }}
                    placeholder={placeholder}
                    className="w-full pl-8 pr-3 py-2.5 text-sm font-medium bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 dark:text-white transition-all"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map URL preview */}
        {form.map_url && (
          <a
            href={form.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Preview map location
          </a>
        )}

        {/* Error */}
        {saveStatus === 'error' && (
          <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/30">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{errorMsg}</p>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
            saveStatus === 'success'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60'
          }`}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saveStatus === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving…' : saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </motion.div>
  );
}
