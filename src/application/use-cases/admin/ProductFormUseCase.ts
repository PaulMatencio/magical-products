import { ipfsService } from '../../../services/ipfsService';
import {
  Category,
  Brand,
  Product,
  PartialMetadata,
  ConsolidatedMetadata,
  InitialProductData,
} from '../../../types/types';

// --- Result types ---

export interface ScannedFiles {
  allFiles: File[];
  imageFiles: File[];
}

export interface ProcessFileResult {
  formData: Partial<Product>;
  consolidatedMetadata: ConsolidatedMetadata;
}

// ---------------------------------------------------------------------------
// ProductFormUseCase
// Orchestrates the two-step workflow for adding a new product:
//   1. scanFolder   — pure, synchronous: classifies files from a FileList
//   2. processFile  — async: uploads to IPFS and builds the consolidated record
// ---------------------------------------------------------------------------
export class ProductFormUseCase {

  // ---- Step 1: Scan -------------------------------------------------------

  /** Pure classification of a FileList — no side effects, no async */
  scanFolder(files: FileList): ScannedFiles {
    const allFiles = Array.from(files);
    const imageFiles = allFiles.filter(f => /\.(png|jpe?g|webp)$/i.test(f.name));
    return { allFiles, imageFiles };
  }

  // ---- Step 2: Process & Upload -------------------------------------------

  /**
   * For a chosen image file:
   *  - finds its paired JSON metadata file
   *  - uploads the image to IPFS (Pinata)
   *  - parses, enriches and uploads the consolidated metadata JSON
   *  - returns the fully-populated Partial<Product> ready for the form / DB save
   */
  async processFile(
    imageFile: File,
    allFiles: File[],
    categories: Category[],
    brands: Brand[],
  ): Promise<ProcessFileResult> {

    // 1. Find the matching JSON metadata file (same base name)
    const baseName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.'));
    const jsonFileName = `${baseName}.json`;
    const jsonFile = allFiles.find(
      f => f.name.toLowerCase() === jsonFileName.toLowerCase()
    );
    if (!jsonFile) {
      throw new Error(`Matching metadata file "${jsonFileName}" not found in the same folder.`);
    }

    // 2. Upload image to IPFS
    const imageResult = await ipfsService.uploadFile(imageFile, {
      fileName: imageFile.name,
      metadata: { type: 'product-image', source: 'filesystem-browser' },
    });
    const imageCid = imageResult.cid;
    const imageUrl = this._buildGatewayUrl(imageCid);

    // 3. Parse JSON as InitialProductData
    const jsonText = await jsonFile.text();
    const initialData: InitialProductData = JSON.parse(jsonText);

    // 4. Match category and brand from existing lists
    const matchedCategory = this._matchCategory(initialData.category, categories);
    const matchedBrand = this._matchBrand(initialData.brand, brands);

    // 5. Build PartialMetadata
    const partialMetadata: PartialMetadata = {
      name: initialData.name,
      durability_data: {
        life_span: initialData.durability_data?.life_span,
        reliability: initialData.durability_data?.reliability,
        reusability: initialData.durability_data?.reusability,
        refurbishment: initialData.durability_data?.refurbishment,
        recycled_content: initialData.durability_data?.recycled_content,
      },
      repairability_data: {
        ease_of_repair: initialData.repairability_data?.ease_of_repair,
        spare_parts: initialData.repairability_data?.spare_parts,
        maintenance_manual: initialData.repairability_data?.maintenance_manual,
      },
      manufacturing_data: {
        origin: initialData.manufacturing_data?.origin,
        material_composition: initialData.manufacturing_data?.material_composition,
        substance_of_concern: initialData.manufacturing_data?.substance_of_concern,
      },
      lifecycle_data: {
        carbon_footprint: initialData.lifecycle_data?.carbon_footprint,
        environmental_footprint: initialData.lifecycle_data?.environmental_footprint,
        water_usage: initialData.lifecycle_data?.water_usage,
      },
    };

    // 6. Build ConsolidatedMetadata
    const consolidatedMetadata: ConsolidatedMetadata = {
      name: initialData.name,
      partial_metadata: partialMetadata,
      image_cid: imageCid,
    };

    // 7. Upload consolidated metadata JSON to IPFS
    const metaBlob = new Blob(
      [JSON.stringify(consolidatedMetadata, null, 2)],
      { type: 'application/json' }
    );
    const metaResult = await ipfsService.uploadFile(metaBlob, {
      fileName: `${baseName}-consolidated.json`,
      metadata: { type: 'product-metadata', imageCid },
    });
    const metadataUrl = this._buildGatewayUrl(metaResult.cid);

    // 8. Assemble the Partial<Product> that will pre-fill the form
    const formData: Partial<Product> = {
      name: initialData.name,
      title: initialData.name,
      sku: initialData.attributes?.sku || '',
      description: initialData.description,
      image_url: imageUrl,
      barcode_id: imageCid,            // barcode_id == imageCid (by convention)
      digital_passport_url: metadataUrl,
      category_id: matchedCategory?.id || 'missing-category!!!',
      brand_id: matchedBrand?.id || 'missing-brand!!!',
      manufacturer: initialData.manufacturer,
      attributes: {
        color: initialData.attributes?.color,
        size: initialData.attributes?.size,
        material: initialData.attributes?.material,
        weight: initialData.attributes?.weight,
        sku: initialData.attributes?.sku,
        dimensions: initialData.attributes?.dimensions,
      },
    };

    return { formData, consolidatedMetadata };
  }

  // ---- Private helpers -----------------------------------------------------

  private _buildGatewayUrl(cid: string): string {
    const gateway = import.meta.env.VITE_IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud';
    return `${gateway.replace(/\/$/, '')}/ipfs/${cid}`;
  }

  private _matchCategory(catPath: string, categories: Category[]): Category | undefined {
    // 1. Exact path match (c.path === full path string from JSON)
    const exactPath = categories.find(
      c => c.path?.toLowerCase() === catPath?.toLowerCase()
    );
    if (exactPath) return exactPath;

    // 2. Walk segments from most-specific (leaf) to least-specific (root).
    //    e.g. "Home & Kitchen > Laundry > Dryer Accessories"
    //    tries: "Dryer Accessories" → "Laundry" → "Home & Kitchen"
    //    This ensures the top-level category is matched even when the leaf
    //    subcategory does not exist as a row in the DB.
    const segments = (catPath || '')
      .split('>')
      .map(s => s.trim())
      .filter(Boolean)
      .reverse();

    for (const segment of segments) {
      const seg = segment.toLowerCase();
      const match = categories.find(
        c =>
          c.name?.toLowerCase() === seg ||
          c.path?.toLowerCase() === seg
      );
      if (match) return match;
    }

    // 3. Last resort: first category in the list
    return categories[0];
  }

  private _matchBrand(brandName: string, brands: Brand[]): Brand | undefined {
    return (
      brands.find(b => b.name?.toLowerCase() === brandName?.toLowerCase()) ||
      brands[0]
    );
  }
}
