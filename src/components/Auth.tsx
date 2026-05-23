/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Mail, Lock, LogIn, UserPlus, Ghost, ArrowRight, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, Github, Facebook, Globe, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthLogic } from "../presentation/hooks/useAuthLogic";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "../context/NavigationContext";

interface AuthProps {
  onAuthenticated: (user?: any) => void;
}

export function Auth({ onAuthenticated }: AuthProps) {
  const { theme } = useTheme();
  const { navigateTo } = useNavigation();
  const {
    mode, setMode,
    email, setEmail,
    password, setPassword,
    loading, socialLoading, guestLoading,
    error, setError, success, setSuccess,
    handleEmailAuth, handleSocialLogin, handleGuestLogin
  } = useAuthLogic(onAuthenticated);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* ── Background Decorations ── */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      </div>

      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/15 blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-cyan-500/10 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Floating stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            className="absolute text-white/10"
            style={{
              top: `${15 + i * 18}%`,
              left: `${10 + i * 20}%`,
            }}
          >
            <Star className="w-4 h-4" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 dark:bg-white/[0.07] backdrop-blur-xl rounded-[1rem] p-[1px] shadow-2xl shadow-indigo-500/10 dark:shadow-black/30 border border-white/20 dark:border-white/[0.06] transition-all">
          <div className="bg-gradient-to-b from-white/40 to-white/10 dark:from-white/[0.12] dark:to-white/[0.04] rounded-[1rem] p-8">

            {/* ── Logo & Title ── */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-5 shadow-lg shadow-indigo-500/30 relative"
              >
                <Sparkles className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse ring-4 ring-cyan-400/20" />
              </motion.div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight transition-colors">Magical Products</h1>
              <p className="text-indigo-600/60 dark:text-indigo-200/60 mt-2 font-medium text-sm transition-colors">Step into a world of wonders</p>
            </div>

            {/* ── Mode Toggle ── */}
            <div className="flex bg-gray-100/50 dark:bg-white/[0.06] p-1 rounded-2xl mb-7 border border-gray-200/50 dark:border-white/[0.06] transition-colors">
              <button
                onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${mode === "login"
                  ? "bg-white dark:bg-white/[0.12] text-gray-900 dark:text-white shadow-sm backdrop-blur-sm"
                  : "text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60"
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode("register"); setError(null); setSuccess(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${mode === "register"
                  ? "bg-white dark:bg-white/[0.12] text-gray-900 dark:text-white shadow-sm backdrop-blur-sm"
                  : "text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60"
                  }`}
              >
                Create Account
              </button>
            </div>

            {/* ── Error Alert ── */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-rose-200 font-medium leading-snug">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Success Alert ── */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <p className="text-sm text-emerald-200 font-medium leading-snug">{success}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form ── */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-[0.15em] pl-1 transition-colors">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/20 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wonder@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/[0.08] rounded-xl outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 text-sm"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {mode !== "reset" && (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-[0.15em] transition-colors">Password</label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => { setMode("reset"); setError(null); setSuccess(null); }}
                          className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 uppercase tracking-[0.15em] transition-colors"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/20 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/[0.08] rounded-xl outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 dark:text-white/20 hover:text-gray-600 dark:hover:text-white/50 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {mode === "reset" ? null : mode === "login" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {mode === "reset" ? "Send Reset Link" : mode === "login" ? "Enter the Store" : "Create Account"}
                  </>
                )}
              </button>

              {mode === "reset" && (
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                  className="w-full text-center text-sm font-bold text-white/40 hover:text-white/60 transition-colors"
                >
                  Back to Login
                </button>
              )}
            </form>

            {/* ── Divider ── */}
            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/[0.06]"></div>
              </div>
              <span className="relative px-4 bg-transparent text-[10px] font-bold text-gray-400 dark:text-white/25 uppercase tracking-[0.2em] transition-colors">
                <span className={`${theme === 'dark' ? 'bg-[#1a1a3e]' : 'bg-white'} px-3 py-1 rounded-full transition-colors`}>Or continue with</span>
              </span>
            </div>

            {/* ── Social Buttons ── */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => handleSocialLogin('google')}
                className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:border-indigo-200 dark:hover:border-white/[0.12] transition-all font-bold text-gray-400 dark:text-white/50 gap-1.5 group"
              >
                {socialLoading === 'google' ? <Loader2 className="w-5 h-5 animate-spin text-indigo-500" /> : <Globe className="w-5 h-5 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors" />}
                <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors">Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('github')}
                className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all font-bold text-gray-400 dark:text-white/50 gap-1.5 group"
              >
                {socialLoading === 'github' ? <Loader2 className="w-5 h-5 animate-spin text-gray-700 dark:text-white" /> : <Github className="w-5 h-5 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />}
                <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors">GitHub</span>
              </button>

              <button
                onClick={() => handleSocialLogin('facebook')}
                className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:border-blue-200 dark:hover:border-white/[0.12] transition-all font-bold text-gray-400 dark:text-white/50 gap-1.5 group"
              >
                {socialLoading === 'facebook' ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <Facebook className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />}
                <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors">Facebook</span>
              </button>
            </div>

            {/* ── Guest Button & Captcha ── */}
            <div className="flex flex-col items-center gap-4 mt-2">
              {/* <HCaptcha
                sitekey={appConfig.hCaptchaSiteKey}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
              /> */}
              <button
                onClick={handleGuestLogin}
                disabled={guestLoading /* || !captchaToken */}
                className="w-full py-3.5 bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-white/60 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/[0.10] hover:text-gray-700 dark:hover:text-white/80 hover:border-gray-300 dark:hover:border-white/[0.12] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 text-sm group"
              >
                {guestLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Ghost className="w-5 h-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    Start as a Guest
                    {/* {captchaToken ? "Start as a Guest" : "Verify Captcha First"} */}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* ── Continue Browsing ── */}
            <button
              onClick={() => navigateTo('store')}
              className="w-full mt-4 py-3 text-gray-400 dark:text-white/30 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Continue Browsing Without Signing In
            </button>

            {/* ── Footer Link ── */}
            <p className="mt-4 text-center text-gray-400 dark:text-white/25 text-sm font-medium transition-colors">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
