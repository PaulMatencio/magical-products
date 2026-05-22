/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { AccountModal } from "./AccountModal";
import { RetailerContactModal } from "./RetailerContactModal";
import {
  Sparkles, ShoppingBag, Info, Star, Mail, ArrowRight,
  ChevronRight, Heart, ShieldCheck, Truck, Zap, LogOut, Sun, Moon
} from "lucide-react";
import { ViewState } from "../types/types";
import { useTheme } from "../context/ThemeContext";
import { LandingPageData } from "../types/landingPageData";
import rawData from "../data/landingPageData.json";

const landingPageData = rawData as LandingPageData;

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

  // Helper function to get icon component
  const getIcon = (iconName: string | null) => {
    if (!iconName) return null;
    return iconMap[iconName] || null;
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    if (path.startsWith('images/')) {
      const filename = path.replace('images/', '');
      return new URL(`../images/${filename}`, import.meta.url).href;
    }
    return path;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
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
              const isTrackOrder = link.label === "Track Order";
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.destination === 'contact') {
                      setIsContactModalOpen(true);
                    } else {
                      onNavigate(link.destination as ViewState);
                    }
                  }}
                  className={
                    isTrackOrder
                      ? "text-base font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/60 shadow-sm transition-all hover:scale-105 active:scale-95"
                      : "text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
                  }
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95 group"
              title="Toggle theme"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
              )}
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="hidden lg:flex flex-col items-end mr-2 group cursor-pointer hover:opacity-80 transition-opacity"
                title="View account"
              >
                <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-600 transition-colors">Active Account</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px] underline underline-offset-2 decoration-indigo-300 dark:decoration-indigo-700">{userEmail}</span>
              </button>
            )}

            <button
              onClick={isAuthenticated ? onStartShopping : onSignIn}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
            >
              {isAuthenticated ? 'Enter Store' : 'Sign In'}
            </button>


            {isAuthenticated && (
              <button
                onClick={onSignOut}
                className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
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
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[3rem] shadow-2xl border border-white/50 relative overflow-hidden group">
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={getImageUrl(landingPageData.hero.featuredImage.url)}
                alt={landingPageData.hero.featuredImage.alt}
                className="w-full h-auto rounded-[2rem] shadow-xl relative z-10"
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
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50 transition-colors">
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
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
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
                className="relative aspect-square rounded-[2rem] overflow-hidden shadow-lg group cursor-pointer"
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
      <section className="py-20 px-6 bg-gray-50 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/20">
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
      <footer className="py-20 border-t border-gray-100 dark:border-slate-800 transition-colors">
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
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
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
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
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
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 transition-colors">
                {landingPageData.footer.newsletter.description}
              </p>
              <div className="relative">
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
    </div>
  );
}