import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShoppingCart, Check, Star, ShieldCheck, Truck, Sparkles, X, Leaf, Loader2, Database, AlertTriangle, ChevronRight, Home, Sun, Moon } from "lucide-react";
import { Product, PartialMetadata, Category, Language } from "../../../types/types";
import appConfig from "../../../config/appConfig";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../services/supabase";

const DEFAULT_LANGUAGES: Language[] = [
  { id: 'en-uuid-fallback', code: 'en', name: 'English', native_name: 'English', flag_emoji: '🇬🇧', is_default: true, is_active: true, created_at: '', updated_at: '' },
  { id: 'es-uuid-fallback', code: 'es', name: 'Spanish', native_name: 'Español', flag_emoji: '🇪🇸', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'fr-uuid-fallback', code: 'fr', name: 'French', native_name: 'Français', flag_emoji: '🇫🇷', is_default: false, is_active: true, created_at: '', updated_at: '' },
  { id: 'it-uuid-fallback', code: 'it', name: 'Italy', native_name: 'Italiano', flag_emoji: '🇮🇹', is_default: false, is_active: true, created_at: '', updated_at: '' }
];

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
    warranty: "Warranty",

    // Nutrition keys
    nutritionFacts: "Nutrition Facts",
    calories: "Calories",
    totalFat: "Total Fat",
    saturatedFat: "Saturated Fat",
    carbohydrates: "Total Carbohydrates",
    sugars: "Sugars",
    protein: "Protein",
    sodium: "Sodium",
    ingredients: "Ingredients",
    allergens: "Allergens",
    mainIngredients: "Main Ingredients",
    amountPerServing: "Amount Per Serving",
    nutritionalDna: "Nutritional & Transparency Data",
    productNutrition: "Product Nutrition facts"
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
    warranty: "Garantía",

    // Nutrition keys
    nutritionFacts: "Información Nutricional",
    calories: "Calorías",
    totalFat: "Grasa Total",
    saturatedFat: "Grasa Saturada",
    carbohydrates: "Carbohidratos Totales",
    sugars: "Azúcares",
    protein: "Proteínas",
    sodium: "Sodio",
    ingredients: "Ingredientes",
    allergens: "Alérgenos",
    mainIngredients: "Ingredientes Principales",
    amountPerServing: "Cantidad por Porción",
    nutritionalDna: "Datos Nutricionales y de Transparencia",
    productNutrition: "Información nutricional del producto"
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
    warranty: "Garantie",

    // Nutrition keys
    nutritionFacts: "Valeurs Nutritionnelles",
    calories: "Calories",
    totalFat: "Total Lipides",
    saturatedFat: "Acides Gras Saturés",
    carbohydrates: "Total Glucides",
    sugars: "Sucres",
    protein: "Protéines",
    sodium: "Sodium",
    ingredients: "Ingrédients",
    allergens: "Allergènes",
    mainIngredients: "Ingrédients Principaux",
    amountPerServing: "Quantité par portion",
    nutritionalDna: "Données Nutritionnelles et de Transparence",
    productNutrition: "Valeurs nutritionnelles du produit"
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
    warranty: "Garanzia",

    // Nutrition keys
    nutritionFacts: "Valori Nutrizionali",
    calories: "Calorie",
    totalFat: "Grassi Totali",
    saturatedFat: "Grassi Saturi",
    carbohydrates: "Carboidrati Totali",
    sugars: "Zuccheri",
    protein: "Proteine",
    sodium: "Sodio",
    ingredients: "Ingredienti",
    allergens: "Allergeni",
    mainIngredients: "Ingredienti Principali",
    amountPerServing: "Quantità per porzione",
    nutritionalDna: "Dati Nutrizionali e di Trasparenza",
    productNutrition: "Valori nutrizionali del prodotto"
  }
};

function formatValue(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'number') {
    return val % 1 === 0 ? String(val) : val.toFixed(1);
  }
  const str = String(val).trim();
  const match = str.match(/^([\d.]+)\s*([a-zA-Z%]*)$/);
  if (match) {
    const num = Number(match[1]);
    if (!isNaN(num)) {
      const formattedNum = num % 1 === 0 ? String(num) : num.toFixed(1);
      const unit = match[2];
      return unit ? `${formattedNum}${unit}` : formattedNum;
    }
  }
  return str;
}

function NutritionPanel({ nutritionalInfo, t }: { nutritionalInfo: any, t: (key: string) => string }) {
  if (!nutritionalInfo) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors w-full">
      {/* Nutrition Facts Label (US/EU style mockup) */}
      <div className="lg:col-span-5 border-4 border-black dark:border-white p-4 font-sans bg-white text-black select-none max-w-sm mx-auto w-full">
        <h2 className="text-2xl font-extrabold tracking-tight text-center leading-none border-b-8 border-black pb-1 uppercase">
          {t('nutritionFacts')}
        </h2>
        <div className="text-xs font-bold mt-1 border-b border-black pb-1 uppercase">{t('amountPerServing')}</div>

        <div className="flex justify-between items-baseline py-1 border-b-4 border-black">
          <span className="text-lg font-black uppercase">{t('calories')}</span>
          <span className="text-xl font-extrabold">{formatValue(nutritionalInfo.calories)}</span>
        </div>

        <div className="space-y-1.5 pt-2 text-sm">
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span><strong>{t('totalFat')}</strong> {formatValue(nutritionalInfo.total_fat)}</span>
          </div>
          {nutritionalInfo.saturated_fat && (
            <div className="flex justify-between border-b border-gray-300 pb-1 pl-4">
              <span>{t('saturatedFat')} {formatValue(nutritionalInfo.saturated_fat)}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span><strong>{t('carbohydrates')}</strong> {formatValue(nutritionalInfo.carbohydrates)}</span>
          </div>
          {nutritionalInfo.sugars && (
            <div className="flex justify-between border-b border-gray-300 pb-1 pl-4">
              <span>{t('sugars')} {formatValue(nutritionalInfo.sugars)}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span><strong>{t('protein')}</strong> {formatValue(nutritionalInfo.protein)}</span>
          </div>
          {nutritionalInfo.sodium && (
            <div className="flex justify-between border-b border-black pb-1">
              <span><strong>{t('sodium')}</strong> {formatValue(nutritionalInfo.sodium)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ingredients & Allergens List */}
      <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
        {/* Ingredients */}
        {nutritionalInfo.ingredients && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{t('ingredients')}</h4>
            <p className="text-sm font-bold text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/40 p-4 rounded-xl border border-gray-100/50 dark:border-slate-800/40">
              {Array.isArray(nutritionalInfo.ingredients) ? nutritionalInfo.ingredients.join(', ') : nutritionalInfo.ingredients}
            </p>
          </div>
        )}

        {/* Main Ingredients */}
        {nutritionalInfo.main_ingredients && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{t('mainIngredients')}</h4>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(nutritionalInfo.main_ingredients) ? nutritionalInfo.main_ingredients : [nutritionalInfo.main_ingredients]).map((item: string, i: number) => (
                <span key={i} className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergens */}
        {nutritionalInfo.allergens && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">{t('allergens')}</h4>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(nutritionalInfo.allergens) ? nutritionalInfo.allergens : [nutritionalInfo.allergens]).map((allergen: string, i: number) => (
                <span key={i} className="px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider rounded-xl border border-rose-100 dark:border-rose-900/40">
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {nutritionalInfo.certifications && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">{t('certifications')}</h4>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(nutritionalInfo.certifications) ? nutritionalInfo.certifications : [nutritionalInfo.certifications]).map((cert: string, i: number) => (
                <span key={i} className="px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider rounded-xl border border-amber-100 dark:border-amber-900/40">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
          if (!value || (typeof value !== 'string' && typeof value !== 'number')) return null;
          return (
            <div key={key} className="flex flex-col">
              <span className="text-[10px] font-black uppercase opacity-50 tracking-tighter mb-0.5">
                {t(key) !== key ? t(key) : key.replace(/_/g, ' ')}
              </span>
              <span className="text-sm font-bold leading-tight">{formatValue(value)}</span>
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
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [categoryTranslations, setCategoryTranslations] = useState<any[]>([]);
  const [productTranslation, setProductTranslation] = useState<any | null>(null);

  useEffect(() => {
    async function loadLocalization() {
      try {
        const { data: langs } = await supabase
          .from('languages')
          .select('*')
          .eq('is_active', true);

        const activeLangs = (langs && langs.length > 0) ? langs : DEFAULT_LANGUAGES;
        setLanguages(activeLangs);

        const defaultLang = activeLangs.find(l => l.is_default) || activeLangs[0] || null;
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = activeLangs.find(l => l.code === currentI18nCode) || defaultLang;
        setSelectedLanguage(matchedLang);
      } catch (err) {
        console.error("Error fetching languages in ProductDetails:", err);
        setLanguages(DEFAULT_LANGUAGES);
        const currentI18nCode = i18n.language || 'en';
        const matchedLang = DEFAULT_LANGUAGES.find(l => l.code === currentI18nCode) || DEFAULT_LANGUAGES[0];
        setSelectedLanguage(matchedLang);
      }
    }
    loadLocalization();
  }, [i18n.language]);

  useEffect(() => {
    if (!selectedLanguage) return;

    async function fetchLocalTranslations() {
      try {
        // Fetch product translation
        if (selectedLanguage.code !== 'en') {
          const { data: prodTrans } = await supabase
            .from('product_translations')
            .select('*')
            .eq('product_id', product.id)
            .eq('language_id', selectedLanguage.id)
            .maybeSingle();

          setProductTranslation(prodTrans || null);
        } else {
          setProductTranslation(null);
        }

        // Fetch category translations
        const { data: catTrans } = await supabase
          .from('category_translations')
          .select('*')
          .eq('language_id', selectedLanguage.id);

        setCategoryTranslations(catTrans || []);
      } catch (err) {
        console.error("Error fetching local translations:", err);
      }
    }

    fetchLocalTranslations();
  }, [selectedLanguage, product.id]);

  const displayProduct = useMemo(() => {
    if (!selectedLanguage || selectedLanguage.code === 'en' || !productTranslation) {
      return product;
    }
    return {
      ...product,
      title: productTranslation.name || product.title,
      name: productTranslation.name || product.name,
      description: productTranslation.description || product.description,
      digital_passport_url: productTranslation.metadata_url || product.digital_passport_url,
      metadata_url: productTranslation.metadata_url || product.metadata_url,
    };
  }, [product, productTranslation, selectedLanguage]);

  const translatedCategories = useMemo(() => {
    if (!selectedLanguage || selectedLanguage.code === 'en' || categoryTranslations.length === 0) {
      return categories;
    }
    return categories.map(cat => {
      const translation = categoryTranslations.find(
        t => t.category_id === cat.id
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

  const currentLang = selectedLanguage?.code || i18n.language || 'en';

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
    if (!displayProduct.brand_id || !brands) return null;
    return brands.find(b => b.id === displayProduct.brand_id) || null;
  }, [displayProduct.brand_id, brands]);

  // Compute hierarchical breadcrumbs from current category to root
  const breadcrumbs = useMemo(() => {
    const path: Category[] = [];
    let currentId = displayProduct.category_id;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = translatedCategories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parent_id || "";
    }
    return path;
  }, [displayProduct.category_id, translatedCategories]);

  useEffect(() => {
    if (displayProduct.digital_passport_url) {
      setIsLoadingMetadata(true);
      fetch(displayProduct.digital_passport_url)
        .then(res => res.json())
        .then(data => {
          const actualMetadata = data.partial_metadata || data.metadata || data;
          setMetadata(actualMetadata);
        })
        .catch(err => console.error("Error fetching metadata:", err))
        .finally(() => setIsLoadingMetadata(false));
    } else {
      setMetadata(null);
    }
  }, [displayProduct.digital_passport_url]);

  const handleAdd = () => {
    onAddToCart(displayProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), appConfig.addToCartFlashMs);
  };

  return (
    <div className="product-details-container min-h-screen transition-colors duration-500 overflow-hidden relative z-0">
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

      <div className="relative z-10 w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Breadcrumb & Cart Navigation ── */}
          <nav className="flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mb-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl text-card-foreground px-6 py-4 rounded-[1rem] shadow-sm border border-gray-100/50 dark:border-slate-800/50 transition-colors">
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
                {displayProduct.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher select */}
              {languages.length > 0 && (
                <div className="relative mr-1">
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

          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl text-card-foreground rounded-[1rem] shadow-xl shadow-indigo-100/10 dark:shadow-black/30 border border-gray-100/50 dark:border-slate-800/50 overflow-hidden transition-colors duration-500">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* ── Image Section ── */}
              <div className="relative p-6 lg:p-10 bg-transparent flex items-center justify-center min-h-[320px] transition-colors border-b lg:border-b-0 lg:border-r border-gray-100/50 dark:border-slate-800/50">
                {/* Background decorative blob */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/5 dark:bg-indigo-500/5 blur-3xl rounded-full" />
                </div>

                <motion.img
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  src={displayProduct.image_url}
                  alt={displayProduct.name}
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full max-w-[280px] object-contain drop-shadow-2xl transition-all duration-350 hover:drop-shadow-[0_30px_30px_rgba(99,102,241,0.25)] dark:hover:drop-shadow-[0_30px_30px_rgba(99,102,241,0.15)] cursor-zoom-in"
                />

                {/* Badges */}
                <div className="absolute top-8 left-8 flex flex-col gap-2 z-20">
                  {!displayProduct.in_stock && (
                    <div className="px-4 py-1.5 bg-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-rose-500/30">
                      {t('outOfStock')}
                    </div>
                  )}
                  {displayProduct.in_stock && displayProduct.quantity < 5 && (
                    <div className="px-4 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/30">
                      {t('onlyLeft', { qty: displayProduct.quantity })}
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
                  {displayProduct.title}
                </motion.h1>

                {/* Brand and Manufacturer */}
                {(brand || displayProduct.manufacturer) && (
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
                    {displayProduct.manufacturer && (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/40">
                        {t('mfg', { mfg: displayProduct.manufacturer })}
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
                  {displayProduct.discount_percentage && displayProduct.discount_percentage > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-400 line-through">
                        {appConfig.currency_symbol}{displayProduct.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                          {appConfig.currency_symbol}{(displayProduct.price * (1 - displayProduct.discount_percentage / 100)).toFixed(2)}
                        </span>
                        <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-rose-500/20">
                          -{displayProduct.discount_percentage}% OFF
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {appConfig.currency_symbol}{displayProduct.price.toFixed(2)}
                    </span>
                  )}

                  <div className="w-px h-12 bg-gray-100 dark:border-slate-800" />

                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${displayProduct.in_stock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      <span className={`text-sm font-black uppercase tracking-wider ${displayProduct.in_stock ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {displayProduct.in_stock ? t('inStock') : t('outOfStock')}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 pl-4 uppercase tracking-widest">
                      {t('unitsAvailable', { qty: displayProduct.quantity })}
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
                      {displayProduct.description || t('fallbackDescription')}
                    </p>
                  </div>

                  {displayProduct.digital_passport_url && (
                    <button
                      onClick={() => setShowMetadataUrl(true)}
                      className="shrink-0 p-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl text-card-foreground rounded-[1rem] border border-gray-100/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all group relative"
                    >
                      <QRCodeSVG value={displayProduct.digital_passport_url} size={80} level="H" />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                        {t('scanClickDna')}
                      </div>
                    </button>
                  )}
                </motion.div>

                {/* Product Attributes/Specifications */}
                {(() => {
                  if (displayProduct.attributes && Object.keys(displayProduct.attributes).length > 0) {
                    const hasRealSpecs = Object.entries(displayProduct.attributes).some(([key, val]) => {
                      if (['durability_data', 'repairability_data', 'manufacturing_data', 'lifecycle_data', 'baseName', 'nutritional_info'].includes(key)) return false;
                      return val !== undefined && val !== null && String(val).trim() !== '';
                    });

                    if (!hasRealSpecs) return null;

                    return (
                      <div className="mb-6 border-t border-gray-100 dark:border-slate-800/80 pt-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t('specifications')}</h4>
                        <div className="grid grid-cols-2 gap-2.5">
                          {Object.entries(displayProduct.attributes).map(([key, val]) => {
                            if (['durability_data', 'repairability_data', 'manufacturing_data', 'lifecycle_data', 'baseName', 'nutritional_info'].includes(key)) {
                              return null;
                            }
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
                    );
                  }

                  return null;
                })()}

                {/* Action Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6 mt-auto"
                >
                  <button
                    onClick={handleAdd}
                    disabled={!displayProduct.in_stock}
                    className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-350 ${!displayProduct.in_stock
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
                    ) : !displayProduct.in_stock ? (
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
                    <div className={`p-3 rounded-2xl text-white shadow-lg ${metadata?.nutritional_info ? 'bg-amber-600 shadow-amber-600/20' : 'bg-emerald-600 shadow-emerald-600/20'}`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                        {metadata?.nutritional_info ? t('productNutrition') : t('productDna')}
                      </h3>
                      <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 ${metadata?.nutritional_info ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {metadata?.nutritional_info ? t('nutritionalDna') : t('transparencyData')}
                      </p>
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
                    metadata.nutritional_info ? (
                      <NutritionPanel nutritionalInfo={metadata.nutritional_info} t={t} />
                    ) : (
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
                    )
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
    </div>
  );
}
