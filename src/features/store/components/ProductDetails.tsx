import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShoppingCart, Check, Star, ShieldCheck, Truck, Sparkles, X, Leaf, Loader2, Database, AlertTriangle, ChevronRight, Home, Sun, Moon } from "lucide-react";
import { Product, PartialMetadata, Category } from "../../../types/types";
import appConfig from "../../../config/appConfig";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";

import { useCart } from "../../../context/CartContext";
import { useInventory } from "../../../context/InventoryContext";
import { useTheme } from "../../../context/ThemeContext";
import { Tooltip } from "../../../components/Tooltip";

const DETAILS_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    fallbackDescription: "A wonderful, magical product that guarantees hours of entertainment and smiles.",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    onlyLeft: "Only {qty} left",
    unitsAvailable: "{qty} units available",
    store: "Store",
    brand: "Brand: {brand}",
    mfg: "Mfg: {mfg}",
    toggleTheme: "Toggle theme",
    shoppingCart: "Shopping cart",
    scanClickDna: "Scan or Click for Product DNA",
    specifications: "Specifications",
    freeShipping: "Free Shipping",
    securePayment: "Secure Payment",
    productDna: "Product DNA",
    transparencyData: "Transparency & Sustainability Data",
    fetchingIpfs: "Fetching IPFS Records...",
    durabilityLifeSpan: "Durability & Life Span",
    repairability: "Repairability",
    manufacturing: "Manufacturing",
    lifecycleImpact: "Lifecycle Impact",
    couldNotLoadDna: "Could not load sustainability data.",
    reviews: "(4.9/5 Reviews)",
    
    // Metadata property keys
    life_span: "Life Span",
    reliability: "Reliability",
    reusability: "Reusability",
    refurbishment: "Refurbishment",
    recycled_content: "Recycled Content",
    ease_of_repair: "Ease of Repair",
    spare_parts: "Spare Parts Availability",
    maintenance_manual: "Maintenance Manual",
    carbon_footprint: "Carbon Footprint",
    water_consumption: "Water Consumption",
    recyclability: "Recyclability",
    facility: "Manufacturing Facility",
    location: "Location",
    certifications: "Certifications",

    // Specifications keys
    dimensions: "Dimensions",
    weight: "Weight",
    material: "Material",
    color: "Color",
    age_group: "Age Group",
    battery_required: "Battery Required",
    warranty: "Warranty"
  },
  es: {
    fallbackDescription: "Un producto maravilloso y mágico que garantiza horas de entretenimiento y sonrisas.",
    addToCart: "Añadir al carrito",
    addedToCart: "Añadido al carrito",
    outOfStock: "Agotado",
    inStock: "En stock",
    onlyLeft: "Solo quedan {qty}",
    unitsAvailable: "{qty} unidades disponibles",
    store: "Tienda",
    brand: "Marca: {brand}",
    mfg: "Fab: {mfg}",
    toggleTheme: "Alternar tema",
    shoppingCart: "Carrito de compras",
    scanClickDna: "Escanee o haga clic para ver el ADN del producto",
    specifications: "Especificaciones",
    freeShipping: "Envío gratis",
    securePayment: "Pago seguro",
    productDna: "ADN del producto",
    transparencyData: "Datos de transparencia y sostenibilidad",
    fetchingIpfs: "Obteniendo registros de IPFS...",
    durabilityLifeSpan: "Durabilidad y vida útil",
    repairability: "Reparabilidad",
    manufacturing: "Fabricación",
    lifecycleImpact: "Impacto del ciclo de vida",
    couldNotLoadDna: "No se pudieron cargar los datos de sostenibilidad.",
    reviews: "(4.9/5 Reseñas)",

    // Metadata property keys
    life_span: "Vida útil",
    reliability: "Fiabilidad",
    reusability: "Reutilizabilidad",
    refurbishment: "Reacondicionamiento",
    recycled_content: "Contenido reciclado",
    ease_of_repair: "Facilidad de reparación",
    spare_parts: "Disponibilidad de repuestos",
    maintenance_manual: "Manual de mantenimiento",
    carbon_footprint: "Huella de carbono",
    water_consumption: "Consumo de agua",
    recyclability: "Reciclabilidad",
    facility: "Instalación de fabricación",
    location: "Ubicación",
    certifications: "Certificaciones",

    // Specifications keys
    dimensions: "Dimensiones",
    weight: "Peso",
    material: "Material",
    color: "Color",
    age_group: "Grupo de edad",
    battery_required: "Requiere batería",
    warranty: "Garantía"
  },
  fr: {
    fallbackDescription: "Un produit merveilleux et magique qui garantit des heures de divertissement et de sourires.",
    addToCart: "Ajouter au panier",
    addedToCart: "Ajouté au panier",
    outOfStock: "Rupture de stock",
    inStock: "En stock",
    onlyLeft: "Plus que {qty} restants",
    unitsAvailable: "{qty} unités disponibles",
    store: "Boutique",
    brand: "Marque: {brand}",
    mfg: "Fab: {mfg}",
    toggleTheme: "Changer de thème",
    shoppingCart: "Panier",
    scanClickDna: "Scannez ou cliquez pour l'ADN du produit",
    specifications: "Spécifications",
    freeShipping: "Livraison gratuite",
    securePayment: "Paiement sécurisé",
    productDna: "ADN du produit",
    transparencyData: "Données de transparence et de durabilité",
    fetchingIpfs: "Récupération des dossiers IPFS...",
    durabilityLifeSpan: "Durabilité et durée de vie",
    repairability: "Réparabilité",
    manufacturing: "Fabrication",
    lifecycleImpact: "Impact sur le cycle de vie",
    couldNotLoadDna: "Impossible de charger les données de durabilité.",
    reviews: "(4.9/5 Avis)",

    // Metadata property keys
    life_span: "Durée de vie",
    reliability: "Fiabilité",
    reusability: "Réutilisabilité",
    refurbishment: "Remise à neuf",
    recycled_content: "Contenu recyclé",
    ease_of_repair: "Facilité de réparation",
    spare_parts: "Disponibilité des pièces de rechange",
    maintenance_manual: "Manuel d'entretien",
    carbon_footprint: "Empreinte carbone",
    water_consumption: "Consommation d'eau",
    recyclability: "Recyclabilité",
    facility: "Site de fabrication",
    location: "Emplacement",
    certifications: "Certifications",

    // Specifications keys
    dimensions: "Dimensions",
    weight: "Poids",
    material: "Matériau",
    color: "Couleur",
    age_group: "Groupe d'âge",
    battery_required: "Pile requise",
    warranty: "Garantie"
  },
  it: {
    fallbackDescription: "Un prodotto meraviglioso e magico che garantisce ore di divertimento e sorrisi.",
    addToCart: "Aggiungi al carrello",
    addedToCart: "Aggiunto al carrello",
    outOfStock: "Esaurito",
    inStock: "In magazzino",
    onlyLeft: "Solo {qty} rimasti",
    unitsAvailable: "{qty} unità disponibili",
    store: "Negozio",
    brand: "Marca: {brand}",
    mfg: "Prod: {mfg}",
    toggleTheme: "Cambia tema",
    shoppingCart: "Carrello",
    scanClickDna: "Scansiona o clicca per il DNA del prodotto",
    specifications: "Specifiche",
    freeShipping: "Spedizione gratuita",
    securePayment: "Pagamento sicuro",
    productDna: "DNA del prodotto",
    transparencyData: "Dati di trasparenza e sostenibilità",
    fetchingIpfs: "Recupero record IPFS...",
    durabilityLifeSpan: "Durabilità e durata",
    repairability: "Riparabilità",
    manufacturing: "Produzione",
    lifecycleImpact: "Impatto del ciclo di vita",
    couldNotLoadDna: "Impossibile caricare i dati di sostenibilità.",
    reviews: "(4.9/5 Recensioni)",

    // Metadata property keys
    life_span: "Durata della vita",
    reliability: "Affidabilità",
    reusability: "Riutilizzabilità",
    refurbishment: "Ricondizionamento",
    recycled_content: "Contenuto riciclato",
    ease_of_repair: "Facilità di riparazione",
    spare_parts: "Disponibilità pezzi di ricambio",
    maintenance_manual: "Manuale di manutenzione",
    carbon_footprint: "Impronta di carbonio",
    water_consumption: "Consumo di acqua",
    recyclability: "Riciclabilità",
    facility: "Sito di produzione",
    location: "Posizione",
    certifications: "Certificazioni",

    // Specifications keys
    dimensions: "Dimensioni",
    weight: "Peso",
    material: "Materiale",
    color: "Colore",
    age_group: "Fascia d'età",
    battery_required: "Batteria richiesta",
    warranty: "Garanzia"
  }
};

function MetadataSection({ title, icon, color, data, t }: { title: string, icon: React.ReactNode, color: string, data?: any, t: (key: string) => string }) {
  if (!data) return null;

  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
  };

  return (
    <div
      className={`p-6 rounded-[1rem] border ${colorClasses[color] || colorClasses.indigo} transition-all`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white dark:bg-black/20 rounded-xl shadow-sm">
          {icon}
        </div>
        <h4 className="font-black uppercase tracking-widest text-xs">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          if (!value || typeof value !== 'string') return null;
          return (
            <div key={key} className="flex flex-col">
              <span className="text-[10px] font-black uppercase opacity-50 tracking-tighter mb-0.5">
                {t(key) !== key ? t(key) : key.replace(/_/g, ' ')}
              </span>
              <span className="text-sm font-bold leading-tight">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onCategorySelect?: (categoryId: string) => void;
}

export function ProductDetails({ product, onBack, onCategorySelect }: ProductDetailsProps) {
  const { theme, toggleTheme } = useTheme();
  const { addToCart: onAddToCart, cartCount, setIsCartOpen } = useCart();
  const { categories, brands } = useInventory();
  const [isAdded, setIsAdded] = useState(false);
  const [showMetadataUrl, setShowMetadataUrl] = useState(false);
  const [metadata, setMetadata] = useState<PartialMetadata | null>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const langData = DETAILS_TRANSLATIONS[currentLang] || DETAILS_TRANSLATIONS.en;
    let text = langData[key] || DETAILS_TRANSLATIONS.en[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const brand = useMemo(() => {
    if (!product.brand_id || !brands) return null;
    return brands.find(b => b.id === product.brand_id) || null;
  }, [product.brand_id, brands]);

  // Compute hierarchical breadcrumbs from current category to root
  const breadcrumbs = useMemo(() => {
    const path: Category[] = [];
    let currentId = product.category_id;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = categories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parent_id || "";
    }
    return path;
  }, [product.category_id, categories]);

  useEffect(() => {
    if (showMetadataUrl && !metadata && product.digital_passport_url) {
      setIsLoadingMetadata(true);
      fetch(product.digital_passport_url)
        .then(res => res.json())
        .then(data => {
          const actualMetadata = data.partial_metadata || data.metadata || data;
          setMetadata(actualMetadata);
        })
        .catch(err => console.error("Error fetching metadata:", err))
        .finally(() => setIsLoadingMetadata(false));
    }
  }, [showMetadataUrl, metadata, product.digital_passport_url]);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), appConfig.addToCartFlashMs);
  };

  return (
    <div className="product-details-container min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* ── Breadcrumb & Cart Navigation ── */}
        <nav className="flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mb-8 bg-card text-card-foreground px-6 py-4 rounded-[1rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{t('store')}</span>
            </button>

            {breadcrumbs.map((cat) => (
              <React.Fragment key={cat.id}>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-700" />
                <button
                  onClick={() => onCategorySelect?.(cat.id)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {cat.name}
                </button>
              </React.Fragment>
            ))}

            <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-700" />
            <span className="text-gray-900 dark:text-white font-extrabold truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[240px]">
              {product.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Tooltip label={t('toggleTheme')}>
              <button onClick={toggleTheme} className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
                {theme === 'light' ? <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5" /> : <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
              </button>
            </Tooltip>

            <Tooltip label={t('shoppingCart')}>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>
            </Tooltip>
          </div>
        </nav>

        <div className="bg-card text-card-foreground rounded-[1rem] shadow-xl shadow-indigo-100/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-500">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* ── Image Section ── */}
            <div className="relative p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center min-h-[320px] transition-colors">
              {/* Background decorative blob */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 dark:bg-slate-800/20 blur-3xl rounded-full" />
              </div>

              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={product.image_url}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full max-w-[280px] object-contain drop-shadow-2xl transition-all duration-350 hover:drop-shadow-[0_30px_30px_rgba(99,102,241,0.25)] dark:hover:drop-shadow-[0_30px_30px_rgba(99,102,241,0.15)] cursor-zoom-in"
              />

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2 z-20">
                {!product.in_stock && (
                  <div className="px-4 py-1.5 bg-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-rose-500/30">
                    {t('outOfStock')}
                  </div>
                )}
                {product.in_stock && product.quantity < 5 && (
                  <div className="px-4 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/30">
                    {t('onlyLeft', { qty: product.quantity })}
                  </div>
                )}
              </div>
            </div>

            {/* ── Details Section ── */}
            <div className="p-8 lg:p-16 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('reviews')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-4 transition-colors"
              >
                {product.title}
              </motion.h1>

              {/* Brand and Manufacturer */}
              {(brand || product.manufacturer) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-2.5 mb-6"
                >
                  {brand && (
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/40">
                      {t('brand', { brand: brand.name })}
                    </span>
                  )}
                  {product.manufacturer && (
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/40">
                      {t('mfg', { mfg: product.manufacturer })}
                    </span>
                  )}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 mb-8"
              >
                {product.discount_percentage && product.discount_percentage > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-400 line-through">
                      {appConfig.currency_symbol}{product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {appConfig.currency_symbol}{(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-rose-500/20">
                        -{product.discount_percentage}% OFF
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {appConfig.currency_symbol}{product.price.toFixed(2)}
                  </span>
                )}

                <div className="w-px h-12 bg-gray-100 dark:border-slate-800" />

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className={`text-sm font-black uppercase tracking-wider ${product.in_stock ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {product.in_stock ? t('inStock') : t('outOfStock')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 pl-4 uppercase tracking-widest">
                    {t('unitsAvailable', { qty: product.quantity })}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 mb-10"
              >
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                    {product.description || t('fallbackDescription')}
                  </p>
                </div>

                {product.digital_passport_url && (
                  <button
                    onClick={() => setShowMetadataUrl(true)}
                    className="shrink-0 p-3 bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all group relative"
                  >
                    <QRCodeSVG value={product.digital_passport_url} size={80} level="H" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                      {t('scanClickDna')}
                    </div>
                  </button>
                )}
              </motion.div>

              {/* Product Attributes/Specifications */}
              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div className="mb-6 border-t border-gray-100 dark:border-slate-800/80 pt-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t('specifications')}</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.entries(product.attributes).map(([key, val]) => {
                      if (!val || (typeof val === 'object' && Object.keys(val).length === 0)) return null;

                      const formattedKey = t(key) !== key ? t(key) : key.replace(/_/g, ' ');

                      let formattedVal = "";
                      if (typeof val === 'object') {
                        const dims = val as any;
                        if (dims.length !== undefined && dims.width !== undefined && dims.height !== undefined) {
                          formattedVal = `${dims.length}x${dims.width}x${dims.height} ${dims.unit || 'cm'}`;
                        } else {
                          formattedVal = JSON.stringify(val);
                        }
                      } else {
                        formattedVal = String(val);
                      }

                      return (
                        <div key={key} className="flex flex-col p-2.5 bg-gray-50/50 dark:bg-slate-800/30 rounded-xl border border-gray-100/50 dark:border-slate-800/40 transition-colors">
                          <span className="text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-0.5">{formattedKey}</span>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 capitalize">{formattedVal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 mt-auto"
              >
                <button
                  onClick={handleAdd}
                  disabled={!product.in_stock}
                  className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-350 ${!product.in_stock
                    ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : isAdded
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[0.98]"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 dark:shadow-indigo-500/10 hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                    }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-6 h-6" />
                      {t('addedToCart')}
                    </>
                  ) : !product.in_stock ? (
                    t('outOfStock')
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      {t('addToCart')}
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400 transition-colors">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition-colors">
                      <Truck className="w-5 h-5" />
                    </div>
                    {t('freeShipping')}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400 transition-colors">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    {t('securePayment')}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metadata Modal ── */}
      <AnimatePresence>
        {showMetadataUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMetadataUrl(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-card text-card-foreground rounded-[1rem] shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-600/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">{t('productDna')}</h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-0.5">{t('transparencyData')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMetadataUrl(false)}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-2xl transition-colors text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 lg:p-12 overflow-y-auto max-h-[70vh]">
                {isLoadingMetadata ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">{t('fetchingIpfs')}</p>
                  </div>
                ) : metadata ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Durability */}
                    <MetadataSection
                      title={t('durabilityLifeSpan')}
                      icon={<ShieldCheck className="w-5 h-5" />}
                      color="indigo"
                      data={metadata.durability_data}
                      t={t}
                    />
                    {/* Repairability */}
                    <MetadataSection
                      title={t('repairability')}
                      icon={<Truck className="w-5 h-5" />}
                      color="blue"
                      data={metadata.repairability_data}
                      t={t}
                    />
                    {/* Manufacturing */}
                    <MetadataSection
                      title={t('manufacturing')}
                      icon={<Database className="w-5 h-5" />}
                      color="violet"
                      data={metadata.manufacturing_data}
                      t={t}
                    />
                    {/* Life Cycle */}
                    <MetadataSection
                      title={t('lifecycleImpact')}
                      icon={<Leaf className="w-5 h-5" />}
                      color="emerald"
                      data={metadata.lifecycle_data}
                      t={t}
                    />
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">{t('couldNotLoadDna')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
