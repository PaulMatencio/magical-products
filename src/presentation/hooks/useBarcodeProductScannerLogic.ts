import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useDependencies } from '../../context/DependenciesContext';
import { useInventory } from '../../context/InventoryContext';
import { InitialProductDataDraft } from '../../application/use-cases/operator/GenerateInitialProductDataUseCase';
import i18n from '../../i18n';

export type ScannerStatus = 'idle' | 'starting' | 'scanning' | 'unsupported' | 'error';

export function useBarcodeProductScannerLogic() {
  const { categories, brands } = useInventory();
  const { generateInitialProductDataUseCase, geminiAnalyzerService } = useDependencies();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const detectorRef = useRef<any>(null);

  const [status, setStatus] = useState<ScannerStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [scannedCode, setScannedCode] = useState('');
  const [form, setForm] = useState<InitialProductDataDraft>(() =>
    generateInitialProductDataUseCase.createInitialDraft(categories, brands)
  );

  const [internetImageUrl, setInternetImageUrl] = useState<string | null>(null);
  const [isFetchingInternetImage, setIsFetchingInternetImage] = useState(false);
  const [internetProductInfo, setInternetProductInfo] = useState<{ name: string; brand: string } | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [brandHint, setBrandHint] = useState('');
  const [nameHint, setNameHint] = useState('');

  const lookupBarcode = useCallback(async (code: string, baseForm?: InitialProductDataDraft) => {
    if (!code) return;
    setIsFetchingInternetImage(true);
    setInternetImageUrl(null);
    setInternetProductInfo(null);
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
      
      let next = baseForm || generateInitialProductDataUseCase.createInitialDraft(categories, brands);
      next.sku = code;

      if (!res.ok) {
        setForm(next);
        return;
      }
      
      const data = await res.json();
      if (data.status === 1 && data.product) {
        const prod = data.product;
        const imgUrl = prod.image_front_url || prod.image_url;
        if (imgUrl) {
          setInternetImageUrl(imgUrl);
        }
        setInternetProductInfo({
          name: prod.product_name || '',
          brand: prod.brands || '',
        });

        // Auto-populate form fields from Open Food Facts data
        if (prod.product_name) next.name = prod.product_name;
        if (prod.brands) {
          next.brand = prod.brands.split(',')[0].trim();
        }
        if (prod.manufacturer || prod.brand_owner) {
          next.manufacturer = prod.manufacturer || prod.brand_owner;
        }
        if (prod.ingredients_text) {
          next.ingredients = prod.ingredients_text;
          const cleanList = prod.ingredients_text.split(',').map((s: string) => s.trim()).filter((s: string) => s && s.length > 2);
          if (cleanList.length > 0) {
            next.mainIngredients = cleanList.slice(0, 3).join(', ');
          }
        }
        if (prod.labels) {
          next.certifications = prod.labels.split(',').map((s: string) => s.trim()).join(', ');
        }
        if (prod.allergens_from_ingredients || prod.allergens) {
          const allg = prod.allergens_from_ingredients || prod.allergens;
          next.allergens = allg.split(',').map((s: string) => s.replace(/^[a-z]{2}:/, '').trim()).filter(Boolean).join(', ');
        }

        // Nutriments mapping
        const nuts = prod.nutriments;
        if (nuts) {
          const kcal = nuts['energy-kcal'] || nuts['energy-kcal_100g'];
          if (kcal !== undefined) next.calories = String(kcal);

          const fat = nuts.fat || nuts.fat_100g;
          if (fat !== undefined) next.totalFat = `${fat}g`;

          const satFat = nuts['saturated-fat'] || nuts['saturated-fat_100g'];
          if (satFat !== undefined) next.saturatedFat = `${satFat}g`;

          const carbs = nuts.carbohydrates || nuts.carbohydrates_100g;
          if (carbs !== undefined) next.carbohydrates = `${carbs}g`;

          const sugars = nuts.sugars || nuts.sugars_100g;
          if (sugars !== undefined) next.sugars = `${sugars}g`;

          const prot = nuts.proteins || nuts.proteins_100g;
          if (prot !== undefined) next.protein = `${prot}g`;

          const sod = nuts.sodium || nuts.sodium_100g;
          if (sod !== undefined) {
            next.sodium = `${Math.round(sod * 1000)}mg`;
          }
        }

        // Translate to active UI language if key exists
        const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
        const currentLang = (i18n.language || 'en').split('-')[0];
        if (key && (next.name || next.ingredients || next.certifications)) {
          try {
            const translated = await geminiAnalyzerService.translateDraft(next, currentLang, key);
            if (translated) {
              next = { ...next, ...translated };
            }
          } catch (err) {
            console.error("Translation of fetched barcode failed:", err);
            toast.error("Translation of fetched barcode failed: " + err);
          }
        }
      }

      setForm(next);

    } catch (err) {
      console.error("Barcode lookup failed:", err);
      toast.error("Barcode lookup failed: " + err);
      if (baseForm) {
        setForm(baseForm);
      }
    } finally {
      setIsFetchingInternetImage(false);
    }
  }, [apiKey, brands, categories, generateInitialProductDataUseCase, geminiAnalyzerService]);

  const downloadProductImage = useCallback(async () => {
    if (!internetImageUrl) return;
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'product';
    const barcode = scannedCode || form.sku || '';
    const suffix = barcode ? `_${barcode}` : '';
    const filename = `${slug}${suffix}.jpg`;

    try {
      const response = await fetch(internetImageUrl);
      const blob = await response.blob();

      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'JPEG Images',
              accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
              },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          toast.success('Product image saved successfully');
          return;
        } catch (err: any) {
          if (err.name === 'AbortError') {
            return;
          }
          console.warn('File System Access API failed, falling back to standard download:', err);
        }
      }

      // Fallback: Standard browser download
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
      toast.success('Product image downloaded to default folder');
    } catch (err) {
      console.error("Image download failed:", err);
      // Fallback: Open in new tab if CORS blocks fetch
      window.open(internetImageUrl, '_blank');
      toast.info('Opened image in a new tab for saving.');
    }
  }, [internetImageUrl, form.name, form.sku, scannedCode]);

  useEffect(() => {
    const initialDraft = generateInitialProductDataUseCase.createInitialDraft(categories, brands);
    setForm(prev => ({
      ...prev,
      category: prev.category || initialDraft.category,
      brand: prev.brand || initialDraft.brand,
    }));
  }, [brands, categories, generateInitialProductDataUseCase]);

  const stopCamera = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus(current => current === 'scanning' || current === 'starting' ? 'idle' : current);
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const applyScannedValue = useCallback((value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;

    setScannedCode(cleanValue);
    const nextForm = generateInitialProductDataUseCase.applyScannedValue(form, cleanValue);
    toast.success('Barcode captured');
    lookupBarcode(cleanValue, nextForm);
  }, [generateInitialProductDataUseCase, lookupBarcode, form]);

  const scanFrame = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current) return;

    try {
      if (videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        const results = await detectorRef.current.detect(videoRef.current);
        const first = results?.[0]?.rawValue;
        if (first) {
          applyScannedValue(first);
          stopCamera();
          return;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Scanner failed.');
      setStatus('error');
      stopCamera();
      return;
    }

    frameRef.current = requestAnimationFrame(scanFrame);
  }, [applyScannedValue, stopCamera]);

  const startCamera = useCallback(async () => {
    setError(null);
    setUploadedImageUrl(null);

    try {
      setStatus('starting');
      if ('BarcodeDetector' in window) {
        const Detector = (window as any).BarcodeDetector;
        detectorRef.current = new Detector({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code'],
        });
      } else {
        detectorRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStatus('scanning');
      if (detectorRef.current) {
        frameRef.current = requestAnimationFrame(scanFrame);
      }
    } catch (err: any) {
      setError(err.message || 'Camera access failed.');
      setStatus('error');
      stopCamera();
    }
  }, [scanFrame, stopCamera]);

  const updateForm = useCallback((field: keyof InitialProductDataDraft, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const generatedData = useMemo(
    () => generateInitialProductDataUseCase.generate(scannedCode, form),
    [form, generateInitialProductDataUseCase, scannedCode]
  );

  const jsonText = useMemo(
    () => generateInitialProductDataUseCase.serialize(generatedData),
    [generateInitialProductDataUseCase, generatedData]
  );

  const copyJson = useCallback(async () => {
    if (!jsonText) return;
    await navigator.clipboard.writeText(jsonText);
    toast.success('Initial product JSON copied');
  }, [jsonText]);

  const downloadJson = useCallback(async () => {
    if (!jsonText || !generatedData) return;
    const filename = generateInitialProductDataUseCase.getDownloadFileName(generatedData);

    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: 'JSON Product Data',
            accept: {
              'application/json': ['.json'],
            },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(jsonText);
        await writable.close();
        toast.success('Product JSON saved successfully');
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return;
        }
        console.warn('File System Access API failed, falling back to standard download:', err);
      }
    }

    // Fallback: Standard browser download to default Downloads folder
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    toast.success('Product JSON downloaded to default folder');
  }, [generateInitialProductDataUseCase, generatedData, jsonText]);

  // Gemini state and functions

  const saveApiKey = useCallback((key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  }, []);

  const translateFormToLanguage = useCallback(async (targetLang: string, currentForm: InitialProductDataDraft) => {
    const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (!key) return;

    const hasData = currentForm.name || currentForm.description || currentForm.ingredients || currentForm.lifeSpan || currentForm.origin;
    if (!hasData) return;

    setIsTranslating(true);
    try {
      const translatedDraft = await geminiAnalyzerService.translateDraft(currentForm, targetLang, key);
      if (translatedDraft) {
        setForm(prev => ({
          ...prev,
          ...translatedDraft
        }));
        toast.success(`Form data translated to ${targetLang.toUpperCase()}`);
      }
    } catch (err: any) {
      console.error('Translation failed:', err);
      toast.error(`Failed to translate form data: ${err.message || err}`);
    } finally {
      setIsTranslating(false);
    }
  }, [apiKey, geminiAnalyzerService]);

  const analyzeImage = useCallback(async (base64Data: string, fromUpload = false) => {
    const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (!key) {
      toast.error('Please configure your Gemini API Key first.');
      return;
    }
    setIsAnalyzing(true);
    setUploadedImageUrl(base64Data);
    if (fromUpload) {
      setScannedCode('');
      setInternetImageUrl(null);
      setInternetProductInfo(null);
    }
    try {
      const currentLang = (i18n.language || 'en').split('-')[0];
      const result = await geminiAnalyzerService.analyzePackaging(base64Data, key, fromUpload ? '' : scannedCode);

      let nextForm = fromUpload
        ? generateInitialProductDataUseCase.createInitialDraft(categories, brands)
        : { ...form };
      if (result.name) nextForm.name = result.name;
      if (result.category) nextForm.category = result.category;
      if (result.description) nextForm.description = result.description;
      if (result.brand) nextForm.brand = result.brand;
      if (result.manufacturer) nextForm.manufacturer = result.manufacturer;
      if (result.attributes?.color) nextForm.color = result.attributes.color;
      if (result.attributes?.size) nextForm.size = result.attributes.size;
      if (result.attributes?.material) nextForm.material = result.attributes.material;
      if (result.attributes?.weight) nextForm.weight = result.attributes.weight;
      if (result.attributes?.sku) {
        nextForm.sku = result.attributes.sku;
      }
      if (result.attributes?.dimensions?.length !== undefined) nextForm.dimensionLength = String(result.attributes.dimensions.length);
      if (result.attributes?.dimensions?.width !== undefined) nextForm.dimensionWidth = String(result.attributes.dimensions.width);
      if (result.attributes?.dimensions?.height !== undefined) nextForm.dimensionHeight = String(result.attributes.dimensions.height);
      if (result.attributes?.dimensions?.unit) nextForm.dimensionUnit = result.attributes.dimensions.unit;

      if (result.durability_data?.life_span) nextForm.lifeSpan = result.durability_data.life_span;
      if (result.durability_data?.reliability) nextForm.reliability = result.durability_data.reliability;
      if (result.durability_data?.reusability) nextForm.reusability = result.durability_data.reusability;
      if (result.durability_data?.refurbishment) nextForm.refurbishment = result.durability_data.refurbishment;
      if (result.durability_data?.recycled_content) nextForm.recycledContent = result.durability_data.recycled_content;

      if (result.repairability_data?.ease_of_repair) nextForm.easeOfRepair = result.repairability_data.ease_of_repair;
      if (result.repairability_data?.spare_parts) nextForm.spareParts = result.repairability_data.spare_parts;
      if (result.repairability_data?.maintenance_manual) nextForm.maintenanceManual = result.repairability_data.maintenance_manual;

      if (result.manufacturing_data?.origin) nextForm.origin = result.manufacturing_data.origin;
      if (result.manufacturing_data?.material_composition) nextForm.materialComposition = result.manufacturing_data.material_composition;
      if (result.manufacturing_data?.substance_of_concern) nextForm.substanceOfConcern = result.manufacturing_data.substance_of_concern;

      if (result.lifecycle_data?.carbon_footprint) nextForm.carbonFootprint = result.lifecycle_data.carbon_footprint;
      if (result.lifecycle_data?.environmental_footprint) nextForm.environmentalFootprint = result.lifecycle_data.environmental_footprint;
      if (result.lifecycle_data?.water_usage) nextForm.waterUsage = result.lifecycle_data.water_usage;

      if (result.nutritional_info) {
        if (result.nutritional_info.calories !== undefined) nextForm.calories = String(result.nutritional_info.calories);
        if (result.nutritional_info.total_fat) nextForm.totalFat = result.nutritional_info.total_fat;
        if (result.nutritional_info.saturated_fat) nextForm.saturatedFat = result.nutritional_info.saturated_fat;
        if (result.nutritional_info.carbohydrates) nextForm.carbohydrates = result.nutritional_info.carbohydrates;
        if (result.nutritional_info.sugars) nextForm.sugars = result.nutritional_info.sugars;
        if (result.nutritional_info.protein) nextForm.protein = result.nutritional_info.protein;
        if (result.nutritional_info.sodium) nextForm.sodium = result.nutritional_info.sodium;
        if (Array.isArray(result.nutritional_info.ingredients)) nextForm.ingredients = result.nutritional_info.ingredients.join(', ');
        if (Array.isArray(result.nutritional_info.allergens)) nextForm.allergens = result.nutritional_info.allergens.join(', ');
        if (Array.isArray(result.nutritional_info.main_ingredients)) nextForm.mainIngredients = result.nutritional_info.main_ingredients.join(', ');
        if (Array.isArray(result.nutritional_info.certifications)) nextForm.certifications = result.nutritional_info.certifications.join(', ');
      }

      // Translate the Gemini packaging analysis to current language first
      if (key && (nextForm.name || nextForm.description || nextForm.ingredients)) {
        try {
          const translated = await geminiAnalyzerService.translateDraft(nextForm, currentLang, key);
          if (translated) {
            nextForm = { ...nextForm, ...translated };
          }
        } catch (err) {
          console.error("Auto-translation of analyzed image failed:", err);
        }
      }

      if (result.attributes?.sku) {
        setScannedCode(result.attributes.sku);
        await lookupBarcode(result.attributes.sku, nextForm);
      } else {
        setForm(nextForm);
      }
      toast.success('Product image analyzed successfully with Gemini!');
    } catch (err: any) {
      toast.error(`Gemini Analysis failed: ${err.message || err}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [apiKey, geminiAnalyzerService, scannedCode, lookupBarcode, form, categories, brands]);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Data = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();
    await analyzeImage(base64Data);
  }, [analyzeImage, stopCamera]);

  const scannerLabel = status === 'scanning'
    ? 'Scanning'
    : status === 'starting'
      ? 'Starting'
      : status === 'unsupported'
        ? 'Manual Entry'
        : 'Camera';

  const downloadUploadedImage = useCallback(async () => {
    if (!uploadedImageUrl) return;
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'product';
    const barcode = scannedCode || form.sku || '';
    const suffix = barcode ? `_${barcode}` : '';
    const filename = `${slug}${suffix}_uploaded.jpg`;

    try {
      const response = await fetch(uploadedImageUrl);
      const blob = await response.blob();

      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'JPEG Images',
              accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
              },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          toast.success('Uploaded photo saved successfully');
          return;
        } catch (err: any) {
          if (err.name === 'AbortError') {
            return;
          }
          console.warn('File System Access API failed, falling back to standard download:', err);
        }
      }

      // Fallback: Standard browser download
      const anchor = document.createElement('a');
      anchor.href = uploadedImageUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      toast.success('Uploaded photo saved to default folder');
    } catch (err) {
      console.error('Failed to convert base64 image for download:', err);
      // Fallback: standard anchor download directly
      const anchor = document.createElement('a');
      anchor.href = uploadedImageUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      toast.success('Uploaded photo saved');
    }
  }, [uploadedImageUrl, form.name, form.sku, scannedCode]);

  const enrichWithAI = useCallback(async () => {
    const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (!key) {
      toast.error('Please configure your Gemini API Key first.');
      return;
    }
    if (!form.sku && !form.name && !scannedCode && !brandHint && !nameHint) {
      toast.error('Please enter a barcode, product name, or brand hint to enrich with AI.');
      return;
    }

    setIsEnriching(true);
    try {
      const defaultDraft = generateInitialProductDataUseCase.createInitialDraft(categories, brands);
      const defaultBrand = defaultDraft.brand;

      const finalBrand = brandHint || (form.brand !== defaultBrand ? form.brand : '') || internetProductInfo?.brand || '';
      const finalName = nameHint || form.name || internetProductInfo?.name || '';

      const result = await geminiAnalyzerService.generateProductDataFromText(
        finalName,
        finalBrand,
        form.sku || scannedCode || '',
        key
      );

      setForm(prev => {
        const next = { ...prev };

        if (result.name) next.name = result.name;
        if (result.category) next.category = result.category;
        if (result.description) next.description = result.description;
        if (result.brand) next.brand = result.brand;
        if (result.manufacturer) next.manufacturer = result.manufacturer;
        
        if (result.attributes?.color && !prev.color) next.color = result.attributes.color;
        if (result.attributes?.size && !prev.size) next.size = result.attributes.size;
        if (result.attributes?.material && !prev.material) next.material = result.attributes.material;
        if (result.attributes?.weight && !prev.weight) next.weight = result.attributes.weight;
        if (result.attributes?.sku && !prev.sku) next.sku = result.attributes.sku;
        
        if (result.attributes?.dimensions?.length !== undefined && (!prev.dimensionLength || prev.dimensionLength === '0')) {
          next.dimensionLength = String(result.attributes.dimensions.length);
        }
        if (result.attributes?.dimensions?.width !== undefined && (!prev.dimensionWidth || prev.dimensionWidth === '0')) {
          next.dimensionWidth = String(result.attributes.dimensions.width);
        }
        if (result.attributes?.dimensions?.height !== undefined && (!prev.dimensionHeight || prev.dimensionHeight === '0')) {
          next.dimensionHeight = String(result.attributes.dimensions.height);
        }
        if (result.attributes?.dimensions?.unit && !prev.dimensionUnit) {
          next.dimensionUnit = result.attributes.dimensions.unit;
        }

        if (result.durability_data?.life_span && !prev.lifeSpan) next.lifeSpan = result.durability_data.life_span;
        if (result.durability_data?.reliability && !prev.reliability) next.reliability = result.durability_data.reliability;
        if (result.durability_data?.reusability && !prev.reusability) next.reusability = result.durability_data.reusability;
        if (result.durability_data?.refurbishment && !prev.refurbishment) next.refurbishment = result.durability_data.refurbishment;
        if (result.durability_data?.recycled_content && !prev.recycledContent) next.recycledContent = result.durability_data.recycled_content;

        if (result.repairability_data?.ease_of_repair && !prev.easeOfRepair) next.easeOfRepair = result.repairability_data.ease_of_repair;
        if (result.repairability_data?.spare_parts && !prev.spareParts) next.spareParts = result.repairability_data.spare_parts;
        if (result.repairability_data?.maintenance_manual && !prev.maintenanceManual) next.maintenanceManual = result.repairability_data.maintenance_manual;

        if (result.manufacturing_data?.origin && !prev.origin) next.origin = result.manufacturing_data.origin;
        if (result.manufacturing_data?.material_composition && !prev.materialComposition) next.materialComposition = result.manufacturing_data.material_composition;
        if (result.manufacturing_data?.substance_of_concern && !prev.substanceOfConcern) next.substanceOfConcern = result.manufacturing_data.substance_of_concern;

        if (result.lifecycle_data?.carbon_footprint && !prev.carbonFootprint) next.carbonFootprint = result.lifecycle_data.carbon_footprint;
        if (result.lifecycle_data?.environmental_footprint && !prev.environmentalFootprint) next.environmentalFootprint = result.lifecycle_data.environmental_footprint;
        if (result.lifecycle_data?.water_usage && !prev.waterUsage) next.waterUsage = result.lifecycle_data.water_usage;

        if (result.nutritional_info) {
          if (result.nutritional_info.calories !== undefined && !prev.calories) next.calories = String(result.nutritional_info.calories);
          if (result.nutritional_info.total_fat && !prev.totalFat) next.totalFat = result.nutritional_info.total_fat;
          if (result.nutritional_info.saturated_fat && !prev.saturatedFat) next.saturatedFat = result.nutritional_info.saturated_fat;
          if (result.nutritional_info.carbohydrates && !prev.carbohydrates) next.carbohydrates = result.nutritional_info.carbohydrates;
          if (result.nutritional_info.sugars && !prev.sugars) next.sugars = result.nutritional_info.sugars;
          if (result.nutritional_info.protein && !prev.protein) next.protein = result.nutritional_info.protein;
          if (result.nutritional_info.sodium && !prev.sodium) next.sodium = result.nutritional_info.sodium;
          if (Array.isArray(result.nutritional_info.ingredients) && !prev.ingredients) next.ingredients = result.nutritional_info.ingredients.join(', ');
          if (Array.isArray(result.nutritional_info.allergens) && !prev.allergens) next.allergens = result.nutritional_info.allergens.join(', ');
          if (Array.isArray(result.nutritional_info.main_ingredients) && !prev.mainIngredients) next.mainIngredients = result.nutritional_info.main_ingredients.join(', ');
          if (Array.isArray(result.nutritional_info.certifications) && !prev.certifications) next.certifications = result.nutritional_info.certifications.join(', ');
        }
        return next;
      });
      toast.success('Product data successfully enriched with AI!');
    } catch (err: any) {
      toast.error(`AI Enrichment failed: ${err.message || err}`);
    } finally {
      setIsEnriching(false);
    }
  }, [apiKey, form, scannedCode, internetProductInfo, geminiAnalyzerService, brandHint, nameHint, categories, brands, generateInitialProductDataUseCase]);

  return {
    brands,
    categories,
    copyJson,
    downloadJson,
    error,
    form,
    jsonText,
    scannerLabel,
    scannedCode,
    setScannedCode,
    startCamera,
    status,
    stopCamera,
    updateForm,
    applyScannedValue,
    videoRef,
    // Gemini additions
    apiKey,
    saveApiKey,
    isAnalyzing,
    isTranslating,
    isEnriching,
    enrichWithAI,
    translateFormToLanguage,
    analyzeImage,
    captureAndAnalyze,
    isNativeSupported: 'BarcodeDetector' in window,
    internetImageUrl,
    isFetchingInternetImage,
    internetProductInfo,
    downloadProductImage,
    uploadedImageUrl,
    downloadUploadedImage,
    brandHint,
    setBrandHint,
    nameHint,
    setNameHint,
  };
}
