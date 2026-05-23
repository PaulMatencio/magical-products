import React, { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { Product, Category, Brand, ConsolidatedMetadata } from '../../types/types';
import { useDependencies } from '../../context/DependenciesContext';

export type UploadProgress =
  | 'idle'
  | 'scanning'
  | 'uploading_image'
  | 'uploading_metadata'
  | 'done'
  | 'error';

/** Default form state for a brand-new product */
function makeDefaultFormData(categories: Category[], brands: Brand[]): Partial<Product> {
  return {
    name: '',
    title: '',
    description: '',
    brand_id: brands[0]?.id || 'missing-brand!!!',
    manufacturer: '',
    price: 0,
    discount_percentage: 0,
    category_id: categories[0]?.id || 'missing-category!!!',
    image_url: '',
    barcode_id: '',
    digital_passport_url: '',
    attributes: {},
    quantity: 0,
    in_stock: true,
  };
}

// ---------------------------------------------------------------------------
// useProductFormLogic
// Presentation-layer hook: owns all React state and wires it up to
// ProductFormUseCase. The component (ProductFormView) only renders.
// ---------------------------------------------------------------------------
export function useProductFormLogic(
  categories: Category[],
  brands: Brand[],
) {
  const { productFormUseCase: useCase } = useDependencies();
  // Memoise the default so it doesn't re-create on every render
  const defaultFormData = useMemo(
    () => makeDefaultFormData(categories, brands),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ---- Form data ----------------------------------------------------------
  const [formData, setFormData] = useState<Partial<Product>>(defaultFormData);

  // ---- File pipeline state ------------------------------------------------
  const [scannedFiles, setScannedFiles]         = useState<File[]>([]);
  const [imageFiles, setImageFiles]             = useState<File[]>([]);
  const [selectedFile, setSelectedFile]         = useState<File | null>(null);
  const [committedFileNames, setCommittedFileNames] = useState<Set<string>>(new Set());

  // ---- Async / progress state ---------------------------------------------
  const [isProcessing, setIsProcessing]         = useState(false);
  const [uploadProgress, setUploadProgress]     = useState<UploadProgress>('idle');

  // ---- Metadata inspection ------------------------------------------------
  const [processedMetadata, setProcessedMetadata] = useState<ConsolidatedMetadata | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);

  // ---- Handlers -----------------------------------------------------------

  /** Called when the user picks a directory via the hidden <input type="file"> */
  const handleFolderSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploadProgress('scanning');
      const { allFiles, imageFiles: imgs } = useCase.scanFolder(files);
      setScannedFiles(allFiles);
      setImageFiles(imgs);
      setUploadProgress('idle');

      if (imgs.length === 0) {
        toast.error('No image files found in the selected directory.');
      } else {
        toast.success(`Found ${imgs.length} images. Please select one.`);
      }
    },
    [useCase],
  );

  /** Called when the user clicks one of the image cards in the file list */
  const handleProcessFile = useCallback(
    async (imageFile: File) => {
      setSelectedFile(imageFile);
      setIsProcessing(true);
      setUploadProgress('uploading_image');

      try {
        const { formData: enrichedData, consolidatedMetadata } =
          await useCase.processFile(imageFile, scannedFiles, categories, brands);

        // Signal that we are now uploading metadata (happens inside processFile,
        // but we update the UI banner here for UX continuity)
        setUploadProgress('uploading_metadata');

        setFormData(prev => ({ ...prev, ...enrichedData }));
        setProcessedMetadata(consolidatedMetadata);
        setUploadProgress('done');
        toast.success('Files processed and uploaded successfully!');
      } catch (error: any) {
        console.error('useProductFormLogic: processing error:', error);
        setUploadProgress('error');
        toast.error(error.message || 'Failed to process files');
      } finally {
        setIsProcessing(false);
      }
    },
    [useCase, scannedFiles, categories, brands],
  );

  /**
   * Form submission.
   * @param onSave   — the persistence callback passed down from the parent
   * @param isEditMode — controls whether the form resets after save
   */
  const handleSubmit = useCallback(
    async (
      e: React.FormEvent,
      onSave: (data: Partial<Product>) => Promise<void>,
      isEditMode: boolean,
    ) => {
      e.preventDefault();

      if (!formData.image_url || !formData.barcode_id) {
        toast.error('Please process the product files first.');
        return;
      }

      const dataToSave: Partial<Product> = {
        ...formData,
        in_stock: (formData.quantity || 0) > 0,
      };

      console.log('useProductFormLogic: dataToSave', dataToSave);

      try {
        await onSave(dataToSave);

        // In add-mode: mark the file as committed and reset for the next one
        if (!isEditMode) {
          if (selectedFile) {
            setCommittedFileNames(prev => new Set([...prev, selectedFile.name]));
          }
          setFormData(makeDefaultFormData(categories, brands));
          setSelectedFile(null);
          setProcessedMetadata(null);
          setUploadProgress('idle');
          toast.success('Product committed! Select another image to continue.');
        }
      } catch (error: any) {
        console.error('useProductFormLogic: save failed', error);
        toast.error(error?.message || 'Failed to save product to database. Please check console.');
      }
    },
    [formData, selectedFile, categories, brands],
  );

  /** Copies the current consolidated metadata JSON to the clipboard */
  const copyMetadataToClipboard = useCallback(() => {
    if (!processedMetadata) return;
    navigator.clipboard.writeText(JSON.stringify(processedMetadata, null, 2));
    toast.success('Metadata copied to clipboard!');
  }, [processedMetadata]);

  // ---- Public API ---------------------------------------------------------
  return {
    // State
    formData,
    setFormData,
    imageFiles,
    selectedFile,
    committedFileNames,
    isProcessing,
    uploadProgress,
    processedMetadata,
    showMetadataModal,
    setShowMetadataModal,

    // Handlers
    handleFolderSelect,
    handleProcessFile,
    handleSubmit,
    copyMetadataToClipboard,
  };
}
