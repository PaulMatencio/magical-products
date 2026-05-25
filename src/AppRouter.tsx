import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Loader2, Sparkles, Lock, ShieldAlert, KeyRound, Eye, EyeOff, UserPlus, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { useAuth } from './context/AuthContext';
import { useNavigation } from './context/NavigationContext';
import { useInventory } from './context/InventoryContext';
import { useOrderLogic } from './presentation/hooks/useOrderLogic';
import { useRealtimeSync } from './presentation/hooks/useRealtimeSync';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import { useDependencies } from './context/DependenciesContext';
import { Auth } from './components/Auth';
import { LandingPage } from './components/LandingPage';
import { Toast } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ViewState } from './types/types';



// Lazy Loaded Feature Modules
const StoreView = React.lazy(() => import('./features/store/StoreView').then(m => ({ default: m.StoreView })));
const AdminDashboard = React.lazy(() => import('./features/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ShipperDashboard = React.lazy(() => import('./features/shipper/ShipperDashboard').then(m => ({ default: m.ShipperDashboard })));
const OperatorDashboard = React.lazy(() => import('./features/operator/Dashboard').then(m => ({ default: m.Dashboard })));
const BarcodeProductScanner = React.lazy(() => import('./features/operator/BarcodeProductScanner').then(m => ({ default: m.BarcodeProductScanner })));
const Cart = React.lazy(() => import('./features/store/components/Cart').then(m => ({ default: m.Cart })));
const Checkout = React.lazy(() => import('./features/store/components/Checkout').then(m => ({ default: m.Checkout })));
const SuccessPage = React.lazy(() => import('./features/store/components/SuccessPage').then(m => ({ default: m.SuccessPage })));
const OrderHistory = React.lazy(() => import('./features/store/components/OrderHistory').then(m => ({ default: m.OrderHistory })));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import('./components/TermsOfService').then(m => ({ default: m.TermsOfService })));
const GuestOrderTracking = React.lazy(() => import('./features/store/components/GuestOrderTracking').then(m => ({ default: m.GuestOrderTracking })));
import { CookieConsent } from './components/CookieConsent';

/**
 * Premium Loading Fallback for Lazy Modules
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse" />
        <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin relative z-10" />
      </div>
      <div className="mt-6 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <p className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
          Loading Magic...
        </p>
      </div>
    </div>
  );
}

// Utils
import { supabase } from './services/supabase';

export function AppRouter() {
  const { user, isAuthLoading, isAdmin, isShipper, isOperator, signOut, signInAnonymously, updatePassword } = useAuth();





  const { view, navigateTo } = useNavigation();
  const { loadInventory } = useInventory();
  const { orders, setOrders, loadOrders, createOrder, updateShippingAddress, deleteOrder } = useOrderLogic();
  const notifiedRef = useRef<Record<string, string>>({});
  const { realtimeError, setRealtimeError } = useRealtimeSync(setOrders, notifiedRef);
  const [showRealtimeFix, setShowRealtimeFix] = useState(false);
  const { cart, clearCart, isCheckingOut, setIsCartOpen } = useCart();
  const { theme } = useTheme();
  const { accountUseCase } = useDependencies();

  const cartTotal = useMemo(() => cart.reduce((sum, item) => {
    const effectivePrice = item.discount_percentage && item.discount_percentage > 0
      ? item.price * (1 - item.discount_percentage / 100)
      : item.price;
    return sum + (effectivePrice * item.cart_quantity);
  }, 0), [cart]);

  const [isRecovering, setIsRecovering] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeEmail, setUpgradeEmail] = useState('');
  const [upgradePassword, setUpgradePassword] = useState('');
  const [showUpgradePassword, setShowUpgradePassword] = useState(false);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const guestLandingRef = useRef(false);

  useEffect(() => {
    if (!isAuthLoading) {
      let targetView: ViewState | null = null;

      if (user) {
        // Multi-role users: Establish priority to prevent redirection fighting
        if (isAdmin) {
          if (view !== 'admin_dashboard' && view !== 'operator_dashboard' && view !== 'barcode_scanner') targetView = 'admin_dashboard';
        } else if (isShipper) {
          if (view !== 'shipper_dashboard') targetView = 'shipper_dashboard';
        } else if (isOperator) {
          if (view !== 'operator_dashboard' && view !== 'barcode_scanner') targetView = 'operator_dashboard';
        }
      } else {
        const publicViews: ViewState[] = ['landing', 'auth', 'store', 'about', 'best_sellers', 'contact', 'privacy', 'terms', 'track_order'];
        if (!publicViews.includes(view)) {
          targetView = 'landing';
        }
      }

      if (targetView && targetView !== view) {
        console.log(`AppRouter: Redirecting to ${targetView}`);
        navigateTo(targetView);
      }
    }
  }, [user, isAdmin, isShipper, isOperator, isAuthLoading, navigateTo, view]);

  // Initial Inventory Load
  useEffect(() => {
    loadInventory(false, () => {
      console.log("[AppRouter] 🛒 Abandoned cart restored, clearing in-memory cart...");
      clearCart();
    });
  }, [loadInventory, clearCart]);


  useEffect(() => {
    if (user && view === 'history') {
      loadOrders();
    }
  }, [user, view, loadOrders]);

  const clearNotification = () => setNotification(null);

  const handleSignOut = async (ref: React.MutableRefObject<boolean>) => {
    try {
      ref.current = false;
      await signOut();
      navigateTo('landing');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleStartShopping = () => {
    // Just navigate to the store — no session is created here.
    // If the user tries to add items without signing in, the CartContext
    // will toast them and redirect to the auth page.
    navigateTo('store');
  };


  const handleSignIn = () => {
    navigateTo('auth');
  };


  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    try {
      await updatePassword(newPassword);
      toast.success('Password updated successfully!');
      setIsRecovering(false);
      setNewPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleUpgradeAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingUpgrade(true);
    try {
      await accountUseCase.upgradeAccount(upgradeEmail, upgradePassword);
      toast.success("Account permanently saved!");
      setIsUpgrading(false);
      setUpgradeEmail('');
      setUpgradePassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save account');
    } finally {
      setIsProcessingUpgrade(false);
    }
  };

  const renderView = () => {
    if (isAuthLoading) return <LoadingFallback />;

    switch (view) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={navigateTo}
            onStartShopping={handleStartShopping}
            onSignIn={handleSignIn}
            onSignOut={() => handleSignOut(guestLandingRef)}
            isAuthenticated={!!user && !guestLandingRef.current}
            userId={user?.id}
            userEmail={user?.email}
            isAdmin={isAdmin}
            isShipper={isShipper}
            onRecoveryKey={user && !user.is_anonymous ? () => setIsRecovering(true) : undefined}
          />

        );
      case 'auth':
        return (
          <Auth
            onAuthenticated={() => {
              guestLandingRef.current = false;
              navigateTo('store');
            }}
          />

        );
      case 'admin_dashboard':
        return isAdmin ? (
          <AdminDashboard
            onBackToStore={() => {
              setIsCartOpen(false);
              navigateTo("store");
            }}
            onSignOut={() => handleSignOut(guestLandingRef)}
          />
        ) : (
          <AccessDeniedView color="rose" title="Admin" />
        );
      case 'shipper_dashboard':
        return isShipper ? (
          <ShipperDashboard
            onBackToStore={() => {
              setIsCartOpen(false);
              navigateTo("store");
            }}
            onSignOut={() => handleSignOut(guestLandingRef)}
          />
        ) : (
          <AccessDeniedView color="blue" title="Shipper" />
        );
      case 'operator_dashboard':
        return (isOperator || import.meta.env.DEV) ? (
          <OperatorDashboard
            onBackToStore={() => {
              setIsCartOpen(false);
              navigateTo("store");
            }}
            onSignOut={() => handleSignOut(guestLandingRef)}
            onOpenScanner={() => navigateTo('barcode_scanner')}
          />
        ) : (
          <AccessDeniedView color="indigo" title="Operator" />
        );
      case 'barcode_scanner':
        return (isOperator || isAdmin || import.meta.env.DEV) ? (
          <BarcodeProductScanner
            onBack={() => navigateTo('operator_dashboard')}
          />
        ) : (
          <AccessDeniedView color="indigo" title="Operator" />
        );
      case 'checkout':
        return (
          <Checkout
            onBack={() => {
              setIsCartOpen(false);
              navigateTo('store');
            }}
            onComplete={async (method, addr, phone, upgradeData, invoiceEmail) => {
              isCheckingOut.current = true;
              try {
                if (upgradeData) {
                  await accountUseCase.upgradeAccount(upgradeData.email, upgradeData.password);
                  toast.success("Account permanently saved!");
                }
                const order = await createOrder(cart, cartTotal, method, addr, phone);
                if (order) {
                  clearCart();
                  setIsCartOpen(false);
                  sessionStorage.setItem('last_order_id', order.id);

                  // Auto-send invoice if user provided an email (or if registered, use their account email)
                  const targetEmail = invoiceEmail || ((user && !user.is_anonymous) ? user.email : undefined);
                  if (targetEmail) {
                    const { sendInvoiceToEmail } = await import('./utils/invoiceGenerator');
                    sendInvoiceToEmail(order, targetEmail);
                  }

                  navigateTo('success');
                }
              } catch (err: any) {
                toast.error(err.message || "Failed to place order.");
              } finally {
                isCheckingOut.current = false;
              }
            }}
          />
        );
      case 'history':
        return (
          <OrderHistory
            orders={orders}
            onBack={() => navigateTo('store')}
            onUpdateOrders={loadOrders}
            updateShippingAddress={updateShippingAddress}
            deleteOrder={deleteOrder}
          />
        );
      case 'success':
        return (
          <SuccessPage
            onHome={() => {
              setIsCartOpen(false);
              navigateTo("store");
            }}
            onHistory={() => {
              setIsCartOpen(false);
              navigateTo("history");
            }}
          />
        );
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'track_order':
        return <GuestOrderTracking />;
      case 'store':
      default:
        return (
          <StoreView
            onSignOut={() => handleSignOut(guestLandingRef)}
            setIsRecovering={setIsRecovering}
            setIsUpgrading={setIsUpgrading}
            realtimeError={realtimeError}
            setRealtimeError={setRealtimeError}
            showRealtimeFix={showRealtimeFix}
            setShowRealtimeFix={setShowRealtimeFix}
          />
        );
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-background font-sans transition-colors duration-500 text-gray-900 dark:text-gray-100">
        <Toaster position="top-center" richColors theme={theme === 'dark' ? 'dark' : 'light'} />

        {renderView()}

        <CookieConsent />
        {view === 'store' && (
          <Cart
            onCheckout={() => navigateTo('checkout')}
          />
        )}


        <AnimatePresence>
          {isRecovering && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-[1rem] p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-blue-50 dark:bg-blue-900/30 rounded-[1rem] mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Set New Password</h2>
                </div>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <KeyRound className="w-3 h-3" /> New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showRecoveryPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 dark:text-white"
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowRecoveryPassword(!showRecoveryPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                        {showRecoveryPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setIsRecovering(false)} className="flex-1 py-4 px-6 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all">
                      Cancel
                    </button>
                    <button type="submit" disabled={isUpdatingPassword} className="flex-2 py-4 px-10 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                      {isUpdatingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Update
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {isUpgrading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-[1rem] p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-[1rem] mb-4">
                    <UserPlus className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Save Account</h2>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Create an account to save your order history permanently.</p>
                </div>
                <form onSubmit={handleUpgradeAccount} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={upgradeEmail}
                        onChange={(e) => setUpgradeEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <KeyRound className="w-3 h-3" /> Password
                    </label>
                    <div className="relative">
                      <input
                        type={showUpgradePassword ? "text" : "password"}
                        required
                        value={upgradePassword}
                        onChange={(e) => setUpgradePassword(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 dark:text-white"
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowUpgradePassword(!showUpgradePassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors">
                        {showUpgradePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setIsUpgrading(false)} className="flex-1 py-4 px-6 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all">
                      Cancel
                    </button>
                    <button type="submit" disabled={isProcessingUpgrade} className="flex-2 py-4 px-10 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                      {isProcessingUpgrade ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <OfflineIndicator />
        {notification && <Toast message={notification.message} type={notification.type} onClose={clearNotification} />}
      </div>
    </Suspense>
  );
}

function AccessDeniedView({ color, title }: { color: string, title: string }) {
  const { navigateTo } = useNavigation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <ShieldAlert className={`w-16 h-16 text-${color}-500 mb-4`} />
      <h2 className="text-2xl font-black mb-2">Access Denied</h2>
      <p className="text-gray-500 mb-6">You do not have {title.toLowerCase()} privileges.</p>
      <button onClick={() => navigateTo('store')} className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold">Back to Store</button>
    </div>
  );
}
