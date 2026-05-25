import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useDependencies } from '../../context/DependenciesContext';
import { useInventory } from '../../context/InventoryContext';
import { InitialProductDataDraft } from '../../application/use-cases/operator/GenerateInitialProductDataUseCase';

export type ScannerStatus = 'idle' | 'starting' | 'scanning' | 'unsupported' | 'error';

export function useBarcodeProductScannerLogic() {
  const { categories, brands } = useInventory();
  const { generateInitialProductDataUseCase } = useDependencies();
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

    if (!('BarcodeDetector' in window)) {
      setStatus('unsupported');
      return;
    }

    try {
      setStatus('starting');
      const Detector = (window as any).BarcodeDetector;
      detectorRef.current = new Detector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code'],
      });

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
      frameRef.current = requestAnimationFrame(scanFrame);
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
  };
}
