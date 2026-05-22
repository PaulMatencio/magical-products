# Refactor Plan: Extract `ProductFormView` Logic into Clean Architecture Layers

## Current Situation

`ProductFormView.tsx` currently mixes **three distinct concerns** in one component:

| Concern | Code in the file |
|---|---|
| **Application Logic** | `handleFolderSelect`, `handleProcessFile` (IPFS orchestration, metadata building, category/brand matching) |
| **Presentation Logic** | `handleSubmit`, form state management, `copyMetadataToClipboard` |
| **UI / Rendering** | All JSX |

This violates the clean architecture pattern already established in this project, where:
- `application/use-cases/` holds pure orchestration logic
- `presentation/hooks/` holds React-specific state/side-effects wiring
- `features/` components are purely UI (they receive callbacks, render data)

---

## Architecture Layers (existing pattern)

```
domain/
  repositories/IAdminRepository.ts        ← Interface contract

application/
  use-cases/admin/AdminUseCase.ts         ← Pure orchestration, no React

presentation/
  hooks/useAdminLogic.ts                  ← React state + calls use case

features/admin/
  ProductFormView.tsx                     ← Pure UI: props in, JSX out
```

---

## Proposed Refactor

### ✅ Yes — It Is Absolutely Possible (and recommended)

The logic in `ProductFormView` maps cleanly onto this 3-layer split:

---

### Layer 1 · Application Use Case

**New file:** `src/application/use-cases/admin/ProductFormUseCase.ts`

Responsibilities:
- Scan files for images/JSON pairs
- Upload image to IPFS via `ipfsService`
- Parse and validate `InitialProductData` from JSON
- Match category by path/name
- Match brand by name
- Build `PartialMetadata` and `ConsolidatedMetadata`
- Upload consolidated metadata JSON to IPFS
- Return the full `Partial<Product>` ready for save

```typescript
import { ipfsService } from '../../../services/ipfsService';
import { Category, Brand, Product, PartialMetadata,
         ConsolidatedMetadata, InitialProductData } from '../../../types/types';

// --- Result types ---
export interface ScannedFiles {
  allFiles: File[];
  imageFiles: File[];
}

export interface ProcessFileResult {
  formData: Partial<Product>;
  consolidatedMetadata: ConsolidatedMetadata;
}

export class ProductFormUseCase {

  /** Step 1 — pure scan: no async, no side effects */
  scanFolder(files: FileList): ScannedFiles {
    const allFiles = Array.from(files);
    const imageFiles = allFiles.filter(f => /\.(png|jpe?g|webp)$/i.test(f.name));
    return { allFiles, imageFiles };
  }

  /** Step 2 — IPFS orchestration */
  async processFile(
    imageFile: File,
    allFiles: File[],
    categories: Category[],
    brands: Brand[]
  ): Promise<ProcessFileResult> {
    // 1. Find paired JSON
    const baseName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.'));
    const jsonFile = allFiles.find(f => f.name.toLowerCase() === `${baseName}.json`.toLowerCase());
    if (!jsonFile) throw new Error(`Matching metadata file "${baseName}.json" not found.`);

    // 2. Upload image → IPFS
    const imageResult = await ipfsService.uploadFile(imageFile, {
      fileName: imageFile.name,
      metadata: { type: 'product-image', source: 'filesystem-browser' }
    });
    const imageCid = imageResult.cid;
    const imageUrl = this._buildGatewayUrl(imageCid);

    // 3. Parse JSON metadata
    const jsonText = await jsonFile.text();
    const initialData: InitialProductData = JSON.parse(jsonText);

    // 4. Match category & brand
    const matchedCategory = this._matchCategory(initialData.category, categories);
    const matchedBrand = this._matchBrand(initialData.brand, brands);

    // 5. Build consolidated metadata
    const partialMetadata: PartialMetadata = { /* ... */ };
    const consolidated: ConsolidatedMetadata = {
      name: initialData.name,
      partial_metadata: partialMetadata,
      image_cid: imageCid
    };

    // 6. Upload metadata JSON → IPFS
    const metaBlob = new Blob([JSON.stringify(consolidated, null, 2)],
                              { type: 'application/json' });
    const metaResult = await ipfsService.uploadFile(metaBlob, {
      fileName: `${baseName}-consolidated.json`,
      metadata: { type: 'product-metadata', imageCid }
    });
    const metadataUrl = this._buildGatewayUrl(metaResult.cid);

    // 7. Build Partial<Product>
    const formData: Partial<Product> = {
      name: initialData.name,
      title: initialData.name,
      sku: initialData.attributes?.sku || '',
      description: initialData.description,
      image_url: imageUrl,
      barcode_id: imageCid,
      digital_passport_url: metadataUrl,
      category_id: matchedCategory?.id || 'missing-category!!!',
      brand_id: matchedBrand?.id || 'missing-brand!!!',
      manufacturer: initialData.manufacturer,
      attributes: { /* color, size, material... */ }
    };

    return { formData, consolidatedMetadata: consolidated };
  }

  private _buildGatewayUrl(cid: string): string {
    const gateway = import.meta.env.VITE_IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud';
    return `${gateway.replace(/\/$/, '')}/ipfs/${cid}`;
  }

  private _matchCategory(catPath: string, categories: Category[]): Category | undefined { /* ... */ }
  private _matchBrand(brandName: string, brands: Brand[]): Brand | undefined { /* ... */ }
}
```

> [!NOTE]
> `ipfsService` is a thin infrastructure service (not a repository), so it is acceptable to inject it directly in a use case, as is already done throughout this codebase. If desired later, it could be abstracted behind an `IIpfsService` domain interface.

---

### Layer 2 · Presentation Hook

**New file:** `src/presentation/hooks/useProductFormLogic.ts`

Responsibilities:
- Hold all React `useState`/`useRef` for form state, file lists, processing flags
- Call `ProductFormUseCase` methods
- Show toasts
- Return all state + handler callbacks to the component

```typescript
import { useState, useRef, useMemo } from 'react';
import { toast } from 'sonner';
import { Product, Category, Brand, ConsolidatedMetadata } from '../../types/types';
import { ProductFormUseCase } from '../../application/use-cases/admin/ProductFormUseCase';

export type UploadProgress = 'idle' | 'scanning' | 'uploading_image' | 'uploading_metadata' | 'done' | 'error';

export function useProductFormLogic(
  categories: Category[],
  brands: Brand[],
  useCase = new ProductFormUseCase()
) {
  const [formData, setFormData] = useState<Partial<Product>>({ /* defaults */ });
  const [scannedFiles, setScannedFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>('idle');
  const [committedFileNames, setCommittedFileNames] = useState<Set<string>>(new Set());
  const [processedMetadata, setProcessedMetadata] = useState<ConsolidatedMetadata | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const { allFiles, imageFiles: imgs } = useCase.scanFolder(files);
    setScannedFiles(allFiles);
    setImageFiles(imgs);
    if (imgs.length === 0) toast.error('No image files found.');
    else toast.success(`Found ${imgs.length} images. Select one.`);
  };

  const handleProcessFile = async (imageFile: File) => {
    setSelectedFile(imageFile);
    setIsProcessing(true);
    setUploadProgress('uploading_image');
    try {
      const { formData: data, consolidatedMetadata } =
        await useCase.processFile(imageFile, scannedFiles, categories, brands);
      setFormData(prev => ({ ...prev, ...data }));
      setProcessedMetadata(consolidatedMetadata);
      setUploadProgress('done');
      toast.success('Files processed and uploaded successfully!');
    } catch (error: any) {
      setUploadProgress('error');
      toast.error(error.message || 'Failed to process files');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSave: (data: Partial<Product>) => Promise<void>,
    isEditMode: boolean
  ) => { /* ... */ };

  const copyMetadataToClipboard = () => { /* ... */ };
  const resetForm = () => { /* ... */ };

  return {
    formData, setFormData,
    imageFiles, selectedFile, committedFileNames,
    isProcessing, uploadProgress,
    processedMetadata, showMetadataModal, setShowMetadataModal,
    handleFolderSelect, handleProcessFile, handleSubmit,
    copyMetadataToClipboard,
  };
}
```

---

### Layer 3 · Slim UI Component

**Refactored:** `src/features/admin/ProductFormView.tsx`

The component becomes a thin "smart" consumer of the hook:

```typescript
export function ProductFormView({ onClose, onSave, initialData, categories, brands, isMutating }) {
  const directoryInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!initialData;
  const {
    formData, setFormData, imageFiles, selectedFile,
    committedFileNames, isProcessing, uploadProgress,
    processedMetadata, showMetadataModal, setShowMetadataModal,
    handleFolderSelect, handleProcessFile, handleSubmit,
    copyMetadataToClipboard,
  } = useProductFormLogic(categories, brands);

  // ... JSX only, no business logic
}
```

---

## Files to Create / Modify

| Action | File |
|---|---|
| 🆕 Create | `src/application/use-cases/admin/ProductFormUseCase.ts` |
| 🆕 Create | `src/presentation/hooks/useProductFormLogic.ts` |
| ✏️ Slim down | `src/features/admin/ProductFormView.tsx` |

---

## What Doesn't Move

| Stays in component | Why |
|---|---|
| `directoryInputRef` | DOM ref, inherently React/presentation |
| `isEditMode` derived value | Simple boolean from props, fine in component |
| All JSX / className rendering | Pure UI concern |
| Animation config (`motion.div`) | UI only |

---

## Checklist

- [ ] Create `ProductFormUseCase.ts` with `scanFolder` and `processFile`
- [ ] Create `useProductFormLogic.ts` consuming the use case
- [ ] Slim down `ProductFormView.tsx` to use the hook
- [ ] Verify TypeScript compiles cleanly (`npm run build`)
- [ ] Manually test: folder select → image process → save flow

