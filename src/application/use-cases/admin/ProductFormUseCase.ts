import { ipfsService } from '../../../services/ipfsService';
import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';
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
  constructor(private adminRepo: IAdminRepository) {}

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

    // 4. Match or create category and brand dynamically
    let categoryId = 'missing-category!!!';
    let brandId = 'missing-brand!!!';

    if (initialData.category) {
      try {
        categoryId = await this.adminRepo.getOrCreateCategoryByPath(initialData.category);
      } catch (err) {
        console.error("Failed to automatically get/create category in processFile:", err);
        const matchedCategory = this._matchCategory(initialData.category, categories);
        categoryId = matchedCategory?.id || 'missing-category!!!';
      }
    } else {
      categoryId = categories[0]?.id || 'missing-category!!!';
    }

    if (initialData.brand) {
      try {
        brandId = await this.adminRepo.getOrCreateBrand(initialData.brand);
      } catch (err) {
        console.error("Failed to automatically get/create brand in processFile:", err);
        const matchedBrand = this._matchBrand(initialData.brand, brands);
        brandId = matchedBrand?.id || 'missing-brand!!!';
      }
    } else {
      brandId = brands[0]?.id || 'missing-brand!!!';
    }

    // 5. Build PartialMetadata supporting both flat and wrapped (partial_metadata) JSON formats in snake_case, camelCase, PascalCase
    const findSourceSection = (obj: any, sectionKeys: string[]): any => {
      if (!obj) return undefined;
      
      // 1. Try to search inside nested 'partial_metadata' or 'metadata' wrapper first
      const wrappers = ['partial_metadata', 'partialMetadata', 'metadata', 'Metadata'];
      for (const wrapper of wrappers) {
        if (obj[wrapper] && typeof obj[wrapper] === 'object') {
          for (const key of sectionKeys) {
            const nested = obj[wrapper][key];
            if (nested !== undefined && nested !== null && typeof nested === 'object') {
              return nested;
            }
          }
        }
      }

      // 2. Try at the root level
      for (const key of sectionKeys) {
        const val = obj[key];
        if (val !== undefined && val !== null && typeof val === 'object') {
          return val;
        }
      }
      
      return undefined;
    };

    const getNestedVal = (obj: any, keys: string[]): string => {
      if (!obj) return '';
      for (const k of keys) {
        if (obj[k] !== undefined && obj[k] !== null) {
          return String(obj[k]).trim();
        }
      }
      return '';
    };

    const getRootOrNestedString = (obj: any, keys: string[]): string => {
      if (!obj) return '';
      
      // 1. Try wrappers first
      const wrappers = ['partial_metadata', 'partialMetadata', 'metadata', 'Metadata'];
      for (const wrapper of wrappers) {
        if (obj[wrapper] && typeof obj[wrapper] === 'object') {
          for (const key of keys) {
            const val = obj[wrapper][key];
            if (val !== undefined && val !== null && String(val).trim() !== '') {
              return String(val).trim();
            }
          }
        }
      }

      // 2. Try root keys
      for (const key of keys) {
        const val = obj[key];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          return String(val).trim();
        }
      }

      return '';
    };

    const durSource = findSourceSection(initialData, [
      'durability_data', 'durabilityData', 'DurabilityData', 'DuratbilityData', 'durability', 'Durability'
    ]);
    const repSource = findSourceSection(initialData, [
      'repairability_data', 'repairabilityData', 'RepairabilityData', 'repaitabilityData', 'repairability', 'Repairability'
    ]);
    const mfgSource = findSourceSection(initialData, [
      'manufacturing_data', 'manufacturingData', 'ManufacturingData', 'ManufactutingData', 'manufacturing', 'Manufacturing'
    ]);
    const lfcSource = findSourceSection(initialData, [
      'lifecycle_data', 'lifecycleData', 'LifeCycleData', 'LifecycleData', 'lifecycle', 'Lifecycle', 'LifeCycle'
    ]);
    const nutSource = findSourceSection(initialData, [
      'nutritional_info', 'nutritionalInfo', 'NutritionalInfo', 'nutrition_info', 'nutritionInfo', 'NutritionInfo'
    ]);

    const productName = getRootOrNestedString(initialData, ['name', 'title']);
    const productDescription = getRootOrNestedString(initialData, ['description']);

    const partialMetadata: PartialMetadata = {
      name: productName,
      description: productDescription,
      durability_data: {
        life_span: getNestedVal(durSource, ['life_span', 'lifeSpan', 'lifespan', 'LifeSpan']),
        reliability: getNestedVal(durSource, ['reliability', 'Reliability']),
        reusability: getNestedVal(durSource, ['reusability', 'Reusability']),
        refurbishment: getNestedVal(durSource, ['refurbishment', 'Refurbishment']),
        recycled_content: getNestedVal(durSource, ['recycled_content', 'recycledContent', 'recycledcontent', 'RecycledContent']),
      },
      repairability_data: {
        ease_of_repair: getNestedVal(repSource, ['ease_of_repair', 'easeOfRepair', 'easeofrepair', 'EaseOfRepair']),
        spare_parts: getNestedVal(repSource, ['spare_parts', 'spareParts', 'spareparts', 'SpareParts']),
        maintenance_manual: getNestedVal(repSource, ['maintenance_manual', 'maintenanceManual', 'maintenancemanual', 'MaintenanceManual']),
      },
      manufacturing_data: {
        origin: getNestedVal(mfgSource, ['origin', 'Origin']),
        material_composition: getNestedVal(mfgSource, ['material_composition', 'materialComposition', 'materialcomposition', 'MaterialComposition']),
        substance_of_concern: getNestedVal(mfgSource, ['substance_of_concern', 'substanceOfConcern', 'substanceofconcern', 'SubstanceOfConcern']),
      },
      lifecycle_data: {
        carbon_footprint: getNestedVal(lfcSource, ['carbon_footprint', 'carbonFootprint', 'carbonfootprint', 'CarbonFootprint']),
        environmental_footprint: getNestedVal(lfcSource, ['environmental_footprint', 'environmentalFootprint', 'environmentalfootprint', 'EnvironmentalFootprint']),
        water_usage: getNestedVal(lfcSource, ['water_usage', 'waterUsage', 'waterusage', 'WaterUsage']),
      },
    };

    if (nutSource) {
      partialMetadata.nutritional_info = {
        calories: nutSource.calories !== undefined ? Number(nutSource.calories) : undefined,
        total_fat: getNestedVal(nutSource, ['total_fat', 'totalFat']),
        saturated_fat: getNestedVal(nutSource, ['saturated_fat', 'saturatedFat']) || undefined,
        carbohydrates: getNestedVal(nutSource, ['carbohydrates', 'carbohydrates']),
        sugars: getNestedVal(nutSource, ['sugars', 'sugars']) || undefined,
        protein: getNestedVal(nutSource, ['protein', 'protein']),
        sodium: getNestedVal(nutSource, ['sodium', 'sodium']) || undefined,
        ingredients: Array.isArray(nutSource.ingredients) ? nutSource.ingredients : undefined,
        allergens: Array.isArray(nutSource.allergens) ? nutSource.allergens : undefined,
        main_ingredients: Array.isArray(nutSource.main_ingredients) || Array.isArray(nutSource.mainIngredients)
          ? (nutSource.main_ingredients || nutSource.mainIngredients)
          : undefined,
        certifications: Array.isArray(nutSource.certifications) ? nutSource.certifications : undefined,
      };
    }

    // 6. Build ConsolidatedMetadata
    const consolidatedMetadata: ConsolidatedMetadata = {
      name: productName,
      description: productDescription,
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
      name: productName,
      title: productName,
      sku: initialData.attributes?.sku || getRootOrNestedString(initialData, ['sku']) || '',
      description: productDescription,
      image_url: imageUrl,
      barcode_id: imageCid,            // barcode_id == imageCid (by convention)
      digital_passport_url: metadataUrl,
      category_id: categoryId,
      brand_id: brandId,
      category: initialData.category,
      brand: initialData.brand,
      manufacturer: getRootOrNestedString(initialData, ['manufacturer', 'brand']),
      attributes: {
        color: initialData.attributes?.color || getRootOrNestedString(initialData, ['color']),
        size: initialData.attributes?.size || getRootOrNestedString(initialData, ['size']),
        material: initialData.attributes?.material || getRootOrNestedString(initialData, ['material']),
        weight: initialData.attributes?.weight || getRootOrNestedString(initialData, ['weight']),
        sku: initialData.attributes?.sku || getRootOrNestedString(initialData, ['sku']),
        dimensions: initialData.attributes?.dimensions || (initialData as any).dimensions,
        durability_data: partialMetadata.durability_data,
        repairability_data: partialMetadata.repairability_data,
        manufacturing_data: partialMetadata.manufacturing_data,
        lifecycle_data: partialMetadata.lifecycle_data,
        baseName: baseName,
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
