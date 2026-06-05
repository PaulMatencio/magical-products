/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Truck, CreditCard, ShoppingCart, ShieldCheck, Lock, MapPin, User, Hash, Calendar, KeyRound, Sparkles, ChevronRight, Wallet, CheckCircle2, Coins, Mail, X, AlertCircle, Loader2, Globe, Smartphone, QrCode, ExternalLink } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import appConfig from "../../../config/appConfig";
import { supabase } from "../../../services/supabase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BrowserWallet, Transaction, BlockfrostProvider } from "@meshsdk/core";
import { fetchLiveAdaRate } from "../../../services/cryptoService";

const stripePromise = loadStripe(appConfig.stripe.publishableKey);

interface CheckoutProps {
  onBack: () => void;
  onInitiateStripe: (
    shippingAddress: string,
    userPhone: string,
    upgradeData?: { email: string; password: string },
    invoiceEmail?: string
  ) => Promise<{ clientSecret: string; paymentId: string; orderId?: string }>;
  onInitiateWero: (
    shippingAddress: string,
    userPhone: string,
    weroPhone: string,
    weroMode: 'phone' | 'qr',
    upgradeData?: { email: string; password: string },
    invoiceEmail?: string
  ) => Promise<{ paymentId: string; qrCodeData: string; redirectUrl: string; orderId?: string }>;
  onInitiateCrypto: (
    shippingAddress: string,
    userPhone: string,
    cryptoData: { txHash: string; customerAddress: string; walletName: string; adaAmount?: string; rateUsed?: number },
    upgradeData?: { email: string; password: string },
    invoiceEmail?: string
  ) => Promise<{ paymentId: string; orderId?: string }>;
  onComplete: (
    paymentMethod: string,
    shippingAddress: string,
    userPhone: string,
    upgradeData?: { email: string; password: string },
    invoiceEmail?: string,
    weroStatus?: 'succeeded' | 'failed' | 'cancelled',
    weroOrderId?: string,
    cryptoData?: { txHash: string; customerAddress: string; walletName: string; adaAmount?: string; rateUsed?: number; paymentId?: string }
  ) => void;
}



const getPaymentMethods = () => [
  { id: "stripe", label: appConfig.activeFiatGateway === 'adyen' ? "Adyen (Card, Sofort)" : "Stripe (Card)", icon: CreditCard, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" },
  { id: "wero", label: "Wero (Instant)", icon: Smartphone, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
  { id: "paypal", label: "PayPal", icon: ShoppingCart, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
  { id: "crypto", label: "Crypto", icon: ShieldCheck, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
];

const CRYPTO_WALLETS = [
  { id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" },
  { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" },
  { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" },
  { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" },
  { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" },
];

const CRYPTO_RATES: Record<string, { symbol: string, rate: number }> = {
  metamask: { symbol: 'ETH', rate: 0.00033 },
  coinbase: { symbol: 'ETH', rate: 0.00033 },
  trust: { symbol: 'BNB', rate: 0.0016 },
  phantom: { symbol: 'SOL', rate: 0.0066 },
  lace: { symbol: 'ADA', rate: 2.22 },
};

export function Checkout({ onBack, onInitiateStripe, onInitiateWero, onInitiateCrypto, onComplete }: CheckoutProps) {
  const [adaRate, setAdaRate] = useState<number>(2.22);
  const [isLoadingAdaRate, setIsLoadingAdaRate] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadRate() {
      setIsLoadingAdaRate(true);
      const rate = await fetchLiveAdaRate();
      if (isMounted) {
        setAdaRate(rate);
        setIsLoadingAdaRate(false);
      }
    }
    loadRate();
    return () => {
      isMounted = false;
    };
  }, []);

  const getCryptoRate = (walletId: string): number => {
    if (walletId === 'lace') return adaRate;
    return CRYPTO_RATES[walletId]?.rate || 1;
  };

  const { cart } = useCart();
  const { user } = useAuth();
  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const effectivePrice = item.discount_percentage && item.discount_percentage > 0
      ? item.price * (1 - item.discount_percentage / 100)
      : item.price;
    return sum + (effectivePrice * item.cart_quantity);
  }, 0), [cart]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + Number(item.cart_quantity || 0), 0), [cart]);
  const enabledPaymentMethods = useMemo(() => {
    const configured = appConfig.paymentMethods || ["stripe", "adyen", "worldline", "paypal", "crypto"];
    const methods = getPaymentMethods();
    const filtered = methods.filter(method => configured.includes(method.id as any));
    return filtered.length > 0 ? filtered : methods;
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<string>(() => {
    return enabledPaymentMethods[0]?.id || "stripe";
  });
  const [weroMode, setWeroMode] = useState<"phone" | "qr">("phone");
  const [weroPhone, setWeroPhone] = useState("");
  const [showWeroSimulator, setShowWeroSimulator] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState<"idle" | "processing" | "success" | "failure" | "cancel" | "timeout">("idle");
  const [simulationErrorMessage, setSimulationErrorMessage] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    phone: "",
    invoiceEmail: (user && !user.is_anonymous) ? user.email || "" : "",
    country: ""
  });
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    if (user && !user.is_anonymous) {
      if (user.email) {
        setShippingInfo(prev => {
          if (!prev.invoiceEmail) {
            return { ...prev, invoiceEmail: user.email };
          }
          return prev;
        });
      }

      const loadSavedAddress = async () => {
        try {
          if (appConfig.databaseProvider === 'supabase') {
            const { data, error } = await supabase
              .from('user_roles')
              .select('name, street, city, zip, phone, country')
              .eq('user_id', user.id || user.$id)
              .maybeSingle();

            if (data && !error) {
              setShippingInfo(prev => ({
                ...prev,
                name: data.name || prev.name,
                street: data.street || prev.street,
                city: data.city || prev.city,
                zip: data.zip || prev.zip,
                phone: data.phone || prev.phone,
                country: data.country || prev.country,
              }));
              if (data.name || data.street || data.city || data.zip || data.phone || data.country) {
                setSaveAddress(true);
              }
            }
          }
        } catch (err) {
          console.error("Failed to load saved address:", err);
        }
      };
      loadSavedAddress();
    }
  }, [user]);

  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [isProcessingCrypto, setIsProcessingCrypto] = useState(false);
  const [cryptoTxHash, setCryptoTxHash] = useState<string | null>(null);
  const [cryptoError, setCryptoError] = useState<string | null>(null);
  const [cryptoConfirming, setCryptoConfirming] = useState(false);

  const [createAccount, setCreateAccount] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");

  const isFormValid = Boolean(
    shippingInfo.name &&
    shippingInfo.street &&
    shippingInfo.city &&
    shippingInfo.zip &&
    shippingInfo.country &&
    shippingInfo.phone &&
    (paymentMethod !== "crypto" || connectedWallet !== null) &&
    (paymentMethod !== "wero" || weroMode === "qr" || (weroMode === "phone" && weroPhone.trim().length > 6)) &&
    (!createAccount || (accountEmail && accountPassword.length >= 6))
  );

  const handleWalletConnect = async (walletId: string) => {
    if (walletId === "lace") {
      setIsConnecting(true);
      try {
        if ((window as any).cardano && (window as any).cardano.lace) {
          const wallet = await BrowserWallet.enable("lace");
          const changeAddr = await wallet.getChangeAddress();
          if (changeAddr) {
            setConnectedWallet("lace");
            setWalletAddress(changeAddr);
            setWalletBalance(null);
          } else {
            alert("Connected to Lace, but no change address found.");
          }
        } else {
          alert("Lace wallet extension not found. Please install Lace to continue.");
        }
      } catch (error: any) {
        console.error("Failed to connect to Lace wallet:", error);
        alert(`Connection to Lace wallet was rejected or failed. Details: ${error?.info || error?.message || JSON.stringify(error)}`);
      } finally {
        setIsConnecting(false);
      }
    } else {
      // Mock connection for other wallets for now
      setConnectedWallet(walletId);
      setWalletAddress("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6));
      setWalletBalance(null);
    }
  };

  const handleCheckBalance = async () => {
    if (!connectedWallet) return;
    setIsCheckingBalance(true);

    try {
      if (connectedWallet === "lace") {
        const wallet = await BrowserWallet.enable("lace");
        const balance = await wallet.getBalance();
        const lovelace = balance.find(b => b.unit === 'lovelace')?.quantity || '0';
        const ada = (Number(lovelace) / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        setWalletBalance(`${ada} ADA`);
      } else {
        setTimeout(() => {
          setWalletBalance(`1.25 ${CRYPTO_RATES[connectedWallet].symbol}`);
          setIsCheckingBalance(false);
        }, 800);
      }
    } catch (error) {
      console.error("Failed to check balance:", error);
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const [stripeSecret, setStripeSecret] = useState<string | null>(null);
  const [stripePayId, setStripePayId] = useState<string | null>(null);
  const [stripeOrderId, setStripeOrderId] = useState<string | null>(null);
  const [isInitiatingStripe, setIsInitiatingStripe] = useState(false);

  const [adyenSessionData, setAdyenSessionData] = useState<string | null>(null);
  const [adyenPayId, setAdyenPayId] = useState<string | null>(null);
  const [adyenOrderId, setAdyenOrderId] = useState<string | null>(null);

  const [weroQrCode, setWeroQrCode] = useState<string | null>(null);
  const [weroRedirectUrl, setWeroRedirectUrl] = useState<string | null>(null);
  const [weroPayId, setWeroPayId] = useState<string | null>(null);
  const [weroOrderId, setWeroOrderId] = useState<string | null>(null);
  const [isInitiatingWero, setIsInitiatingWero] = useState(false);

  const isCompletedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (isCompletedRef.current) return;
      const orderToCancel = stripeOrderId || adyenOrderId || weroOrderId;
      if (orderToCancel) {
        const cleanupCancel = async () => {
          try {
            await supabase.rpc('cancel_order_with_inventory', { p_order_id: orderToCancel });
          } catch (err) {
            console.error("Failed to cancel order on unmount:", err);
          }
        };
        cleanupCancel();
      }
    };
  }, [stripeOrderId, adyenOrderId, weroOrderId]);

  const completeCheckoutOrder = async (weroStatus?: 'succeeded' | 'failed' | 'cancelled') => {
    const address = `${shippingInfo.name}\n${shippingInfo.street}\n${shippingInfo.city}, ${shippingInfo.zip}\n${shippingInfo.country}`.trim();
    if (!address || !shippingInfo.phone) return;

    if (saveAddress && user && !user.is_anonymous) {
      try {
        if (appConfig.databaseProvider === 'supabase') {
          await supabase
            .from('user_roles')
            .update({
              name: shippingInfo.name,
              street: shippingInfo.street,
              city: shippingInfo.city,
              zip: shippingInfo.zip,
              phone: shippingInfo.phone,
              country: shippingInfo.country,
              is_guest: false
            })
            .eq('user_id', user.id || user.$id);
        }
      } catch (err) {
        console.error("Failed to save address to user_roles:", err);
      }
    }

    const upgradeData = createAccount ? { email: accountEmail, password: accountPassword } : undefined;
    const invoiceEmail = shippingInfo.invoiceEmail?.trim() || undefined;

    if (paymentMethod === 'stripe') {
      setIsInitiatingStripe(true);
      try {
        const res = await onInitiateStripe(address, shippingInfo.phone, upgradeData, invoiceEmail);
        if (appConfig.activeFiatGateway === 'adyen') {
          setAdyenSessionData(res.clientSecret);
          setAdyenPayId(res.paymentId);
          setAdyenOrderId(res.orderId || null);
        } else {
          setStripeSecret(res.clientSecret);
          setStripePayId(res.paymentId);
          setStripeOrderId(res.orderId || null);
        }
      } catch (err) {
        console.error(`Failed to initiate ${appConfig.activeFiatGateway === 'adyen' ? 'Adyen' : 'Stripe'} payment:`, err);
      } finally {
        setIsInitiatingStripe(false);
      }
    } else if (paymentMethod === 'wero' || paymentMethod === 'worldline') {
      setIsInitiatingWero(true);
      try {
        const res = await onInitiateWero(address, shippingInfo.phone, weroPhone, weroMode, upgradeData, invoiceEmail);
        setWeroPayId(res.paymentId);
        setWeroQrCode(res.qrCodeData);
        setWeroRedirectUrl(res.redirectUrl);
        setWeroOrderId(res.orderId || null);
      } catch (err) {
        console.error("Failed to initiate Wero payment:", err);
      } finally {
        setIsInitiatingWero(false);
      }
    } else if (paymentMethod === 'crypto' && connectedWallet === 'lace') {
      setIsProcessingCrypto(true);
      setCryptoError(null);
      setCryptoConfirming(false);
      try {
        const wallet = await BrowserWallet.enable("lace");
        const receiverAddress = appConfig.cryptoReceiverAddresses.lace;
        
        const rateToUse = getCryptoRate('lace');
        const adaAmount = (subtotal * rateToUse).toFixed(6);
        const lovelaceAmount = Math.round(Number(adaAmount) * 1_000_000).toString();
        
        const tx = new Transaction({ initiator: wallet });
        tx.sendLovelace(receiverAddress, lovelaceAmount);
        
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        
        setCryptoTxHash(txHash);
        setCryptoConfirming(true);

        const upgradeData = createAccount ? { email: accountEmail, password: accountPassword } : undefined;
        const invoiceEmail = shippingInfo.invoiceEmail?.trim() || undefined;

        // Initiate crypto payment in DB immediately upon tx submission
        const initRes = await onInitiateCrypto(
          address,
          shippingInfo.phone,
          { txHash, customerAddress: walletAddress || '', walletName: 'lace', adaAmount, rateUsed: rateToUse },
          upgradeData,
          invoiceEmail
        );
        
        let isTimedOut = false;
        const timeoutMs = (appConfig.cryptoPaymentTimeoutMinutes || 3) * 60 * 1000;
        
        const timeoutTimer = setTimeout(async () => {
          isTimedOut = true;
          setCryptoConfirming(false);
          setIsProcessingCrypto(false);
          setCryptoError(`Crypto payment confirmation timed out after ${appConfig.cryptoPaymentTimeoutMinutes || 3} minutes.`);
          
          if (initRes.paymentId && appConfig.databaseProvider === 'supabase') {
            try {
              await supabase
                .from('payments')
                .update({
                  provider_status: 'expired',
                  completed_at: new Date().toISOString()
                })
                .eq('id', initRes.paymentId);
              console.log("Crypto payment marked as expired in DB:", initRes.paymentId);
            } catch (updateErr) {
              console.error("Failed to update payment to expired:", updateErr);
            }
          }
          
          if (initRes.orderId && appConfig.databaseProvider === 'supabase') {
            try {
              await supabase.rpc('cancel_order_with_inventory', { p_order_id: initRes.orderId });
              console.log("Crypto order cancelled on timeout:", initRes.orderId);
            } catch (cancelErr) {
              console.error("Failed to cancel crypto order on timeout:", cancelErr);
            }
          }
        }, timeoutMs);
        
        const provider = new BlockfrostProvider(import.meta.env.VITE_BLOCKFROST_PROJECT_ID || 'preprodjz45ulPXDFrUvQJC54yYEKRAhJS0ZvZm');
        provider.onTxConfirmed(txHash, () => {
          if (isTimedOut) return;
          clearTimeout(timeoutTimer);
          isCompletedRef.current = true;
          onComplete(
            paymentMethod,
            address,
            shippingInfo.phone,
            upgradeData,
            invoiceEmail,
            undefined,
            undefined,
            { 
              txHash, 
              customerAddress: walletAddress || '', 
              walletName: 'lace', 
              adaAmount, 
              rateUsed: rateToUse,
              paymentId: initRes.paymentId 
            }
          );
        });
      } catch (err: any) {
        console.error("Cardano payment transaction failed:", err);
        setCryptoError(err?.message || err?.info || JSON.stringify(err));
      } finally {
        setIsProcessingCrypto(false);
      }
    } else {
      onComplete(paymentMethod, address, shippingInfo.phone, upgradeData, invoiceEmail, weroStatus);
    }
  };

  const handleComplete = async () => {
    await completeCheckoutOrder();
  };

  const selectedMethod = getPaymentMethods().find(m => m.id === paymentMethod) || getPaymentMethods()[0];

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-x-hidden">
      {/* ── Header ── */}
      <div className="bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-grow min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate">Checkout</h1>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate">{totalItems} item{totalItems !== 1 ? 's' : ''} in your order</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Secure</span>
          </div>
        </div>
      </div>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {["Shipping", "Payment", "Confirm"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${i <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"
                }`}>
                <span className="w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20">{i + 1}</span>
                <span className="hidden sm:inline">{step}</span>
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* ── Left Column: Forms ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Shipping Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
            >
              <div className="px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">Shipping Address</h2>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Street Address
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="123 Magic Avenue"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5">City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Magical Product town"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5">ZIP Code</label>
                  <input
                    type="text"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zip: e.target.value }))}
                    placeholder="12345"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5">Country</label>
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <option value="">Select a country</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="BE">Belgium</option>
                    <option value="NL">Netherlands</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                  </select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Mobile or WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email for Invoice <span className="text-gray-300 dark:text-gray-600 normal-case font-medium">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.invoiceEmail}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, invoiceEmail: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                {user && !user.is_anonymous && (
                  <div className="sm:col-span-2 pt-2">
                    <label className="flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          checked={saveAddress}
                          onChange={(e) => setSaveAddress(e.target.checked)}
                          className="peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Save address for faster checkout later</h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">We will save your name, street, city, ZIP, country, and phone number to your profile.</p>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Payment Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
            >
              <div className="px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">Payment Method</h2>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Choose how you'd like to pay</p>
                </div>
              </div>

              <div className="p-4 sm:p-7">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
                  {enabledPaymentMethods.map(method => (
                    <motion.button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${paymentMethod === method.id
                        ? `border-transparent text-white shadow-lg ${method.shadow}`
                        : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                    >
                      {paymentMethod === method.id && (
                        <motion.div
                          layoutId="payment-bg"
                          className={`absolute inset-0 bg-gradient-to-br ${method.color}`}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <method.icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10">{method.label}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === "stripe" && (
                    <motion.div
                      key="stripe-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden py-2"
                    >
                      <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3">
                        <CreditCard className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                        <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Secure Stripe Checkout</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                            Click 'Confirm Order' to proceed to the secure, encrypted Stripe-hosted checkout page.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "paypal" && (
                    <motion.div
                      key="paypal-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">You'll be redirected to PayPal to complete payment.</p>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "crypto" && (
                    <motion.div
                      key="crypto-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3">
                            <Wallet className="w-6 h-6" />
                          </div>
                          <h3 className="text-sm font-extrabold text-amber-900 tracking-tight">Connect Web3 Wallet</h3>
                          <p className="text-[11px] font-medium text-amber-700/70 mt-1">Select a wallet to proceed with crypto payment.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {CRYPTO_WALLETS.map(wallet => (
                            <button
                              key={wallet.id}
                              onClick={() => handleWalletConnect(wallet.id)}
                              disabled={isConnecting}
                              className={`relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${connectedWallet === wallet.id
                                ? `${wallet.color} ring-2 ring-offset-2 ring-amber-400 shadow-md`
                                : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"
                                } ${isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <span className="truncate mr-2">{wallet.name} {isConnecting && wallet.id === "lace" ? "(Connecting...)" : ""}</span>
                              {connectedWallet === wallet.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                            </button>
                          ))}
                        </div>

                        {connectedWallet && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3"
                          >
                            <div>
                              <p className="text-xs font-semibold text-amber-800">
                                Connected to {CRYPTO_WALLETS.find(w => w.id === connectedWallet)?.name}
                              </p>
                              {walletAddress && (
                                <p className="text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all">
                                  {walletAddress}
                                </p>
                              )}

                              <div className="mt-3">
                                {!walletBalance ? (
                                  <button
                                    onClick={handleCheckBalance}
                                    disabled={isCheckingBalance}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Coins className="w-3.5 h-3.5" />
                                    {isCheckingBalance ? "Checking..." : "Check Balance"}
                                  </button>
                                ) : (
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50">
                                    <Coins className="w-3.5 h-3.5" />
                                    {walletBalance}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-amber-200/50 text-left space-y-2">
                              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">Payment Details</p>
                              <div className="flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg">
                                <span className="text-xs font-medium text-amber-700">Amount Due</span>
                                <span className="text-sm font-extrabold text-amber-900">
                                  {(subtotal * getCryptoRate(connectedWallet)).toFixed(4)} {CRYPTO_RATES[connectedWallet]?.symbol || 'ADA'}
                                </span>
                              </div>
                              <div className="bg-amber-50/80 px-3 py-2 rounded-lg space-y-1">
                                <span className="text-[10px] font-bold text-amber-700/70 uppercase tracking-wider">Send to Address</span>
                                <p className="text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded">
                                  {appConfig.cryptoReceiverAddresses[connectedWallet as keyof typeof appConfig.cryptoReceiverAddresses]}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "wero" && (
                    <motion.div
                      key="wero-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse">
                            <Smartphone className="w-6 h-6" />
                          </div>
                          <h3 className="text-sm font-extrabold text-purple-900 tracking-tight">Wero Instant Transfer</h3>
                          <p className="text-[11px] font-medium text-purple-700/70 mt-1">Pay instantly and securely from your banking app.</p>
                        </div>

                        <div className="flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50">
                          <button
                            type="button"
                            onClick={() => setWeroMode("phone")}
                            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${weroMode === 'phone' ? 'bg-purple-600 text-white shadow-sm font-black' : 'text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30'}`}
                          >
                            Phone Number
                          </button>
                          <button
                            type="button"
                            onClick={() => setWeroMode("qr")}
                            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${weroMode === 'qr' ? 'bg-purple-600 text-white shadow-sm font-black' : 'text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30'}`}
                          >
                            QR Code
                          </button>
                        </div>

                        {weroMode === "phone" ? (
                          <div className="space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30">
                            <label className="text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1">
                              <Smartphone className="w-3 h-3" /> Wero Registered Phone
                            </label>
                            <input
                              type="tel"
                              value={weroPhone}
                              onChange={(e) => setWeroPhone(e.target.value)}
                              placeholder="+33 6 12 34 56 78"
                              className="w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800"
                            />
                            <p className="text-[9px] text-purple-600/60 font-semibold mt-1">
                              Ensure this phone number is registered with Wero in your bank app.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1">
                            <QrCode className="w-8 h-8 text-purple-600 mx-auto opacity-80" />
                            <p className="text-xs font-bold text-purple-900">QR Code Checkout</p>
                            <p className="text-[10px] text-purple-700/60 leading-relaxed">
                              A checkout QR code will generate for you to scan and authorize in your banking app.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>

          {/* ── Right Column: Order Summary ── */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="sticky top-24 rounded-[1rem] overflow-hidden"
            >
              {/* Dark summary card */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative">
                {/* Decorative orb */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 relative">
                  <h2 className="text-lg font-extrabold tracking-tight">Order Summary</h2>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative" style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255,255,255,0.1) transparent",
                }}>
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group"
                    >
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <h4 className="font-bold text-sm truncate text-white/90">{item.title}</h4>
                        <p className="text-[11px] text-white/30 font-medium tabular-nums">
                          {item.cart_quantity} × {appConfig.currency_symbol}{(item.discount_percentage && item.discount_percentage > 0
                            ? item.price * (1 - item.discount_percentage / 100)
                            : item.price).toFixed(2)}
                        </p>
                      </div>
                      <div className="font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors">
                        {appConfig.currency_symbol}{(item.cart_quantity * (item.discount_percentage && item.discount_percentage > 0
                          ? item.price * (1 - item.discount_percentage / 100)
                          : item.price)).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2.5 pt-5 border-t border-white/[0.06]">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-medium">Subtotal</span>
                    <span className="text-white/70 font-bold tabular-nums">{appConfig.currency_symbol}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-medium">Shipping</span>
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Free</span>
                  </div>
                  <div className="h-px bg-white/[0.06] my-1" />
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-extrabold text-white/60 text-sm">Total</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      className="text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      {appConfig.currency_symbol}{subtotal.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Account Upgrade for Guests */}
              {user?.is_anonymous && (
                <div className="p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={createAccount}
                        onChange={(e) => setCreateAccount(e.target.checked)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">Save my details for next time</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Create a permanent account to track your order and save preferences.</p>
                    </div>
                  </label>

                  <AnimatePresence>
                    {createAccount && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                          </label>
                          <input
                            type="email"
                            value={accountEmail}
                            onChange={(e) => setAccountEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1">
                            <KeyRound className="w-3 h-3" /> Password
                          </label>
                          <input
                            type="password"
                            value={accountPassword}
                            onChange={(e) => setAccountPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Confirm Button */}
              <div className="p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors">
                <motion.button
                  onClick={handleComplete}
                  disabled={!isFormValid || isInitiatingStripe || isInitiatingWero}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${isFormValid && !isInitiatingStripe && !isInitiatingWero
                    ? `bg-gradient-to-r ${selectedMethod.color} text-white shadow-lg ${selectedMethod.shadow} hover:brightness-110`
                    : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    }`}
                >
                  {isInitiatingStripe || isInitiatingWero ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Initiating secure payment...
                    </>
                  ) : isFormValid ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Confirm Order
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Fill in all fields
                    </>
                  )}
                </motion.button>
                <p className="text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  256-bit encrypted · Secure checkout
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {stripeSecret && stripePayId && (
          <StripeCheckoutModal
            clientSecret={stripeSecret}
            paymentId={stripePayId}
            totalAmount={subtotal}
            shippingInfo={shippingInfo}
            user={user}
            onClose={async () => {
              if (stripeOrderId) {
                try {
                  await supabase.rpc('cancel_order_with_inventory', { p_order_id: stripeOrderId });
                  console.log("Stripe order cancelled on modal close:", stripeOrderId);
                } catch (err) {
                  console.error("Failed to cancel order on modal close:", err);
                }
              }
              setStripeSecret(null);
              setStripePayId(null);
              setStripeOrderId(null);
            }}
          />
        )}

        {adyenSessionData && adyenPayId && (
          <AdyenCheckoutModal
            sessionData={adyenSessionData}
            paymentId={adyenPayId}
            totalAmount={subtotal}
            shippingInfo={shippingInfo}
            user={user}
            onClose={async () => {
              if (adyenOrderId) {
                try {
                  await supabase.rpc('cancel_order_with_inventory', { p_order_id: adyenOrderId });
                  console.log("Adyen order cancelled on modal close:", adyenOrderId);
                } catch (err) {
                  console.error("Failed to cancel order on modal close:", err);
                }
              }
              setAdyenSessionData(null);
              setAdyenPayId(null);
              setAdyenOrderId(null);
            }}
          />
        )}

        {weroPayId && (weroQrCode || weroRedirectUrl) && (
          <WeroCheckoutModal
            paymentId={weroPayId}
            qrCodeData={weroQrCode || ''}
            redirectUrl={weroRedirectUrl || ''}
            totalAmount={subtotal}
            weroPhone={weroPhone}
            weroMode={weroMode}
            onClose={async () => {
              if (weroOrderId) {
                try {
                  await supabase.rpc('cancel_order_with_inventory', { p_order_id: weroOrderId });
                  console.log("Wero order cancelled on modal close:", weroOrderId);
                } catch (err) {
                  console.error("Failed to cancel order on modal close:", err);
                }
              }
              setWeroPayId(null);
              setWeroQrCode(null);
              setWeroRedirectUrl(null);
              setWeroOrderId(null);
            }}
            onSuccess={(orderId) => {
              isCompletedRef.current = true;
              setWeroPayId(null);
              setWeroQrCode(null);
              setWeroRedirectUrl(null);
              setWeroOrderId(null);
              onComplete(paymentMethod, '', '', undefined, shippingInfo.invoiceEmail, 'succeeded', orderId);
            }}
          />
        )}

        {(isProcessingCrypto || cryptoConfirming || cryptoError) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center"
            >
              {cryptoError ? (
                <div className="space-y-4">
                  <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider">Transaction Failed</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {cryptoError}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setCryptoError(null)}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 py-3">
                  <div className="mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    <Wallet className="absolute w-4 h-4 text-amber-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-base font-black text-slate-950 dark:text-white uppercase tracking-wider">
                      {cryptoConfirming ? "Confirming Blockchain Payment" : "Preparing Transaction"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {cryptoConfirming 
                        ? "Waiting for the transaction to be mined into a block on Cardano Preproduction blockchain. This typically takes 10 to 20 seconds."
                        : "Please approve and sign the payment request in your connected Lace wallet window."}
                    </p>
                  </div>

                  {cryptoTxHash && (
                    <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700/80">Transaction Hash</span>
                      <p className="text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate">
                        {cryptoTxHash}
                      </p>
                      <a
                        href={`https://preprod.cardanoscan.io/transaction/${cryptoTxHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse"
                      >
                        View on Cardanoscan <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StripeForm({ clientSecret, paymentId, totalAmount, shippingInfo, user, onClose }: {
  clientSecret: string;
  paymentId: string;
  totalAmount: number;
  shippingInfo: {
    name: string;
    street: string;
    city: string;
    zip: string;
    phone: string;
    invoiceEmail: string;
    country: string;
  };
  user: any;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const paymentElementOptions = {
    layout: "accordion" as const,
    fields: {
      billingDetails: {
        address: "auto" as const,
        email: "auto" as const,
        phone: "auto" as const,
      }
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.startsWith('+')) return cleaned;
    if (cleaned.startsWith('0')) return `+33${cleaned.slice(1)}`;
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/'}?payment_id=${paymentId}`,
        payment_method_data: {
          billing_details: {
            name: shippingInfo.name || undefined,
            email: shippingInfo.invoiceEmail || user?.email || undefined,
            phone: formatPhone(shippingInfo.phone) || undefined,
            address: {
              line1: shippingInfo.street || undefined,
              city: shippingInfo.city || undefined,
              postal_code: shippingInfo.zip || undefined,
              country: shippingInfo.country || undefined,
            }
          }
        }
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={paymentElementOptions} />

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay Now
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface StripeModalProps {
  clientSecret: string;
  paymentId: string;
  totalAmount: number;
  shippingInfo: {
    name: string;
    street: string;
    city: string;
    zip: string;
    phone: string;
    invoiceEmail: string;
    country: string;
  };
  user: any;
  onClose: () => void;
}

function StripeCheckoutModal({ clientSecret, paymentId, totalAmount, shippingInfo, user, onClose }: StripeModalProps) {
  const isDark = document.documentElement.classList.contains('dark');

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.startsWith('+')) return cleaned;
    if (cleaned.startsWith('0')) return `+33${cleaned.slice(1)}`;
    return cleaned;
  };

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: isDark ? 'night' as const : 'stripe' as const,
      variables: {
        colorPrimary: '#4f46e5',
      }
    },
    defaultValues: {
      billingDetails: {
        name: shippingInfo.name || undefined,
        email: shippingInfo.invoiceEmail || user?.email || undefined,
        phone: formatPhone(shippingInfo.phone) || undefined,
        address: {
          line1: shippingInfo.street || undefined,
          city: shippingInfo.city || undefined,
          postalCode: shippingInfo.zip || undefined,
          country: shippingInfo.country || undefined,
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Secure Checkout</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Provide payment details to complete purchase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Elements stripe={stripePromise} options={stripeOptions}>
          <StripeForm
            clientSecret={clientSecret}
            paymentId={paymentId}
            totalAmount={totalAmount}
            shippingInfo={shippingInfo}
            user={user}
            onClose={onClose}
          />
        </Elements>
      </motion.div>
    </div>
  );
}

interface AdyenModalProps {
  sessionData: string;
  paymentId: string;
  totalAmount: number;
  shippingInfo: {
    name: string;
    street: string;
    city: string;
    zip: string;
    phone: string;
    invoiceEmail: string;
    country: string;
  };
  user: any;
  onClose: () => void;
}

function AdyenCheckoutModal({ sessionData, paymentId, totalAmount, shippingInfo, user, onClose }: AdyenModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sofort' | 'ideal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState(shippingInfo.name || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid card number.');
        return;
      }
      if (expiry.length < 5) {
        setError('Please enter a valid expiry date (MM/YY).');
        return;
      }
      if (cvv.length < 3) {
        setError('Please enter a valid CVV code.');
        return;
      }
    }
    setError(null);
    setIsProcessing(true);

    // Simulate Adyen SDK payment submission
    setTimeout(() => {
      const returnUrl = `${window.location.origin}${window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/'}?payment_id=${paymentId}`;
      window.location.href = returnUrl;
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                Adyen Checkout <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase">Sandbox</span>
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Fast and secure global payments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Adyen Payment Method Selector */}
        <div className="flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedMethod('card')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${selectedMethod === 'card' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod('sofort')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${selectedMethod === 'sofort' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Sofort
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod('ideal')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${selectedMethod === 'ideal' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            iDEAL
          </button>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          {selectedMethod === 'card' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setCardNumber(val);
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none"
                    required
                  />
                  <CreditCard className="absolute right-3.5 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length >= 2) {
                        setExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                      } else {
                        setExpiry(val);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1">Security Code (CVV)</label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>
            </div>
          )}

          {selectedMethod === 'sofort' && (
            <div className="p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2">
              <Globe className="w-8 h-8 text-indigo-500 mx-auto animate-bounce" />
              <h4 className="text-xs font-extrabold text-gray-800 dark:text-white">Redirecting to Sofort Banking</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">You will be securely redirected to complete payment with your bank account.</p>
            </div>
          )}

          {selectedMethod === 'ideal' && (
            <div className="p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2">
              <Globe className="w-8 h-8 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-xs font-extrabold text-gray-800 dark:text-white">Redirecting to iDEAL Sandbox</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">You will be securely redirected to select your Dutch bank and authorize payment.</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay {appConfig.currencySymbol}{totalAmount.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

interface WeroModalProps {
  paymentId: string;
  qrCodeData: string;
  redirectUrl: string;
  totalAmount: number;
  weroPhone: string;
  weroMode: 'phone' | 'qr';
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

function WeroCheckoutModal({ paymentId, qrCodeData, redirectUrl, totalAmount, weroPhone, weroMode, onClose, onSuccess }: WeroModalProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulateStatus = async (status: 'succeeded' | 'failed' | 'cancelled') => {
    setIsSimulating(true);
    setError(null);
    try {
      const { data, error: invokeErr } = await supabase.functions.invoke('wero-checkout', {
        body: {
          action: 'confirm',
          payment_id: paymentId,
          status: status
        }
      });

      if (invokeErr) {
        throw new Error(invokeErr.message || "Failed to confirm Wero payment.");
      }

      if (data?.status === 'succeeded') {
        onSuccess(data.order_id);
      } else {
        setError(`Payment simulation completed with status: ${data?.status || status}`);
        setIsSimulating(false);
        if (status === 'cancelled' || status === 'failed') {
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error("Wero simulation error:", err);
      setError(err.message || "Simulation request failed.");
      setIsSimulating(false);
    }
  };

  const isRealWorldline = redirectUrl && redirectUrl.includes('worldline-solutions.com');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                Wero Transfer <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase">{isRealWorldline ? 'Preprod' : 'Sandbox'}</span>
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Fast and secure account-to-account transfer</p>
            </div>
          </div>
          <button
            onClick={() => handleSimulateStatus('cancelled')}
            disabled={isSimulating}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {weroMode === 'phone' ? (
          <div className="p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3">
            <Smartphone className="w-10 h-10 text-purple-500 mx-auto animate-bounce" />
            <div>
              <h4 className="text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider">Pending Bank Authorization</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                A transfer request for <span className="font-extrabold text-purple-600 dark:text-purple-400">{appConfig.currencySymbol || '€'}{totalAmount.toFixed(2)}</span> has been sent to your Wero phone:
              </p>
              <p className="text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all">
                {weroPhone}
              </p>
            </div>
            {isRealWorldline && (
              <div className="pt-2">
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group"
                >
                  <span>Proceed to Payment</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
            <p className="text-[10px] text-gray-400 dark:text-gray-500 italic pt-1">
              Please open your participating banking app to authorize the instant transfer request.
            </p>
          </div>
        ) : (
          <div className="p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3">
            <div className="p-4 bg-white rounded-2xl shadow-md border border-purple-100">
              <QrCode className="w-40 h-40 text-purple-900" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider">Scan to Pay</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                Scan this QR code with your banking app to instantly authorize a payment of <span className="font-extrabold text-purple-600 dark:text-purple-400">{appConfig.currencySymbol || '€'}{totalAmount.toFixed(2)}</span>.
              </p>
            </div>
            {isRealWorldline && (
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group"
              >
                <span>Proceed to Payment</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2.5">
          <p className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center">
            {isRealWorldline ? 'Verification & Control' : 'Testing / Sandbox Controls'}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleSimulateStatus('succeeded')}
              disabled={isSimulating}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${isRealWorldline
                  ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20'
                }`}
            >
              {isSimulating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isRealWorldline ? 'Verify Payment' : 'Simulate Success'}
                </>
              )}
            </button>
            <button
              onClick={() => handleSimulateStatus('failed')}
              disabled={isSimulating}
              className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isSimulating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  {isRealWorldline ? 'Check Failure' : 'Simulate Failure'}
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => handleSimulateStatus('cancelled')}
            disabled={isSimulating}
            className="w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            Cancel Payment Request
          </button>
        </div>
      </motion.div>
    </div>
  );
}
