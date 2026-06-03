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
import { ViewState, Order } from './types/types';
import appConfig from './config/appConfig';



// Lazy Loaded Feature Modules
const StoreView = React.lazy(() => import('./features/store/StoreView').then(m => ({ default: m.StoreView })));
const AdminDashboard = React.lazy(() => import('./features/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ShipperDashboard = React.lazy(() => import('./features/shipper/ShipperDashboard').then(m => ({ default: m.ShipperDashboard })));
const OwnerDashboard = React.lazy(() => import('./features/owner/OwnerDashboard').then(m => ({ default: m.OwnerDashboard })));
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
  const { user, isAuthLoading, isAdmin, isShipper, isOperator, isOwner, signOut, signInAnonymously, updatePassword } = useAuth();





  const { view, navigateTo } = useNavigation();
  const { loadInventory, syncInventoryDecrement } = useInventory();
  const { orders, setOrders, loadOrders, createOrder, updateShippingAddress, deleteOrder } = useOrderLogic();
  const notifiedRef = useRef<Record<string, string>>({});
  const { realtimeError, setRealtimeError } = useRealtimeSync(setOrders, notifiedRef);
  const [showRealtimeFix, setShowRealtimeFix] = useState(false);
  const { cart, clearCart, isCheckingOut, setIsCartOpen, setCart } = useCart();
  const { theme } = useTheme();
  const { authRepository, accountUseCase } = useDependencies();

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
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const guestLandingRef = useRef(false);

  useEffect(() => {
    if (!isAuthLoading) {
      let targetView: ViewState | null = null;

      if (user) {
        // Multi-role users: Establish priority to prevent redirection fighting
        if (isAdmin) {
          if (view !== 'admin_dashboard' && view !== 'operator_dashboard' && view !== 'barcode_scanner') targetView = 'admin_dashboard';
        } else if (isOwner) {
          if (view !== 'owner_dashboard') targetView = 'owner_dashboard';
        } else if (isShipper) {
          if (view !== 'shipper_dashboard') targetView = 'shipper_dashboard';
        } else if (isOperator) {
          if (view !== 'operator_dashboard' && view !== 'barcode_scanner') targetView = 'operator_dashboard';
        }
      } else {
        const publicViews: ViewState[] = ['landing', 'auth', 'store', 'about', 'best_sellers', 'contact', 'privacy', 'terms', 'track_order', 'checkout', 'success', 'history'];
        if (!publicViews.includes(view)) {
          targetView = 'landing';
        }
      }

      if (targetView && targetView !== view) {
        console.log(`AppRouter: Redirecting to ${targetView}`);
        navigateTo(targetView);
      }
    }
  }, [user, isAdmin, isShipper, isOperator, isOwner, isAuthLoading, navigateTo, view]);

  // Initial Inventory Load
  useEffect(() => {
    loadInventory(false, () => {
      console.log("[AppRouter] 🛒 Abandoned cart restored, clearing in-memory cart...");
      clearCart();
    });
  }, [loadInventory, clearCart]);

  // Stripe Success and Cancel Handler
  useEffect(() => {
    if (isAuthLoading) return;

    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('payment_id');
    const sessionId = params.get('session_id');
    const viewParam = params.get('view');
    const redirectStatus = params.get('redirect_status');

    if (redirectStatus === 'failed' || redirectStatus === 'canceled') {
      window.history.replaceState({}, document.title, window.location.pathname);
      navigateTo('checkout');
      toast.error("Payment was cancelled or failed. You have been routed back to checkout.");

      if (paymentId) {
        const handleCancel = async () => {
          try {
            // Fetch payment record to obtain the associated order_id
            const { data: paymentRecord } = await supabase
              .from('payments')
              .select('order_id')
              .eq('id', paymentId)
              .maybeSingle();

            // Mark payment status as cancelled
            const { error: updateError } = await supabase
              .from('payments')
              .update({ provider_status: 'cancelled', completed_at: new Date().toISOString() })
              .eq('id', paymentId);
            if (updateError) console.error("Failed to mark payment as cancelled:", updateError);

            // If there's an associated order, cancel it to release inventory
            if (paymentRecord?.order_id) {
              const { error: cancelOrderError } = await supabase.rpc('cancel_order_with_inventory', {
                p_order_id: paymentRecord.order_id
              });
              if (cancelOrderError) {
                console.error("Failed to cancel order via RPC on cancel redirect:", cancelOrderError);
              }
            }
          } catch (err) {
            console.error("Error handling payment cancellation on redirect:", err);
          }
        };
        handleCancel();
      }
      return;
    }

    if (viewParam === 'checkout') {
      window.history.replaceState({}, document.title, window.location.pathname);
      navigateTo('checkout');
      toast.error("Payment was cancelled or failed. You have been routed back to checkout.");

      const cancelPaymentId = params.get('payment_id');
      if (cancelPaymentId) {
        const handleCancel = async () => {
          try {
            // Fetch payment record to obtain the associated order_id
            const { data: paymentRecord } = await supabase
              .from('payments')
              .select('order_id')
              .eq('id', cancelPaymentId)
              .maybeSingle();

            // Mark payment status as cancelled
            const { error: updateError } = await supabase
              .from('payments')
              .update({ provider_status: 'cancelled', completed_at: new Date().toISOString() })
              .eq('id', cancelPaymentId);
            if (updateError) console.error("Failed to mark payment as cancelled:", updateError);

            // If there's an associated order, cancel it to release inventory and restore cart
            if (paymentRecord?.order_id) {
              // Fetch order details first to get the items
              const { data: orderData } = await supabase
                .from('orders')
                .select('items')
                .eq('id', paymentRecord.order_id)
                .maybeSingle();

              const { error: cancelOrderError } = await supabase.rpc('cancel_order_with_inventory', {
                p_order_id: paymentRecord.order_id
              });

              if (cancelOrderError) {
                console.error("Failed to cancel order via RPC on cancel redirect:", cancelOrderError);
              } else {
                console.log("Associated order cancelled and inventory restored in DB:", paymentRecord.order_id);

                if (orderData?.items) {
                  const orderItems = orderData.items as any[];

                  // Re-populate the cart and decrement the stock back (since the items are back in the cart)
                  for (const item of orderItems) {
                    const qty = item.quantity || item.cart_quantity || 1;
                    for (let i = 0; i < qty; i++) {
                      try {
                        await syncInventoryDecrement(item.id);
                      } catch (decErr) {
                        console.error("Failed to decrement inventory on cart restoration:", decErr);
                      }
                    }
                  }

                  // Map order items to CartItem format
                  const restoredCart = orderItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    cart_quantity: item.quantity || item.cart_quantity || 1,
                    image_url: item.image_url,
                    discount_percentage: item.discount_percentage || 0
                  })) as any[];

                  setCart(restoredCart);
                }
              }
            }
          } catch (err) {
            console.error("Error handling payment cancellation on redirect:", err);
          }
        };
      }
    }
    if (paymentId) {
      const confirmPayment = async () => {
        setIsVerifyingPayment(true);
        try {
          const { data: paymentRecord } = await supabase
            .from('payments')
            .select('provider')
            .eq('id', paymentId)
            .maybeSingle();

          const provider = paymentRecord?.provider || 'stripe';
          const endpointName = (provider === 'wero' || provider === 'worldline')
            ? 'wero-checkout'
            : (appConfig.activeFiatGateway === 'adyen' ? 'adyen-checkout' : 'stripe-checkout');

          const { data: verifyData, error: verifyError } = await supabase.functions.invoke(endpointName, {
            body: {
              action: 'confirm',
              payment_id: paymentId,
              session_id: sessionId || undefined
            }
          });
 
          if (verifyError || !verifyData) {
            throw new Error(verifyError?.message || `Failed to verify payment status.`);
          }
 
          if (verifyData.status === 'succeeded') {
            const orderId = verifyData.order_id;
            if (orderId) {
              sessionStorage.setItem('last_order_id', orderId);
              clearCart();
              setIsCartOpen(false);
              navigateTo('success');
              toast.success(`${appConfig.activeFiatGateway === 'adyen' ? 'Adyen' : 'Stripe'} payment confirmed successfully!`);
            } else {
              throw new Error("Payment succeeded but order could not be resolved.");
            }
          } else {
            // Payment is not succeeded (e.g. pending, open, cancelled, failed)
            navigateTo('checkout');
            let errMsg = verifyData.error;
            if (!errMsg) {
              if (verifyData.status === 'open' || verifyData.status === 'incomplete') {
                errMsg = "Payment was not completed. You can try again.";
              } else {
                errMsg = `Payment not confirmed. Status: ${verifyData.status || 'unknown'}`;
              }
            }
            toast.error(errMsg);
          }
        } catch (e: any) {
          console.error("Payment confirmation error:", e);
          navigateTo('checkout');
          toast.error(`${appConfig.activeFiatGateway === 'adyen' ? 'Adyen' : 'Stripe'} verification failed: ${e.message || 'Please contact support.'}`);
        } finally {
          setIsVerifyingPayment(false);
          // Clear URL search params
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      };
      confirmPayment();
    }
  }, [isAuthLoading, navigateTo, clearCart, setIsCartOpen]);


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

    if (isVerifyingPayment) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin relative z-10" />
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <p className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest animate-pulse">
              Verifying Stripe Payment...
            </p>
          </div>
        </div>
      );
    }

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
      case 'owner_dashboard':
        return isOwner ? (
          <OwnerDashboard
            onBackToStore={() => {
              setIsCartOpen(false);
              navigateTo("store");
            }}
            onSignOut={() => handleSignOut(guestLandingRef)}
          />
        ) : (
          <AccessDeniedView color="violet" title="Business Owner" />
        );
      case 'checkout':
        return (
          <Checkout
            onBack={() => {
              setIsCartOpen(false);
              navigateTo('store');
            }}
            onInitiateStripe={async (addr, phone, upgradeData, invoiceEmail) => {
              try {
                if (upgradeData) {
                  await accountUseCase.upgradeAccount(upgradeData.email, upgradeData.password);
                  toast.success("Account permanently saved!");
                }
 
                let currentUserId = user?.id || user?.$id;
                if (!currentUserId) {
                  try {
                    const sessionData = await authRepository.getSession();
                    currentUserId = sessionData?.data?.user?.id;
                  } catch (e) {
                    console.warn("Failed to get session for payment record:", e);
                  }
                }
 
                if (!currentUserId) {
                  throw new Error("User session could not be established.");
                }
 
                const paymentType = 'fiat';
                const providerName = appConfig.activeFiatGateway === 'adyen' ? 'adyen' : 'stripe';
                const providerPaymentId = `${providerName === 'adyen' ? 'ady_pending_' : 'pi_pending_'}${Date.now()}`;
                const amountRequested = Math.round(cartTotal * 100); // in cents
 
                const { data: paymentRecord, error: paymentError } = await supabase
                  .from('payments')
                  .insert([{
                    user_id: currentUserId,
                    payment_type: paymentType,
                    provider: providerName,
                    provider_payment_id: providerPaymentId,
                    provider_status: 'pending',
                    amount_requested: amountRequested,
                    amount_paid: 0,
                    requested_currency: 'EUR',
                    initiated_at: new Date().toISOString(),
                    completed_at: null,
                    metadata: {
                      checkout_method: providerName,
                      is_sandbox: true,
                      invoice_email: invoiceEmail || null,
                      shipping_address: addr,
                      user_phone: phone,
                      cart: cart
                    }
                  }])
                  .select()
                  .single();
 
                if (paymentError || !paymentRecord) {
                  throw new Error(paymentError?.message || "Failed to create payment record.");
                }
 
                const paymentId = (paymentRecord as any).id;
 
                // Pre-create the order to link with the payment record immediately
                const order = await createOrder(cart, cartTotal, providerName, addr, phone, paymentId);
                if (order) {
                  await supabase
                    .from('payments')
                    .update({ order_id: order.id })
                    .eq('id', paymentId);
                }
 
                if (appConfig.activeFiatGateway === 'adyen') {
                  try {
                    const { data: sessionData, error: sessionError } = await supabase.functions.invoke('adyen-checkout', {
                      body: {
                        payment_id: paymentId,
                        cart: cart,
                        invoice_email: invoiceEmail,
                        payment_method: 'adyen'
                      }
                    });
                    if (sessionError || !sessionData?.sessionData) {
                      throw new Error(sessionError?.message || "Failed to generate Adyen session.");
                    }
                    return {
                      clientSecret: sessionData.sessionData,
                      paymentId: paymentId,
                      orderId: order?.id
                    };
                  } catch (err) {
                    console.warn("adyen-checkout invocation failed, using sandbox fallback sessionData.", err);
                    return {
                      clientSecret: `adyen_mock_session_${Math.random().toString(36).substring(7)}`,
                      paymentId: paymentId,
                      orderId: order?.id
                    };
                  }
                } else {
                  try {
                    const { data: sessionData, error: sessionError } = await supabase.functions.invoke('stripe-checkout', {
                      body: {
                        payment_id: paymentId,
                        cart: cart,
                        invoice_email: invoiceEmail,
                        payment_method: 'stripe'
                      }
                    });
                    if (sessionError || !sessionData?.clientSecret) {
                      throw new Error(sessionError?.message || "Failed to generate Stripe PaymentIntent.");
                    }
                    return {
                      clientSecret: sessionData.clientSecret,
                      paymentId: paymentId,
                      orderId: order?.id
                    };
                  } catch (err) {
                    console.warn("stripe-checkout invocation failed, using sandbox fallback clientSecret.", err);
                    return {
                      clientSecret: `pi_mock_secret_${Math.random().toString(36).substring(7)}`,
                      paymentId: paymentId,
                      orderId: order?.id
                    };
                  }
                }
              } catch (err: any) {
                console.error("Stripe initiation error:", err);
                toast.error(`Stripe initiation failed: ${err.message}`);
                throw err;
              }
            }}
            onInitiateWero={async (addr, phone, weroPhone, weroMode, upgradeData, invoiceEmail) => {
              try {
                if (upgradeData) {
                  await accountUseCase.upgradeAccount(upgradeData.email, upgradeData.password);
                  toast.success("Account permanently saved!");
                }

                let currentUserId = user?.id || user?.$id;
                if (!currentUserId) {
                  try {
                    const sessionData = await authRepository.getSession();
                    currentUserId = sessionData?.data?.user?.id;
                  } catch (e) {
                    console.warn("Failed to get session for payment record:", e);
                  }
                }

                if (!currentUserId) {
                  throw new Error("User session could not be established.");
                }

                const paymentType = 'fiat';
                const providerName = 'wero';
                const providerPaymentId = `wer_pending_${Date.now()}`;
                const amountRequested = Math.round(cartTotal * 100); // in cents

                const { data: paymentRecord, error: paymentError } = await supabase
                  .from('payments')
                  .insert([{
                    user_id: currentUserId,
                    payment_type: paymentType,
                    provider: providerName,
                    provider_payment_id: providerPaymentId,
                    provider_status: 'pending',
                    amount_requested: amountRequested,
                    amount_paid: 0,
                    requested_currency: 'EUR',
                    initiated_at: new Date().toISOString(),
                    completed_at: null,
                    metadata: {
                      checkout_method: providerName,
                      is_sandbox: true,
                      invoice_email: invoiceEmail || null,
                      shipping_address: addr,
                      user_phone: phone,
                      wero_phone: weroPhone,
                      wero_mode: weroMode,
                      cart: cart
                    }
                  }])
                  .select()
                  .single();

                if (paymentError || !paymentRecord) {
                  throw new Error(paymentError?.message || "Failed to create payment record.");
                }

                const paymentId = (paymentRecord as any).id;

                // Pre-create the order to link with the payment record immediately
                const order = await createOrder(cart, cartTotal, providerName, addr, phone, paymentId);
                if (order) {
                  await supabase
                    .from('payments')
                    .update({ order_id: order.id })
                    .eq('id', paymentId);
                }

                try {
                  const { data: sessionData, error: sessionError } = await supabase.functions.invoke('wero-checkout', {
                    body: {
                      action: 'initiate',
                      payment_id: paymentId,
                      wero_phone: weroPhone,
                      wero_mode: weroMode,
                      cart: cart,
                      invoice_email: invoiceEmail,
                      return_url: `${window.location.origin}${window.location.pathname}?payment_id=${paymentId}`
                    }
                  });
                  if (sessionError || !sessionData?.wero_tx_id) {
                    throw new Error(sessionError?.message || "Failed to generate Wero transaction.");
                  }
                  return {
                    paymentId: paymentId,
                    qrCodeData: sessionData.qrCodeData || '',
                    redirectUrl: sessionData.redirectUrl || '',
                    orderId: order?.id
                  };
                } catch (err) {
                  console.warn("wero-checkout invocation failed, using sandbox fallback.", err);
                  const mockWeroId = `wer_tx_${Math.random().toString(36).substring(2, 11)}`;
                  return {
                    paymentId: paymentId,
                    qrCodeData: `wero://pay?id=${mockWeroId}&amount=${cartTotal.toFixed(2)}&currency=EUR`,
                    redirectUrl: `https://wero-sandbox.pay/transfer?id=${mockWeroId}`,
                    orderId: order?.id
                  };
                }
              } catch (err: any) {
                console.error("Wero initiation error:", err);
                toast.error(`Wero initiation failed: ${err.message}`);
                throw err;
              }
            }}
            onComplete={async (method, addr, phone, upgradeData, invoiceEmail, weroStatus, weroOrderId) => {
              isCheckingOut.current = true;
              try {
                if ((method === 'wero' || method === 'worldline') && weroStatus === 'succeeded') {
                  if (weroOrderId) {
                    sessionStorage.setItem('last_order_id', weroOrderId);
                    
                    // Fetch the order from supabase to send the invoice
                    try {
                      const { data: orderData } = await supabase
                        .from('orders')
                        .select('*')
                        .eq('id', weroOrderId)
                        .single();
                        
                      if (orderData) {
                        const targetEmail = invoiceEmail || ((user && !user.is_anonymous) ? user.email : undefined);
                        if (targetEmail) {
                          const { sendInvoiceToEmail } = await import('./utils/invoiceGenerator');
                          const mappedOrder: Order = {
                            id: orderData.id,
                            created_at: orderData.created_at,
                            total_price: Number(orderData.total_price),
                            status: orderData.status,
                            payment_method: orderData.payment_method,
                            shipping_address: orderData.shipping_address,
                            items: orderData.items || [],
                            is_guest: !!orderData.is_guest,
                            user_id: orderData.user_id,
                            user_email: orderData.user_email || undefined,
                            user_phone: orderData.user_phone || undefined,
                            status_history: orderData.status_history || undefined,
                            payment_id: orderData.payment_id || null
                          };
                          await sendInvoiceToEmail(mappedOrder, targetEmail);
                        }
                      }
                    } catch (invoiceErr) {
                      console.error("Failed to generate/send invoice for Wero:", invoiceErr);
                    }
                  }
                  clearCart();
                  setIsCartOpen(false);
                  navigateTo('success');
                  toast.success("Wero payment completed successfully!");
                  return;
                }

                if (upgradeData) {
                  await accountUseCase.upgradeAccount(upgradeData.email, upgradeData.password);
                  toast.success("Account permanently saved!");
                }
 
                // 1. Determine user ID (ensure anonymous session if none exists)
                let currentUserId = user?.id || user?.$id;
                if (!currentUserId) {
                  try {
                    const sessionData = await authRepository.getSession();
                    currentUserId = sessionData?.data?.user?.id;
                  } catch (e) {
                    console.warn("Failed to get session for payment record:", e);
                  }
                }
 
                // 2. Insert payment record into payments table
                let paymentId: string | undefined = undefined;
                if (appConfig.databaseProvider === 'supabase' && currentUserId) {
                  try {
                    const paymentType = method === 'crypto' ? 'crypto' : 'fiat';
                    const providerPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                    const amountRequested = Math.round(cartTotal * 100); // in cents
 
                    const { data: paymentRecord, error: paymentError } = await supabase
                      .from('payments')
                      .insert([{
                        user_id: currentUserId,
                        payment_type: paymentType,
                        provider: method,
                        provider_payment_id: providerPaymentId,
                        provider_status: 'succeeded',
                        amount_requested: amountRequested,
                        amount_paid: amountRequested,
                        requested_currency: 'EUR',
                        initiated_at: new Date().toISOString(),
                        completed_at: new Date().toISOString(),
                        metadata: {
                          checkout_method: method,
                          is_sandbox: true,
                          invoice_email: invoiceEmail || null,
                          shipping_address: addr,
                          user_phone: phone,
                          cart: cart
                        }
                      }])
                      .select()
                      .single();
 
                    if (paymentError) {
                      console.error("Failed to create payment record:", paymentError);
                    } else if (paymentRecord) {
                      paymentId = (paymentRecord as any).id;
                      console.log("Payment record created successfully:", paymentId);

                      // If Wero, simulate status transitions by updating it to succeeded/failed/cancelled after a short delay
                      if (method === 'wero1') {
                        let order: any = null;
                        try {
                          // Pre-create the order to link with the payment record immediately
                          order = await createOrder(cart, cartTotal, method, addr, phone, paymentId);
                          if (order && paymentId) {
                            const { error: updateError } = await supabase
                              .from('payments')
                              .update({ order_id: order.id })
                              .eq('id', paymentId);
                            if (updateError) {
                              console.error("Failed to link pre-created order to Wero payment record:", updateError);
                            } else {
                              console.log("Linked pre-created order to Wero payment record successfully:", order.id);
                            }
                          }
                        } catch (orderErr) {
                          console.error("Failed to pre-create order for Wero simulation:", orderErr);
                          toast.error("Failed to initiate order. Please try again.");
                          isCheckingOut.current = false;
                          return;
                        }

                        // Clear cart first so database and frontend cart remain clean while simulating Wero checkout
                        const savedCart = [...cart]; // Keep backup
                        clearCart();
                        setIsCartOpen(false);

                        // Simulate payment processing delay
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        const finalStatus = weroStatus || 'succeeded';
                        const amountRequested = Math.round(cartTotal * 100);
                        const finalAmountPaid = finalStatus === 'succeeded' ? amountRequested : 0;

                        try {
                          const { error: updatePaymentError } = await supabase
                            .from('payments')
                            .update({
                              provider_status: finalStatus,
                              amount_paid: finalAmountPaid,
                              completed_at: new Date().toISOString()
                            })
                            .eq('id', paymentId);

                          if (updatePaymentError) {
                            console.error("Failed to update Wero payment to final status:", updatePaymentError);
                          } else {
                            console.log(`Wero payment updated to ${finalStatus} successfully.`);
                          }

                          // If Wero simulation is not succeeded, cancel order to restore inventory and restore the cart
                          if (finalStatus !== 'succeeded') {
                            if (order) {
                              try {
                                const { error: cancelError } = await supabase.rpc('cancel_order_with_inventory', { p_order_id: order.id });
                                if (!cancelError) {
                                  console.log("Pre-created Wero order cancelled due to simulated cancellation/failure:", order.id);
                                  // Re-decrement the stock back for the restored cart items
                                  for (const item of savedCart) {
                                    const qty = item.cart_quantity || item.quantity || 1;
                                    for (let i = 0; i < qty; i++) {
                                      await syncInventoryDecrement(item.id);
                                    }
                                  }
                                  // Restore cart
                                  setCart(savedCart);
                                }
                              } catch (cancelErr) {
                                console.error("Failed to cancel Wero order:", cancelErr);
                              }
                            }

                            if (finalStatus === 'cancelled') {
                              toast.error("Wero payment was cancelled by the user.");
                            } else {
                              toast.error("Wero payment failed: Insufficient funds or session timeout.");
                            }
                            isCheckingOut.current = false;
                            return;
                          }

                          // If Wero simulation succeeded, save order info and show success page
                          sessionStorage.setItem('last_order_id', order.id);

                          // Auto-send invoice if user provided an email
                          const targetEmail = invoiceEmail || ((user && !user.is_anonymous) ? user.email : undefined);
                          if (targetEmail) {
                            try {
                              const { sendInvoiceToEmail } = await import('./utils/invoiceGenerator');
                              sendInvoiceToEmail(order, targetEmail);
                            } catch (invoiceErr) {
                              console.error("Failed to generate/send invoice:", invoiceErr);
                            }
                          }

                          navigateTo('success');
                          toast.success("Wero payment completed successfully!");
                          return;
                        } catch (simErr: any) {
                          console.error("Error during simulated Wero checkout:", simErr);
                          if (order) {
                            try {
                              const { error: cancelError } = await supabase.rpc('cancel_order_with_inventory', { p_order_id: order.id });
                              if (!cancelError) {
                                for (const item of savedCart) {
                                  const qty = item.cart_quantity || item.quantity || 1;
                                  for (let i = 0; i < qty; i++) {
                                    await syncInventoryDecrement(item.id);
                                  }
                                }
                                setCart(savedCart);
                              }
                            } catch (_) { }
                          }
                          isCheckingOut.current = false;
                          return;
                        }
                      }
                    }
                  } catch (e) {
                    console.error("Error inserting payment record:", e);
                  }
                }

                // 3. Create the order, passing the paymentId if we successfully created it
                const order = await createOrder(cart, cartTotal, method, addr, phone, paymentId);
                if (order) {
                  // 4. Update the payment record with the created order_id
                  if (paymentId && appConfig.databaseProvider === 'supabase') {
                    try {
                      const { error: updateError } = await supabase
                        .from('payments')
                        .update({ order_id: order.id })
                        .eq('id', paymentId);
                      if (updateError) {
                        console.error("Failed to link order to payment record:", updateError);
                      } else {
                        console.log("Linked order to payment record successfully:", order.id);
                      }
                    } catch (e) {
                      console.error("Error linking order to payment record:", e);
                    }
                  }

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
