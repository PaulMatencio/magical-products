/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AccountModal } from "./AccountModal";
import { RetailerContactModal } from "./RetailerContactModal";
import { CancelRefundPolicyModal } from "./CancelRefundPolicyModal";
import { Tooltip } from "./Tooltip";
import {
  Sparkles, ShoppingBag, Info, Star, Mail, ArrowRight,
  ChevronRight, Heart, ShieldCheck, Truck, Zap, LogOut, Sun, Moon, History, Menu, X, User, FileText
} from "lucide-react";
import { ViewState, Language } from "../types/types";
import { useTheme } from "../context/ThemeContext";
import { LandingPageData } from "../types/landingPageData";
import { useTranslation } from "react-i18next";
import { supabase } from "../services/supabase";

import rawDataEn from "@/assets/data/landingPageData.json";
import rawDataEs from "@/assets/data/landingPageData_es.json";
import rawDataFr from "@/assets/data/landingPageData_fr.json";
import rawDataIt from "@/assets/data/landingPageData_it.json";

import policyEn from "@/assets/data/cancelAndRefundPolicyData.json";
import policyEs from "@/assets/data/cancelAndRefundPolicyData_es.json";
import policyFr from "@/assets/data/cancelAndRefundPolicyData_fr.json";
import policyIt from "@/assets/data/cancelAndRefundPolicyData_it.json";

const DEFAULT_LANGUAGES: Language[] = [
  { id: 'en-uuid-fallback', code: 'en', name: 'English', native_name: 'English', flag_emoji: '🇬🇧', is_default: true, is_active: true, created_at: '', updated_at: '' },
  { id: 'es-uuid-fallback', code: 'es', name: 'Spanish', native_name: 'Español', flag_emoji: '🇪🇸', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'fr-uuid-fallback', code: 'fr', name: 'French', native_name: 'Français', flag_emoji: '🇫🇷', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'it-uuid-fallback', code: 'it', name: 'Italy', native_name: 'Italiano', flag_emoji: '🇮🇹', is_default: false, is_active: true, created_at: '', updated_at: '' }
];

// Icon mapping object
const iconMap: Record<string, any> = {
  Sparkles, ShoppingBag, Info, Star, Mail, ArrowRight,
  ChevronRight, Heart, ShieldCheck, Truck, Zap, LogOut, Sun, Moon
};

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onStartShopping: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
  userId?: string;
  userEmail?: string;
  isAdmin?: boolean;
  isShipper?: boolean;
  onRecoveryKey?: () => void;
}

export function LandingPage({ onNavigate, onStartShopping, onSignIn, onSignOut, isAuthenticated, userId, userEmail, isAdmin, isShipper, onRecoveryKey }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCancelPolicyModalOpen, setIsCancelPolicyModalOpen] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  useEffect(() => {
    async function loadLanguages() {
      try {
        const { data: langs, error: langsError } = await supabase
          .from('languages')
          .select('*')
          .eq('is_active', true);

        if (langsError) throw langsError;

        const activeLangs = (langs && langs.length > 0) ? langs : DEFAULT_LANGUAGES;
        setLanguages(activeLangs);

        const defaultLang = activeLangs.find(l => l.is_default) || activeLangs[0] || null;
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = activeLangs.find(l => l.code === currentI18nCode) || defaultLang;
        setSelectedLanguage(matchedLang);
      } catch (err) {
        console.error("Error loading languages on landing page:", err);
        setLanguages(DEFAULT_LANGUAGES);
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = DEFAULT_LANGUAGES.find(l => l.code === currentI18nCode) || DEFAULT_LANGUAGES[0];
        setSelectedLanguage(matchedLang);
      }
    }
    loadLanguages();
  }, [i18n.language]);

  const currentLangCode = selectedLanguage?.code || i18n.language || 'en';

  const landingPageData = (() => {
    if (currentLangCode.startsWith('es')) return rawDataEs as LandingPageData;
    if (currentLangCode.startsWith('fr')) return rawDataFr as LandingPageData;
    if (currentLangCode.startsWith('it')) return rawDataIt as LandingPageData;
    return rawDataEn as LandingPageData;
  })();

  const policyData = (() => {
    if (currentLangCode.startsWith('es')) return policyEs;
    if (currentLangCode.startsWith('fr')) return policyFr;
    if (currentLangCode.startsWith('it')) return policyIt;
    return policyEn;
  })();

  // Helper function to get icon component
  const getIcon = (iconName: string | null) => {
    if (!iconName) return null;
    return iconMap[iconName] || null;
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    if (path.startsWith('images/')) {
      const filename = path.replace('images/', '');
      return new URL(`../../assets/images/${filename}`, import.meta.url).href;
    }
    return path;
  };

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-hidden relative z-0">
      {/* ── Base Solid Background Layer ── */}
      <div className="absolute inset-0 -z-20 bg-background transition-colors duration-500" />

      {/* ── Background SVG Shapes ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Soft decorative gradients/orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/25 to-violet-500/25 dark:from-indigo-500/35 dark:to-violet-500/35 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-85 animate-pulse duration-[8s]" />
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/25 to-pink-500/25 dark:from-purple-500/35 dark:to-pink-500/35 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-screen opacity-85 animate-pulse duration-[12s] delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-screen opacity-80 animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 to-rose-500/15 dark:from-amber-500/25 dark:to-rose-500/25 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-80 animate-pulse duration-[14s] delay-500" />

        {/* Elegant SVG grid/wave overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-45 dark:opacity-65 text-slate-300 dark:text-slate-700" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
            </pattern>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Subtle Grid */}
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Flowing waves at viewport heights */}
          <path d="M-100 150 C 300 300, 600 0, 1000 250 C 1400 500, 1700 200, 2100 350" fill="none" stroke="url(#wave-grad-1)" strokeWidth="3" />
          <path d="M-100 450 C 200 300, 500 600, 900 400 C 1300 200, 1600 500, 2100 300" fill="none" stroke="url(#wave-grad-2)" strokeWidth="2" />
          <path d="M-100 700 C 300 850, 600 550, 1000 800 C 1400 1050, 1700 750, 2100 900" fill="none" stroke="url(#wave-grad-1)" strokeWidth="2.5" />
        </svg>
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{landingPageData.brand.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {landingPageData.navigation.links.map((link) => {
              const isTrackOrder = link.destination === 'track_order';
              const isContact = link.destination === 'contact';
              const isCancellationPolicy = link.destination === 'cancellation_policy';
              const displayLabel = isCancellationPolicy ? (policyData.label || link.label) : link.label;

              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (isContact) {
                      setIsContactModalOpen(true);
                    } else if (isCancellationPolicy) {
                      setIsCancelPolicyModalOpen(true);
                    } else {
                      onNavigate(link.destination as ViewState);
                    }
                  }}
                  className={
                    isTrackOrder
                      ? "text-base font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/40 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/60 shadow-sm transition-all hover:scale-105 active:scale-95"
                      : "text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
                  }
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {languages.length > 0 && (
              <div className="relative">
                <select
                  value={selectedLanguage?.code || 'en'}
                  onChange={async (e) => {
                    const targetCode = e.target.value;
                    const targetLang = languages.find(l => l.code === targetCode) || null;
                    setSelectedLanguage(targetLang);
                    await i18n.changeLanguage(targetCode);
                  }}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.code}>
                      {lang.flag_emoji} {lang.code.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Tooltip label="Toggle theme">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95 group"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                ) : (
                  <Moon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                )}
              </button>
            </Tooltip>

            {/* Mobile-only: Track your order shortcut */}
            <Tooltip label="Track your order" className="md:hidden">
              <button
                onClick={() => onNavigate('track_order')}
                className="p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all active:scale-95"
                aria-label="Track your order"
              >
                <History className="w-5 h-5" />
              </button>
            </Tooltip>

            {isAuthenticated && (
              <Tooltip label="My account" className="hidden lg:inline-flex">
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex flex-col items-end mr-2 group cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-600 transition-colors">Active Account</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px] underline underline-offset-2 decoration-indigo-300 dark:decoration-indigo-700">{userEmail}</span>
                </button>
              </Tooltip>
            )}

            <button
              onClick={isAuthenticated ? onStartShopping : onSignIn}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
            >
              {isAuthenticated ? 'Enter Store' : 'Sign In'}
            </button>

            {isAuthenticated && (
              <Tooltip label="Sign out">
                <button
                  onClick={onSignOut}
                  className="hidden md:inline-flex p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 fill-current" />
              {landingPageData.hero.badge.text}
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tighter transition-colors">
              {landingPageData.hero.title.split(landingPageData.hero.highlightedWord)[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {landingPageData.hero.highlightedWord}
              </span>
              {landingPageData.hero.title.split(landingPageData.hero.highlightedWord)[1]}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-lg transition-colors">
              {landingPageData.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {landingPageData.hero.buttons.map((button, idx) => {
                const Icon = button.icon ? getIcon(button.icon) : null;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (button.destination === 'store') {
                        onStartShopping();
                      } else if (button.destination) {
                        onNavigate(button.destination as ViewState);
                      }
                    }}
                    className={`group px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 transition-all ${idx === 0
                      ? 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-black/10'
                      : 'bg-white text-gray-900 border-2 border-gray-100 hover:bg-gray-50'
                      }`}
                  >

                    {button.label}
                    {Icon && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {landingPageData.hero.socialProof.userImages.map((url, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={getImageUrl(url)} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 italic transition-colors">
                Trusted by <span className="text-gray-900 dark:text-white font-black">{landingPageData.hero.socialProof.trustCount}</span> {landingPageData.hero.socialProof.trustText}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/50 to-purple-100/50 blur-[100px] -z-10 rounded-full" />
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[1rem] shadow-2xl border border-white/50 relative overflow-hidden group">
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={getImageUrl(landingPageData.hero.featuredImage.url)}
                alt={landingPageData.hero.featuredImage.alt}
                className="w-full h-auto rounded-[1rem] shadow-xl relative z-10"
              />

              <div className="absolute bottom-12 right-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white dark:border-slate-800 z-20 translate-x-4 group-hover:translate-x-0 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-400 rounded-xl">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      {landingPageData.hero.featuredImage.featuredBadge.label}
                    </p>
                    <p className="font-black text-gray-900 dark:text-white">
                      {landingPageData.hero.featuredImage.featuredBadge.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 py-20 bg-gray-50/60 dark:bg-slate-900/40 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {landingPageData.features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-center mb-6 text-indigo-600 transition-colors">
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Social Proof Section ── */}
      <section className="relative z-10 py-24 bg-white/60 dark:bg-slate-950/40 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 transition-colors">{landingPageData.socialProof.sectionTitle}</h2>
            <p className="text-gray-500 dark:text-gray-400 font-bold transition-colors">{landingPageData.socialProof.sectionDescription}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {landingPageData.socialProof.images.map((url, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                className="relative aspect-square rounded-[1rem] overflow-hidden shadow-lg group cursor-pointer"
              >
                <img src={getImageUrl(url)} alt="Social Feed" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-20 px-6 bg-gray-50/60 dark:bg-slate-900/40 backdrop-blur-xl transition-colors">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[1rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />

          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 relative z-10">
            {landingPageData.cta.title}
          </h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            {landingPageData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {landingPageData.cta.buttons.map((button, idx) => {
              const Icon = button.icon ? getIcon(button.icon) : null;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (button.destination === 'store') {
                      onStartShopping();
                    } else if (button.destination === 'auth') {
                      onSignIn();
                    } else if (button.destination) {
                      onNavigate(button.destination as ViewState);
                    }
                  }}

                  className={`w-full sm:w-auto ${idx === 0
                    ? 'bg-white text-indigo-600 hover:scale-105'
                    : 'bg-indigo-500/30 backdrop-blur-md text-white border border-white/20 hover:bg-indigo-500/50'
                    } px-10 py-5 rounded-2xl font-black text-xl active:scale-95 transition-all flex items-center justify-center gap-3`}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                  {button.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-20 border-t border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-black text-gray-900 dark:text-white transition-colors">{landingPageData.brand.name}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {landingPageData.footer.description}
              </p>
              <div className="flex gap-4">
                {landingPageData.footer.socialLinks.map(social => (
                  <button key={social} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 border-2 border-current rounded-sm" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs transition-colors">Shop</h4>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                {landingPageData.footer.shopLinks.map((link, idx) => (
                  <li
                    key={idx}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => link.destination && onNavigate(link.destination as ViewState)}
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs transition-colors">Company</h4>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                {landingPageData.footer.companyLinks.map((link, idx) => (
                  <li
                    key={idx}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => {
                      if (link.destination === 'contact') {
                        setIsContactModalOpen(true);
                      } else if (link.destination) {
                        onNavigate(link.destination as ViewState);
                      }
                    }}
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs transition-colors">{landingPageData.footer.newsletter.title}</h4>
              <div className="flex flex-row flex-wrap gap-4 items-center justify-between md:flex-col md:items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors max-w-sm flex-1 min-w-[200px]">
                  {landingPageData.footer.newsletter.description}
                </p>
                <div className="relative w-full min-w-[200px] flex-1">
                  <input
                    type="email"
                    placeholder={landingPageData.footer.newsletter.placeholder}
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600 transition-colors text-gray-900 dark:text-white"
                  />
                  <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-50 text-gray-400 text-xs font-bold">
            <p>{landingPageData.footer.copyright}</p>
            <div className="flex gap-8">
              {landingPageData.footer.legalLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => link.destination && onNavigate(link.destination as ViewState)}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {isFloatingMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFloatingMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[90] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="fixed bottom-24 right-6 z-[100] md:hidden w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-100 dark:border-slate-800 rounded-[1rem] shadow-2xl p-4 space-y-1"
            >
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 py-1.5 border-b border-gray-50 dark:border-slate-800/60 mb-2">
                Quick Menu
              </div>

              {/* Enter Store / Sign In */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  if (isAuthenticated) {
                    onStartShopping();
                  } else {
                    onSignIn();
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <span>{isAuthenticated ? 'Enter Store' : 'Sign In'}</span>
              </button>

              {/* Track Order */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  onNavigate('track_order');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
              >
                <History className="w-4 h-4 text-indigo-500" />
                <span>Track Order</span>
              </button>

              {/* Contact Retailer */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Contact Retailer</span>
              </button>

              {/* Cancellation Policy */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  setIsCancelPolicyModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>{policyData.label}</span>
              </button>

              {/* My Account (only if authenticated) */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    setIsAccountModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
                >
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>My Account</span>
                </button>
              )}

              {/* Language Selector */}
              {languages.length > 0 && (
                <div className="w-full px-3 py-2 flex items-center justify-between gap-3 text-sm font-bold text-gray-700 dark:text-gray-200">
                  <span className="shrink-0 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span>Language</span>
                  </span>
                  <select
                    value={selectedLanguage?.code || 'en'}
                    onChange={async (e) => {
                      const targetCode = e.target.value;
                      const targetLang = languages.find(l => l.code === targetCode) || null;
                      setSelectedLanguage(targetLang);
                      await i18n.changeLanguage(targetCode);
                    }}
                    className="px-2 py-1 text-xs font-black uppercase tracking-wider rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.code}>
                        {lang.flag_emoji} {lang.code.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-indigo-500" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>

              {/* Exit / Sign Out (only if authenticated) */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all text-left border border-rose-100 dark:border-rose-950/50 mt-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit / Sign Out</span>
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
        className="fixed bottom-6 right-6 z-[100] md:hidden p-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <motion.div
          animate={{ rotate: isFloatingMenuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isFloatingMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </button>

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userId={userId}
        userEmail={userEmail}
        isAdmin={isAdmin}
        isShipper={isShipper}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
        onRecoveryKey={onRecoveryKey}
      />
      <RetailerContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <CancelRefundPolicyModal
        isOpen={isCancelPolicyModalOpen}
        onClose={() => setIsCancelPolicyModalOpen(false)}
        policyData={policyData}
      />
    </div>
  );
}