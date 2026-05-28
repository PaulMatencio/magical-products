/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Mail, Lock, LogIn, UserPlus, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, Github, Facebook, Globe, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthLogic } from "../presentation/hooks/useAuthLogic";
import { useNavigation } from "../context/NavigationContext";

interface AuthProps {
  onAuthenticated: (user?: any) => void;
}

export function Auth({ onAuthenticated }: AuthProps) {
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
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 overflow-hidden bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-500">
      {/* Ambient glowing spotlight background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] transition-colors duration-500" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] transition-colors duration-500" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[400px] z-10"
      >
        {/* Sleek, simple glassmorphic container */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-black/40 overflow-hidden">
          <div className="p-8">
            
            {/* Header: Logo, Title, and Dynamic Description */}
            <div className="flex flex-col items-center text-center mb-6">
              <button
                onClick={() => navigateTo("landing")}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20 mb-3 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                title="Go to landing page"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
                {mode === "login" && "Welcome back"}
                {mode === "register" && "Create your account"}
                {mode === "reset" && "Reset your password"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 transition-colors duration-500">
                {mode === "login" && "Enter your details to sign in to Magical Products"}
                {mode === "register" && "Get started with your free account today"}
                {mode === "reset" && "We'll send you a link to reset your password"}
              </p>
            </div>

            {/* Error/Success Alerts */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium leading-relaxed animate-fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium leading-relaxed animate-fade-in">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1 shrink-0 animate-pulse" />
                    <span>{success}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-0.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-indigo-500/60 dark:focus:border-indigo-500/60 rounded-xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:bg-white dark:focus:bg-slate-950/80"
                  />
                </div>
              </div>

              {mode !== "reset" && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-0.5">
                    <label className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => { setMode("reset"); setError(null); setSuccess(null); }}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-indigo-500/60 dark:focus:border-indigo-500/60 rounded-xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:bg-white dark:focus:bg-slate-950/80"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-450 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-650 hover:to-purple-700 text-white rounded-xl font-semibold shadow-md shadow-indigo-500/10 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {mode === "reset" ? null : mode === "login" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>
                      {mode === "reset" ? "Send Reset Link" : mode === "login" ? "Sign In" : "Create Account"}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Social Logins Section */}
            {mode !== "reset" && (
              <>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    disabled={socialLoading !== null}
                    className="flex justify-center items-center py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
                    title="Google"
                  >
                    {socialLoading === 'google' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSocialLogin('github')}
                    disabled={socialLoading !== null}
                    className="flex justify-center items-center py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    title="GitHub"
                  >
                    {socialLoading === 'github' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-700 dark:text-white" />
                    ) : (
                      <Github className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={socialLoading !== null}
                    className="flex justify-center items-center py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white"
                    title="Facebook"
                  >
                    {socialLoading === 'facebook' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    ) : (
                      <Facebook className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Footer Options */}
            <div className="flex flex-col items-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
              <button
                onClick={handleGuestLogin}
                disabled={guestLoading}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {guestLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Continue as Guest</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {/* Mode Toggle Footer Link */}
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                {mode === "login" ? "Don't have an account? " : mode === "register" ? "Already have an account? " : ""}
                {mode !== "reset" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "register" : "login");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    {mode === "login" ? "Sign Up" : "Sign In"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                )}
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

