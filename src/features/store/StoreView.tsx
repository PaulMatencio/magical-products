import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, History, LogOut, ShieldCheck, Truck,
  Key, Sparkles, Sun, Moon, Menu, X, RefreshCcw, Loader2, XCircle, Search, Percent, Home, Package, UserPlus, ChevronRight, Layers, User,
  Database, TrendingUp
} from "lucide-react";
import { CategorySidebar, CategoryTree } from './components/CategorySidebar';
import { AccountModal } from '../../components/AccountModal';
import { Tooltip } from '../../components/Tooltip';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase';

// Contexts
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '../../context/NavigationContext';

// Components
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { Product, Category, Language } from '../../types/types';


const getCategoryDescendants = (categoryId: string, categories: Category[]): string[] => {
  const ids: string[] = [categoryId];
  const queue: string[] = [categoryId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = categories.filter(c => c.parent_id === currentId);
    for (const child of children) {
      if (!ids.includes(child.id)) {
        ids.push(child.id);
        queue.push(child.id);
      }
    }
  }
  return ids;
};

const DEFAULT_LANGUAGES: Language[] = [
  { id: 'en-uuid-fallback', code: 'en', name: 'English', native_name: 'English', flag_emoji: '🇬🇧', is_default: true, is_active: true, created_at: '', updated_at: '' },
  { id: 'es-uuid-fallback', code: 'es', name: 'Spanish', native_name: 'Español', flag_emoji: '🇪🇸', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'fr-uuid-fallback', code: 'fr', name: 'French', native_name: 'Français', flag_emoji: '🇫🇷', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'it-uuid-fallback', code: 'it', name: 'Italy', native_name: 'Italiano', flag_emoji: '🇮🇹', is_default: false, is_active: true, created_at: '', updated_at: '' }
];

const STORE_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    toggleTheme: "Toggle theme",
    adminPanel: "Admin panel",
    operatorPanel: "Operator panel",
    shipperPanel: "Shipper panel",
    recoveryKey: "Recovery key",
    myOrders: "My orders",
    myAccount: "My account",
    signOut: "Sign out",
    shoppingCart: "Shopping cart",
    searchProducts: "Search products...",
    searchBrands: "Search brands...",
    theCollection: "The Collection",
    discoverSelection: "Discover our unique selection of products for people of all ages.",
    browse: "Browse",
    all: "All",
    onSale: "On Sale",
    allCategories: "All Categories",
    bringingMagic: "Bringing the magic...",
    communicationFailure: "Communication Failure",
    retryConnection: "Retry Connection",
    copyright: "© 2026 Tots & Trends. All rights reserved.",
    browseCategories: "Browse Categories",
    activeAccount: "Active Account",
    guestMode: "Guest Mode",
    management: "Management",
    exitSignOut: "Exit / Sign Out",
    signIn: "Sign In",
    quickMenu: "Quick Menu",
    clearCart: "Clear Cart",
    registerSignIn: "Register / Sign In",
    recoverKey: "Recover Key",
    home: "Home",
    store: "Store",
    exitStore: "Exit Store",
    refreshStore: "Refresh Store",
    saveAccount: "Save Account",
    keepOrderHistory: "Keep Order History",
    clearShowAll: "Clear — Show All Products",
    storeActions: "Store Actions",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    allProducts: "All Products"
  },
  es: {
    toggleTheme: "Alternar tema",
    adminPanel: "Panel de administración",
    operatorPanel: "Panel de operador",
    shipperPanel: "Panel de transportista",
    recoveryKey: "Clave de recuperación",
    myOrders: "Mis pedidos",
    myAccount: "Mi cuenta",
    signOut: "Cerrar sesión",
    shoppingCart: "Carrito de compras",
    searchProducts: "Buscar productos...",
    searchBrands: "Buscar marcas...",
    theCollection: "La Colección",
    discoverSelection: "Descubra nuestra selección única de productos para personas de todas las edades.",
    browse: "Explorar",
    all: "Todo",
    onSale: "En oferta",
    allCategories: "Todas las categorías",
    bringingMagic: "Trayendo la magia...",
    communicationFailure: "Fallo de comunicación",
    retryConnection: "Reintentar conexión",
    copyright: "© 2026 Tots & Trends. Todos los derechos reservados.",
    browseCategories: "Explorar categorías",
    activeAccount: "Cuenta activa",
    guestMode: "Modo invitado",
    management: "Gestión",
    exitSignOut: "Salir / Cerrar sesión",
    signIn: "Iniciar sesión",
    quickMenu: "Menú rápido",
    clearCart: "Limpiar carrito",
    registerSignIn: "Registrarse / Iniciar sesión",
    recoverKey: "Recuperar clave",
    home: "Inicio",
    store: "Tienda",
    exitStore: "Salir de la Tienda",
    refreshStore: "Actualizar Tienda",
    saveAccount: "Guardar Cuenta",
    keepOrderHistory: "Mantener Historial",
    clearShowAll: "Limpiar — Mostrar Todos",
    storeActions: "Acciones de Tienda",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    allProducts: "Todos los productos"
  },
  fr: {
    toggleTheme: "Changer de thème",
    adminPanel: "Panneau d'administration",
    operatorPanel: "Panneau d'opérateur",
    shipperPanel: "Panneau d'expéditeur",
    recoveryKey: "Clé de récupération",
    myOrders: "Mes commandes",
    myAccount: "Mon compte",
    signOut: "Se déconnecter",
    shoppingCart: "Panier",
    searchProducts: "Rechercher des produits...",
    searchBrands: "Rechercher des marques...",
    theCollection: "La Collection",
    discoverSelection: "Découvrez notre sélection unique de produits pour tous les âges.",
    browse: "Parcourir",
    all: "Tout",
    onSale: "En solde",
    allCategories: "Toutes les catégories",
    bringingMagic: "Apporter la magie...",
    communicationFailure: "Échec de communication",
    retryConnection: "Réessayer la connexion",
    copyright: "© 2026 Tots & Trends. Tous droits réservés.",
    browseCategories: "Parcourir les catégories",
    activeAccount: "Compte actif",
    guestMode: "Mode invité",
    management: "Gestion",
    exitSignOut: "Quitter / Se déconnecter",
    signIn: "Se connecter",
    quickMenu: "Menu rapide",
    clearCart: "Vider le panier",
    registerSignIn: "S'inscrire / Se connecter",
    recoverKey: "Récupérer la clé",
    home: "Accueil",
    store: "Boutique",
    exitStore: "Quitter la Boutique",
    refreshStore: "Rafraîchir la Boutique",
    saveAccount: "Enregistrer le Compte",
    keepOrderHistory: "Conserver l'Historique",
    clearShowAll: "Effacer — Tout Afficher",
    storeActions: "Actions de Boutique",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    allProducts: "Tous les produits"
  },
  it: {
    toggleTheme: "Cambia tema",
    adminPanel: "Pannello amministratore",
    operatorPanel: "Pannello operatore",
    shipperPanel: "Pannello spedizioniere",
    recoveryKey: "Chiave di recupero",
    myOrders: "I miei ordini",
    myAccount: "Il mio account",
    signOut: "Disconnetti",
    shoppingCart: "Carrello",
    searchProducts: "Cerca prodotti...",
    searchBrands: "Cerca marchi...",
    theCollection: "La Collezione",
    discoverSelection: "Scopri la nostra selezione unica di prodotti per persone di tutte le età.",
    browse: "Sfoglia",
    all: "Tutto",
    onSale: "In saldo",
    allCategories: "Tutte le categorie",
    bringingMagic: "Portando la magia...",
    communicationFailure: "Errore di comunicazione",
    retryConnection: "Riprova connessione",
    copyright: "© 2026 Tots & Trends. Tutti i diritti riservati.",
    browseCategories: "Sfoglia categorie",
    activeAccount: "Account attivo",
    guestMode: "Modalità ospite",
    management: "Gestione",
    exitSignOut: "Esci / Disconnetti",
    signIn: "Accedi",
    quickMenu: "Menu rapido",
    clearCart: "Svuota carrello",
    registerSignIn: "Registrati / Accedi",
    recoverKey: "Recupera chiave",
    home: "Home",
    store: "Negozio",
    exitStore: "Esci dal Negozio",
    refreshStore: "Aggiorna Negozio",
    saveAccount: "Salva Account",
    keepOrderHistory: "Mantieni Cronologia",
    clearShowAll: "Cancella — Mostra Tutto",
    storeActions: "Azioni del Negozio",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
    allProducts: "Tutti i prodotti"
  }
};

export function StoreView({
  onSignOut,
  setIsRecovering,
  setIsUpgrading,
  realtimeError,
  setRealtimeError,
  showRealtimeFix,
  setShowRealtimeFix
}: {
  onSignOut: () => void,
  setIsRecovering: (v: boolean) => void,
  setIsUpgrading: (v: boolean) => void,
  realtimeError: string | null,
  setRealtimeError: (v: string | null) => void,
  showRealtimeFix: boolean,
  setShowRealtimeFix: (v: boolean) => void
}) {
  const { user, isAdmin, isShipper, isOperator, isOwner } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();
  const { storeProducts, categories, brands, isLoading, fetchError, loadInventory } = useInventory();
  const { cartCount, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [categoryTranslations, setCategoryTranslations] = useState<any[]>([]);
  const [productTranslations, setProductTranslations] = useState<any[]>([]);

  const currentLangCode = selectedLanguage?.code || i18n.language || 'en';
  const tStore = (key: string): string => {
    const lang = STORE_TRANSLATIONS[currentLangCode] || STORE_TRANSLATIONS.en;
    return lang[key] || STORE_TRANSLATIONS.en[key] || key;
  };

  useEffect(() => {
    async function loadTranslations() {
      try {
        const { data: langs, error: langsError } = await supabase
          .from('languages')
          .select('*')
          .eq('is_active', true);
        
        if (langsError) throw langsError;
        
        const { data: catTrans, error: catTransError } = await supabase
          .from('category_translations')
          .select('*, languages(code)');
          
        if (catTransError) throw catTransError;
        
        const { data: prodTrans, error: prodTransError } = await supabase
          .from('product_translations')
          .select('*, languages(code)');
          
        if (prodTransError) {
          console.warn("Product translations table may not exist or failed to fetch:", prodTransError);
        }

        const activeLangs = (langs && langs.length > 0) ? langs : DEFAULT_LANGUAGES;
        setLanguages(activeLangs);
        setCategoryTranslations(catTrans || []);
        setProductTranslations(prodTrans || []);

        const defaultLang = activeLangs.find(l => l.is_default) || activeLangs[0] || null;
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = activeLangs.find(l => l.code === currentI18nCode) || defaultLang;
        setSelectedLanguage(matchedLang);
      } catch (err) {
        console.error("Error loading localization data:", err);
        setLanguages(DEFAULT_LANGUAGES);
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = DEFAULT_LANGUAGES.find(l => l.code === currentI18nCode) || DEFAULT_LANGUAGES[0];
        setSelectedLanguage(matchedLang);
      }
    }
    loadTranslations();
  }, [i18n.language]);

  const translatedCategories = React.useMemo(() => {
    if (!selectedLanguage || selectedLanguage.code === 'en') return categories;
    return categories.map(cat => {
      const translation = categoryTranslations.find(
        t => t.category_id === cat.id && 
             (t.language_id === selectedLanguage.id || t.languages?.code === selectedLanguage.code)
      );
      if (translation) {
        return {
          ...cat,
          name: translation.name,
          description: translation.description || cat.description,
        };
      }
      return cat;
    });
  }, [categories, categoryTranslations, selectedLanguage]);

  const translatedProducts = React.useMemo(() => {
    if (!selectedLanguage || selectedLanguage.code === 'en') return storeProducts;
    return storeProducts.map(prod => {
      const translation = productTranslations.find(
        t => t.product_id === prod.id && 
             (t.language_id === selectedLanguage.id || t.languages?.code === selectedLanguage.code)
      );
      if (translation) {
        return {
          ...prod,
          title: translation.name || prod.title,
          name: translation.name || prod.name,
          description: translation.description || prod.description,
          digital_passport_url: translation.metadata_url || prod.digital_passport_url,
          metadata_url: translation.metadata_url || prod.metadata_url,
        };
      }
      return prod;
    });
  }, [storeProducts, productTranslations, selectedLanguage]);

  // Compute category path for breadcrumbs
  const selectedCategoryPath = React.useMemo(() => {
    if (selectedCategory === "All") return [];
    const path: Category[] = [];
    let currentId: string | undefined = selectedCategory;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = translatedCategories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parent_id;
    }
    return path;
  }, [selectedCategory, translatedCategories]);

  // Root categories (top-level)
  const rootCategories = React.useMemo(() => {
    return translatedCategories.filter(cat => !cat.parent_id);
  }, [translatedCategories]);

  // Subcategories of the currently active category (or its parent root category)
  const subCategories = React.useMemo(() => {
    if (selectedCategory === "All") return [];
    const current = translatedCategories.find(c => c.id === selectedCategory);
    if (!current) return [];

    const isRootCat = !current.parent_id || current.parent_id === 'null';
    const rootId = isRootCat ? current.id : current.parent_id;

    return translatedCategories.filter(c => c.parent_id === rootId);
  }, [selectedCategory, translatedCategories]);


  if (selectedProduct) {
    return (
      <ProductDetails
        product={translatedProducts.find(t => t.id === selectedProduct.id) || selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onCategorySelect={(categoryId) => {
          setSelectedCategory(categoryId);
          setSelectedProduct(null);
        }}
      />
    );
  }

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

      <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 relative z-10">
      {/* Header & Category Logic */}
      <header className="mb-6 sm:mb-10 text-center relative">
        <div className="sticky top-0 z-40 bg-card/80 text-card-foreground backdrop-blur-md border-b border-gray-100 dark:border-gray-800 -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between mb-6 sm:mb-8 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 sm:hidden hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors" aria-label="Open menu">
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo('landing')}>
              <div className="p-1.5 bg-indigo-600 rounded-lg"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">Tots & Trends</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {languages.length > 0 && (
              <div className="relative">
                <select
                  value={selectedLanguage?.code || 'en'}
                  aria-label="Select language"
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

            <Tooltip label={tStore('toggleTheme')}>
              <button onClick={toggleTheme} className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5" /> : <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
              </button>
            </Tooltip>
            <div className="hidden sm:flex items-center gap-1.5">
              {isAdmin && (
                <Tooltip label={tStore('adminPanel')}>
                  <button onClick={() => navigateTo("admin_dashboard")} className="p-2.5 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all" aria-label="Admin Dashboard"><ShieldCheck className="w-5.5 h-5.5" /></button>
                </Tooltip>
              )}
              {(isOperator || import.meta.env.DEV) && (
                <Tooltip label={tStore('operatorPanel')}>
                  <button onClick={() => navigateTo("operator_dashboard")} className="p-2.5 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all" aria-label="Operator Dashboard"><Database className="w-5.5 h-5.5" /></button>
                </Tooltip>
              )}
              {isShipper && (
                <Tooltip label={tStore('shipperPanel')}>
                  <button onClick={() => navigateTo("shipper_dashboard")} className="p-2.5 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all" aria-label="Shipper Dashboard"><Truck className="w-5.5 h-5.5" /></button>
                </Tooltip>
              )}
              {(isOwner || import.meta.env.DEV) && (
                <Tooltip label="Owner Dashboard">
                  <button onClick={() => navigateTo("owner_dashboard")} className="p-2.5 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-xl transition-all" aria-label="Owner Dashboard"><TrendingUp className="w-5.5 h-5.5" /></button>
                </Tooltip>
              )}
              {!user?.is_anonymous && (
                <Tooltip label={tStore('recoveryKey')}>
                  <button onClick={() => setIsRecovering(true)} className="p-2.5 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all" aria-label="Recovery Key"><Key className="w-5.5 h-5.5" /></button>
                </Tooltip>
              )}
              <Tooltip label={tStore('myOrders')}>
                <button onClick={() => navigateTo('history')} className="p-2.5 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all" aria-label="My Orders"><History className="w-5.5 h-5.5" /></button>
              </Tooltip>
              {/* Account button — shows for registered (non-anonymous) users */}
              {user && !user.is_anonymous && (
                <Tooltip label={user.email ?? tStore('myAccount')}>
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl transition-all border border-indigo-100 dark:border-indigo-800 group"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-xs font-black max-w-[80px] truncate hidden lg:block">{user.email?.split('@')[0]}</span>
                  </button>
                </Tooltip>
              )}
              <Tooltip label={tStore('signOut')}>
                <button onClick={onSignOut} className="p-2.5 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all" aria-label="Sign Out"><LogOut className="w-5.5 h-5.5" /></button>
              </Tooltip>
            </div>
            <Tooltip label={tStore('shoppingCart')}>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 sm:p-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-all" aria-label="Shopping Cart">
                <ShoppingCart className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-950">{cartCount}</span>}
              </button>
            </Tooltip>
          </div>
        </div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight md:text-5xl">{tStore('theCollection')}</motion.h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-lg text-gray-400 dark:text-gray-500 max-w-2xl mx-auto font-medium px-2">{tStore('discoverSelection')}</p>

        {/* Mobile: active category pill + trigger button (hidden on lg+) */}
        <div className="mt-4 flex items-center gap-2 lg:hidden">
          <button
            id="mobile-category-trigger"
            onClick={() => setIsCategorySheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            {tStore('browse')}
          </button>
          {selectedCategory !== 'All' && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-500/20 max-w-[60vw] truncate">
              <span className="truncate">
                {selectedCategoryPath.map(c => c.name).join(' › ')}
              </span>
              <button onClick={() => setSelectedCategory('All')} className="shrink-0 ml-1 hover:opacity-70 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 sm:mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-4 px-2 sm:px-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder={tStore('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all dark:text-white"
            />
          </div>

          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder={tStore('searchBrands')}
              value={brandSearchTerm}
              onChange={(e) => setBrandSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all dark:text-white"
            />
          </div>

          {/* Unified Sale filter for both mobile and desktop */}
          <button
            onClick={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
            className={`shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${showOnlyDiscounted
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
              : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-slate-700 hover:border-indigo-400"
              }`}
          >
            <Percent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${showOnlyDiscounted ? "text-white" : "text-indigo-500"}`} />
            <span>{tStore('onSale')}</span>
          </button>
        </div>
      </header>

      {/* Two-column layout: sidebar + products */}
      <div className="flex gap-6 items-start">
        <CategorySidebar
          categories={translatedCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          allProductsLabel={tStore('allCategories')}
        />

        <main className="flex-1 min-w-0">
          {selectedCategory !== "All" && selectedCategoryPath.length > 0 && (
            <nav className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 mb-6 bg-gray-50 dark:bg-slate-800/40 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800/60 w-fit transition-colors">
              <button
                onClick={() => setSelectedCategory("All")}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{tStore('allCategories')}</span>
              </button>
              {selectedCategoryPath.map((cat, idx) => {
                const isLast = idx === selectedCategoryPath.length - 1;
                return (
                  <React.Fragment key={cat.id}>
                    <ChevronRight className="w-3 h-3 text-gray-300 dark:text-slate-700" />
                    {isLast ? (
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                        {cat.name}
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {cat.name}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">{tStore('bringingMagic')}</p>
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-card text-card-foreground rounded-[1rem] border border-red-50 shadow-sm">
              <XCircle className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">{tStore('communicationFailure')}</h3>
              <p className="text-gray-500 text-sm mb-4">{fetchError}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold">{tStore('retryConnection')}</button>
            </div>
          ) : (
            <ProductList
              products={translatedProducts.filter(t => {
                const allowedCategoryIds = selectedCategory === "All"
                  ? []
                  : getCategoryDescendants(selectedCategory, translatedCategories);
                const matchesCategory = selectedCategory === "All" || allowedCategoryIds.includes(t.category_id);
                const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesDiscount = !showOnlyDiscounted || (t.discount_percentage ?? 0) > 0
                const productBrand = t.brand_id ? brands.find(b => b.id === t.brand_id) : null;
                const matchesBrand = !brandSearchTerm ||
                  (productBrand && productBrand.name.toLowerCase().includes(brandSearchTerm.toLowerCase()));
                
                // Language filter: if a non-default language is selected, only show if it has a translation in the DB
                const hasTranslation = productTranslations.some(
                  pt => pt.product_id === t.id && 
                        (pt.language_id === selectedLanguage?.id || pt.languages?.code === selectedLanguage?.code)
                );
                const matchesLanguage = !selectedLanguage || selectedLanguage.code === 'en' || hasTranslation;

                return matchesCategory && matchesSearch && matchesDiscount && matchesBrand && matchesLanguage;
              })}
              onProductClick={setSelectedProduct}
            />
          )}
        </main>
      </div>

      <footer className="mt-10 sm:mt-16 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm pb-4">
        <p>{tStore('copyright')}</p>
      </footer>

      {/* Mobile Menu Sidebar (Simplified for brevity, but functional) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-xs bg-card text-card-foreground shadow-2xl z-[80] flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-600 rounded-lg"><Sparkles className="w-4 h-4 text-white" /></div>
                  <span className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Tots & Trends</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors" aria-label="Close menu">
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow p-4 space-y-1 overflow-y-auto">
                <button onClick={() => { navigateTo('landing'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all">
                  <Home className="w-5 h-5 text-gray-400 dark:text-slate-500" /> {tStore('home')}
                </button>
                <button onClick={() => { navigateTo('store'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl transition-all">
                  <Package className="w-5 h-5" /> {tStore('store')}
                </button>
                <button onClick={() => { navigateTo('history'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-2xl transition-all">
                  <History className="w-5 h-5 text-gray-400 dark:text-slate-500" /> {tStore('myOrders')}
                </button>
                {!user?.is_anonymous && (
                  <button
                    onClick={() => { setIsRecovering(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all"
                  >
                    <Key className="w-5 h-5 text-gray-400 dark:text-slate-500" /> {tStore('recoveryKey')}
                  </button>
                )}
                {/* My Account — registered users only */}
                {user && !user.is_anonymous && (
                  <button
                    onClick={() => { setIsAccountModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all border border-indigo-100 dark:border-indigo-800"
                  >
                    <User className="w-5 h-5" />
                    <div className="text-left">
                      <span className="block text-sm">{tStore('myAccount')}</span>
                      <span className="block text-[9px] font-medium text-indigo-400 uppercase tracking-widest mt-0.5 truncate max-w-[160px]">{user.email}</span>
                    </div>
                  </button>
                )}

                {/* Upgrade Account Section for Guests */}
                {user?.is_anonymous && (
                  <div className="pt-2 pb-2 px-4">
                    <p className="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-[0.2em] mb-2">{tStore('guestMode')}</p>
                    <button onClick={() => { setIsUpgrading(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl transition-all border border-indigo-100 dark:border-indigo-800">
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-5 h-5" />
                        <div className="text-left">
                          <span className="block text-sm">{tStore('saveAccount')}</span>
                          <span className="block text-[9px] font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-widest mt-0.5">{tStore('keepOrderHistory')}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Admin/Shipper/Operator Section */}
                {(isAdmin || isShipper || isOperator || import.meta.env.DEV) && (
                  <>
                    <div className="pt-4 pb-2 px-4">
                      <p className="text-[9px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-[0.2em]">{tStore('management')}</p>
                    </div>
                    {isAdmin && (
                      <button onClick={() => { navigateTo('admin_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all">
                        <ShieldCheck className="w-5 h-5 text-indigo-500" /> {tStore('adminPanel')}
                      </button>
                    )}
                    {(isOperator || import.meta.env.DEV) && (
                      <button onClick={() => { navigateTo('operator_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all">
                        <Database className="w-5 h-5 text-emerald-500" /> {tStore('operatorPanel')}
                      </button>
                    )}
                    {isShipper && (
                      <button onClick={() => { navigateTo('shipper_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                        <Truck className="w-5 h-5 text-blue-500" /> {tStore('shipperPanel')}
                      </button>
                    )}
                    {(isOwner || import.meta.env.DEV) && (
                      <button onClick={() => { navigateTo('owner_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-2xl transition-all">
                        <TrendingUp className="w-5 h-5 text-violet-500" /> Owner Dashboard
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <button onClick={() => { loadInventory(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                  <RefreshCcw className="w-3.5 h-3.5" /> {tStore('refreshStore')}
                </button>
                <button onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">
                  <LogOut className="w-3.5 h-3.5" /> {tStore('signOut')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Category Left Sheet ── */}
      <AnimatePresence>
        {isCategorySheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategorySheetOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] lg:hidden"
            />
            {/* Sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 bottom-0 left-0 w-[80vw] max-w-xs z-[100] lg:hidden bg-card text-card-foreground rounded-r-3xl shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{tStore('browseCategories')}</span>
                </div>
                <button
                  onClick={() => setIsCategorySheetOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Scrollable tree */}
              <div className="overflow-y-auto flex-1 px-3 py-3">
                <CategoryTree
                  categories={translatedCategories}
                  selected={selectedCategory}
                  onSelect={(id) => {
                    setSelectedCategory(id);
                    setIsCategorySheetOpen(false);
                  }}
                  allProductsLabel={tStore('allCategories')}
                />
              </div>

              {/* Footer action */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-800 shrink-0">
                <button
                  onClick={() => { setSelectedCategory('All'); setIsCategorySheetOpen(false); }}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                >
                  {tStore('clearShowAll')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                {tStore('storeActions')}
              </div>

              {/* Exit Store (to Landing Page) */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  navigateTo('landing');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
              >
                <Home className="w-4 h-4 text-indigo-500" />
                <span>{tStore('exitStore')}</span>
              </button>

              {(isOwner || import.meta.env.DEV) && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    navigateTo('owner_dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-violet-500" />
                  <span>Owner Dashboard</span>
                </button>
              )}

              {/* Shopping Cart */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 text-indigo-500" />
                  <span>{tStore('shoppingCart')}</span>
                </div>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Browse Categories */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  setIsCategorySheetOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>{tStore('browseCategories')}</span>
              </button>

              {/* My Orders */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  navigateTo('history');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
              >
                <History className="w-4 h-4 text-indigo-500" />
                <span>{tStore('myOrders')}</span>
              </button>

              {/* My Account (only if authenticated and not anonymous) */}
              {user && !user.is_anonymous && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    setIsAccountModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>{tStore('myAccount')}</span>
                </button>
              )}

              {/* Recovery Key (only if registered user) */}
              {user && !user.is_anonymous && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    setIsRecovering(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
                >
                  <Key className="w-4 h-4 text-indigo-500" />
                  <span>{tStore('recoveryKey')}</span>
                </button>
              )}

              {/* Save Account (only for Guest users) */}
              {user?.is_anonymous && (
                <button
                  onClick={() => {
                    setIsFloatingMenuOpen(false);
                    setIsUpgrading(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-indigo-500" />
                  <span>{tStore('saveAccount')}</span>
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all text-left cursor-pointer"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span>{tStore('darkMode')}</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-indigo-500" />
                    <span>{tStore('lightMode')}</span>
                  </>
                )}
              </button>

              {/* Exit / Sign Out */}
              <button
                onClick={() => {
                  setIsFloatingMenuOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all text-left border border-rose-100 dark:border-rose-950/50 mt-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{tStore('exitSignOut')}</span>
              </button>
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

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userId={user?.id}
        userEmail={user?.email}
        isAdmin={isAdmin}
        isShipper={isShipper}
        onNavigate={navigateTo}
        onSignOut={onSignOut}
        onRecoveryKey={!user?.is_anonymous ? () => setIsRecovering(true) : undefined}
      />
      </div>
    </div>
  );
}
