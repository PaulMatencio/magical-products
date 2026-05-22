/**
 * AccountModal – displays on the Landing page when an authenticated user
 * clicks their "Active Account" badge. Shows profile, address and phone,
 * and allows inline editing.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, User, Mail, ShoppingBag, Key, LogOut, ShieldCheck, Truck,
  History, MapPin, Phone, Pencil, Check, Loader2, ChevronRight
} from "lucide-react";
import { ViewState } from "../types/types";
import { supabase } from "../services/supabase";

interface ProfileData {
  name: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
}

const EMPTY_PROFILE: ProfileData = { name: "", street: "", city: "", zip: "", phone: "" };

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userEmail?: string;
  isAdmin?: boolean;
  isShipper?: boolean;
  onNavigate: (view: ViewState) => void;
  onSignOut: () => void;
  onRecoveryKey?: () => void;
}

export function AccountModal({
  isOpen,
  onClose,
  userId,
  userEmail,
  isAdmin,
  isShipper,
  onNavigate,
  onSignOut,
  onRecoveryKey,
}: AccountModalProps) {
  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE);
  const [editData, setEditData] = useState<ProfileData>(EMPTY_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const username = userEmail?.split("@")[0] ?? "User";

  // ── Fetch profile from user_roles ──────────────────────────────
  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setIsLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("name, street, city, zip, phone")
        .eq("user_id", userId)
        .maybeSingle();
      if (!error && data) {
        const p: ProfileData = {
          name: data.name || "",
          street: data.street || "",
          city: data.city || "",
          zip: data.zip || "",
          phone: data.phone || "",
        };
        setProfile(p);
        setEditData(p);
      }
    } catch (e) {
      console.error("AccountModal: failed to fetch profile", e);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen) fetchProfile();
  }, [isOpen, fetchProfile]);

  // ── Save changes ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const { error } = await supabase
        .from("user_roles")
        .update({
          name: editData.name,
          street: editData.street,
          city: editData.city,
          zip: editData.zip,
          phone: editData.phone,
        })
        .eq("user_id", userId);
      if (error) throw error;
      setProfile(editData);
      setIsEditing(false);
    } catch (e: any) {
      setSaveError(e.message ?? "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const hasAddress = profile.street || profile.city || profile.zip;
  const hasContact = profile.phone;

  const handleNavigate = (view: ViewState) => { onClose(); onNavigate(view); };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed top-24 right-6 z-[210] w-88 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
            style={{ width: "22rem" }}
          >
            {/* ── Header ── */}
            <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-indigo-600 to-purple-700">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3 shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-0.5">Active Account</p>
              <p className="text-lg font-black text-white leading-tight">{profile.name || username}</p>
              <p className="text-xs text-indigo-200 font-medium flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />{userEmail}
              </p>

              <div className="flex gap-2 mt-3">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/15 text-white uppercase tracking-widest">
                  {isAdmin ? "Admin" : isShipper ? "Shipper" : "Customer"}
                </span>
              </div>
            </div>

            {/* ── Profile / Address section ── */}
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">
                  Profile & Address
                </span>
                {!isEditing && (
                  <button
                    onClick={() => { setIsEditing(true); setSaveError(null); }}
                    className="flex items-center gap-1 text-[10px] font-black text-indigo-500 hover:text-indigo-700 transition-colors uppercase tracking-widest"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {isLoadingProfile ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                </div>
              ) : isEditing ? (
                /* ── Edit form ── */
                <div className="space-y-2 pb-1">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Jane Doe" },
                    { key: "street", label: "Street", placeholder: "123 Main St" },
                    { key: "city", label: "City", placeholder: "Paris" },
                    { key: "zip", label: "ZIP / Postcode", placeholder: "75001" },
                    { key: "phone", label: "Phone", placeholder: "+33 6 00 00 00 00" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-0.5">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={editData[key as keyof ProfileData]}
                        onChange={(e) => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 dark:text-white transition-all"
                      />
                    </div>
                  ))}

                  {saveError && (
                    <p className="text-xs text-rose-500 font-bold">{saveError}</p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all disabled:opacity-60"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      {isSaving ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditData(profile); setSaveError(null); }}
                      className="flex-1 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-black rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Read-only display ── */
                <div className="space-y-2 pb-1">
                  {hasAddress ? (
                    <div className="flex items-start gap-2.5 px-3 py-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl">
                      <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        {profile.name && <p className="text-sm font-bold text-gray-900 dark:text-white">{profile.name}</p>}
                        {profile.street && <p className="text-xs text-gray-500 dark:text-gray-400">{profile.street}</p>}
                        {(profile.city || profile.zip) && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{[profile.zip, profile.city].filter(Boolean).join(" ")}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 border border-dashed border-gray-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all"
                    >
                      <MapPin className="w-4 h-4" /> Add your address
                    </button>
                  )}

                  {hasContact ? (
                    <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl">
                      <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{profile.phone}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 border border-dashed border-gray-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all"
                    >
                      <Phone className="w-4 h-4" /> Add your phone number
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── Navigation actions ── */}
            <div className="px-3 py-2 border-t border-gray-50 dark:border-slate-800 space-y-0.5">
              {[
                { label: "Browse Store", view: "store" as ViewState, icon: ShoppingBag, color: "indigo" },
                { label: "Order History", view: "history" as ViewState, icon: History, color: "purple" },
              ].map(({ label, view, icon: Icon, color }) => (
                <button
                  key={view}
                  onClick={() => handleNavigate(view)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-${color}-50 dark:hover:bg-${color}-900/20 hover:text-${color}-600 dark:hover:text-${color}-400 transition-all group`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 text-gray-400 group-hover:text-${color}-500 transition-colors`} />
                    {label}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600" />
                </button>
              ))}

              {onRecoveryKey && (
                <button
                  onClick={() => { onClose(); onRecoveryKey(); }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    Recovery Key
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600" />
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleNavigate("admin_dashboard")}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    Admin Panel
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600" />
                </button>
              )}

              {isShipper && (
                <button
                  onClick={() => handleNavigate("shipper_dashboard")}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-sky-400" />
                    Shipper Panel
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600" />
                </button>
              )}
            </div>

            {/* ── Sign out ── */}
            <div className="px-3 pb-3">
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group"
              >
                <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
