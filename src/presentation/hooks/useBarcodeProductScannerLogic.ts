import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useDependencies } from '../../context/DependenciesContext';
import { useInventory } from '../../context/InventoryContext';
import { InitialProductDataDraft } from '../../application/use-cases/operator/GenerateInitialProductDataUseCase';

export type ScannerStatus = 'idle' | 'starting' | 'scanning' | 'unsupported' | 'error';

export function useBarcodeProductScannerLogic() {
  const { categories, brands } = useInventory();
  const { generateInitialProductDataUseCase, geminiAnalyzerService } = useDependencies();
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
    setForm(prev => generateInitialProductDataUseCase.applyScannedValue(prev, cleanValue));
    toast.success('Barcode captured');
  }, [generateInitialProductDataUseCase]);

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

  const downloadJson = useCallback(() => {
    if (!jsonText || !generatedData) return;
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = generateInitialProductDataUseCase.getDownloadFileName(generatedData);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [generateInitialProductDataUseCase, generatedData, jsonText]);

  // Gemini state and functions
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const saveApiKey = useCallback((key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  }, []);

  const analyzeImage = useCallback(async (base64Data: string) => {
    const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (!key) {
      toast.error('Please configure your Gemini API Key first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await geminiAnalyzerService.analyzePackaging(base64Data, key, scannedCode);
      
      setForm(prev => {
        const next = { ...prev };
        if (result.name) next.name = result.name;
        if (result.category) next.category = result.category;
        if (result.description) next.description = result.description;
        if (result.brand) next.brand = result.brand;
        if (result.manufacturer) next.manufacturer = result.manufacturer;
        if (result.attributes?.color) next.color = result.attributes.color;
        if (result.attributes?.size) next.size = result.attributes.size;
        if (result.attributes?.material) next.material = result.attributes.material;
        if (result.attributes?.weight) next.weight = result.attributes.weight;
        if (result.attributes?.sku) {
          next.sku = result.attributes.sku;
          setScannedCode(result.attributes.sku);
        }
        if (result.attributes?.dimensions?.length !== undefined) next.dimensionLength = String(result.attributes.dimensions.length);
        if (result.attributes?.dimensions?.width !== undefined) next.dimensionWidth = String(result.attributes.dimensions.width);
        if (result.attributes?.dimensions?.height !== undefined) next.dimensionHeight = String(result.attributes.dimensions.height);
        if (result.attributes?.dimensions?.unit) next.dimensionUnit = result.attributes.dimensions.unit;

        if (result.durability_data?.life_span) next.lifeSpan = result.durability_data.life_span;
        if (result.durability_data?.reliability) next.reliability = result.durability_data.reliability;
        if (result.durability_data?.reusability) next.reusability = result.durability_data.reusability;
        if (result.durability_data?.refurbishment) next.refurbishment = result.durability_data.refurbishment;
        if (result.durability_data?.recycled_content) next.recycledContent = result.durability_data.recycled_content;

        if (result.repairability_data?.ease_of_repair) next.easeOfRepair = result.repairability_data.ease_of_repair;
        if (result.repairability_data?.spare_parts) next.spareParts = result.repairability_data.spare_parts;
        if (result.repairability_data?.maintenance_manual) next.maintenanceManual = result.repairability_data.maintenance_manual;

        if (result.manufacturing_data?.origin) next.origin = result.manufacturing_data.origin;
        if (result.manufacturing_data?.material_composition) next.materialComposition = result.manufacturing_data.material_composition;
        if (result.manufacturing_data?.substance_of_concern) next.substanceOfConcern = result.manufacturing_data.substance_of_concern;

        if (result.lifecycle_data?.carbon_footprint) next.carbonFootprint = result.lifecycle_data.carbon_footprint;
        if (result.lifecycle_data?.environmental_footprint) next.environmentalFootprint = result.lifecycle_data.environmental_footprint;
        if (result.lifecycle_data?.water_usage) next.waterUsage = result.lifecycle_data.water_usage;

        if (result.nutritional_info) {
          if (result.nutritional_info.calories !== undefined) next.calories = String(result.nutritional_info.calories);
          if (result.nutritional_info.total_fat) next.totalFat = result.nutritional_info.total_fat;
          if (result.nutritional_info.saturated_fat) next.saturatedFat = result.nutritional_info.saturated_fat;
          if (result.nutritional_info.carbohydrates) next.carbohydrates = result.nutritional_info.carbohydrates;
          if (result.nutritional_info.sugars) next.sugars = result.nutritional_info.sugars;
          if (result.nutritional_info.protein) next.protein = result.nutritional_info.protein;
          if (result.nutritional_info.sodium) next.sodium = result.nutritional_info.sodium;
          if (Array.isArray(result.nutritional_info.ingredients)) next.ingredients = result.nutritional_info.ingredients.join(', ');
          if (Array.isArray(result.nutritional_info.allergens)) next.allergens = result.nutritional_info.allergens.join(', ');
        }

        return next;
      });
      toast.success('Product image analyzed successfully with Gemini!');
    } catch (err: any) {
      toast.error(`Gemini Analysis failed: ${err.message || err}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [apiKey, geminiAnalyzerService, scannedCode]);

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
    analyzeImage,
    captureAndAnalyze,
    isNativeSupported: 'BarcodeDetector' in window,
  };
}
