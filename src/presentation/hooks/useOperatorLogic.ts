import { useState, useCallback, useMemo, useRef } from 'react';
import { BulkloadProgressUpdate } from '../../application/use-cases/operator/BulkloadUseCase';
import { Category, Brand } from '../../types/types';
import { useDependencies } from '../../context/DependenciesContext';

export function useOperatorLogic() {
  const {
    operatorRepository: opRepo,
    productFormUseCase,
    bulkloadUseCase
  } = useDependencies();

  const [isOperator, setIsOperator] = useState<boolean>(false);
  const [isCheckingOperator, setIsCheckingOperator] = useState<boolean>(true);
  
  // Bulk loading states
  const [scannedFiles, setScannedFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<BulkloadProgressUpdate | null>(null);
  const [uploadLogs, setUploadLogs] = useState<string[]>([]);

  const isCheckingOperatorRef = useRef(false);

  const checkOperatorStatus = useCallback(async () => {
    if (isCheckingOperatorRef.current) return false;
    isCheckingOperatorRef.current = true;
    setIsCheckingOperator(true);
    try {
      const status = await opRepo.checkIsOperator();
      setIsOperator(status);
      return status;
    } catch (err) {
      console.error("useOperatorLogic: Failed to check operator status:", err);
      setIsOperator(false);
      return false;
    } finally {
      setIsCheckingOperator(false);
      isCheckingOperatorRef.current = false;
    }
  }, [opRepo]);

  const clearOperatorStatus = useCallback(() => {
    setIsOperator(false);
  }, []);

  const handleFolderSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const { allFiles, imageFiles: imgs } = productFormUseCase.scanFolder(files);
    setScannedFiles(allFiles);
    setImageFiles(imgs);
    setUploadLogs([`Scanned folder: found ${allFiles.length} total files, including ${imgs.length} image-metadata pairs.`]);
    setCurrentProgress(null);
  }, [productFormUseCase]);

  const startBulkload = useCallback(async (categories: Category[], brands: Brand[]) => {
    if (imageFiles.length === 0) {
      setUploadLogs(prev => [...prev, "Error: No scanned products to upload."]);
      return;
    }

    setIsUploading(true);
    setUploadLogs([`Starting bulk upload of ${imageFiles.length} products...`]);

    try {
      const result = await bulkloadUseCase.bulkload(
        imageFiles,
        scannedFiles,
        categories,
        brands,
        (progressUpdate) => {
          setCurrentProgress(progressUpdate);
          if (progressUpdate.status === 'processing') {
            setUploadLogs(prev => [
              ...prev,
              `[${progressUpdate.index + 1}/${progressUpdate.total}] Processing "${progressUpdate.fileName}"...`
            ]);
          } else if (progressUpdate.status === 'success') {
            setUploadLogs(prev => [
              ...prev,
              `✅ Successfully uploaded and registered "${progressUpdate.fileName}".`
            ]);
          } else if (progressUpdate.status === 'error') {
            setUploadLogs(prev => [
              ...prev,
              `❌ Failed "${progressUpdate.fileName}": ${progressUpdate.errorMessage}`
            ]);
          }
        }
      );

      setUploadLogs(prev => [
        ...prev,
        `🎉 Bulk upload complete! Success: ${result.successCount}, Failed: ${result.failedCount}`
      ]);
    } catch (err: any) {
      console.error("useOperatorLogic: Bulkload execution error:", err);
      setUploadLogs(prev => [...prev, `💥 Critical bulkload error: ${err.message || String(err)}`]);
    } finally {
      setIsUploading(false);
      setCurrentProgress(null);
    }
  }, [imageFiles, scannedFiles, bulkloadUseCase]);

  const clearScannedFiles = useCallback(() => {
    setScannedFiles([]);
    setImageFiles([]);
    setCurrentProgress(null);
    setUploadLogs([]);
  }, []);

  return useMemo(() => ({
    isOperator,
    isCheckingOperator,
    checkOperatorStatus,
    clearOperatorStatus,
    scannedFiles,
    imageFiles,
    isUploading,
    currentProgress,
    uploadLogs,
    setUploadLogs,
    handleFolderSelect,
    startBulkload,
    clearScannedFiles
  }), [
    isOperator,
    isCheckingOperator,
    checkOperatorStatus,
    clearOperatorStatus,
    scannedFiles,
    imageFiles,
    isUploading,
    currentProgress,
    uploadLogs,
    handleFolderSelect,
    startBulkload,
    clearScannedFiles
  ]);
}
