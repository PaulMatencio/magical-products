import { Brand, Category, InitialProductData } from '../../../types/types';
import {
  createInitialProductDataJson,
  findDefaultBrandName,
  findDefaultCategoryName,
  parseScannedInitialProductPayload,
} from '../../../utils/productJsonBuilder';

export interface InitialProductDataDraft {
  name: string;
  category: string;
  description: string;
  brand: string;
  manufacturer: string;
  color: string;
  size: string;
  material: string;
  weight: string;
  sku: string;
  dimensionLength: string;
  dimensionWidth: string;
  dimensionHeight: string;
  dimensionUnit: string;
  lifeSpan: string;
  reliability: string;
  reusability: string;
  refurbishment: string;
  recycledContent: string;
  easeOfRepair: string;
  spareParts: string;
  maintenanceManual: string;
  origin: string;
  materialComposition: string;
  substanceOfConcern: string;
  carbonFootprint: string;
  environmentalFootprint: string;
  waterUsage: string;
}

export class GenerateInitialProductDataUseCase {
  createInitialDraft(categories: Category[], brands: Brand[]): InitialProductDataDraft {
    return {
      name: '',
      category: findDefaultCategoryName(categories),
      description: '',
      brand: findDefaultBrandName(brands),
      manufacturer: '',
      color: '',
      size: '',
      material: '',
      weight: '',
      sku: '',
      dimensionLength: '0',
      dimensionWidth: '0',
      dimensionHeight: '0',
      dimensionUnit: 'cm',
      lifeSpan: '',
      reliability: '',
      reusability: '',
      refurbishment: '',
      recycledContent: '',
      easeOfRepair: '',
      spareParts: '',
      maintenanceManual: '',
      origin: '',
      materialComposition: '',
      substanceOfConcern: '',
      carbonFootprint: '',
      environmentalFootprint: '',
      waterUsage: '',
    };
  }

  applyScannedValue(draft: InitialProductDataDraft, rawValue: string): InitialProductDataDraft {
    const cleanValue = rawValue.trim();
    const payload = parseScannedInitialProductPayload(cleanValue);

    return {
      ...draft,
      name: payload?.name || draft.name,
      category: payload?.category || draft.category,
      description: payload?.description || draft.description,
      brand: payload?.brand || draft.brand,
      manufacturer: payload?.manufacturer || draft.manufacturer,
      color: payload?.attributes?.color || draft.color,
      size: payload?.attributes?.size || draft.size,
      material: payload?.attributes?.material || draft.material,
      weight: payload?.attributes?.weight || draft.weight,
      sku: payload?.attributes?.sku || draft.sku || cleanValue,
      dimensionLength: payload?.attributes?.dimensions?.length !== undefined ? String(payload.attributes.dimensions.length) : draft.dimensionLength,
      dimensionWidth: payload?.attributes?.dimensions?.width !== undefined ? String(payload.attributes.dimensions.width) : draft.dimensionWidth,
      dimensionHeight: payload?.attributes?.dimensions?.height !== undefined ? String(payload.attributes.dimensions.height) : draft.dimensionHeight,
      dimensionUnit: payload?.attributes?.dimensions?.unit || draft.dimensionUnit,
      lifeSpan: payload?.durability_data?.life_span || draft.lifeSpan,
      reliability: payload?.durability_data?.reliability || draft.reliability,
      reusability: payload?.durability_data?.reusability || draft.reusability,
      refurbishment: payload?.durability_data?.refurbishment || draft.refurbishment,
      recycledContent: payload?.durability_data?.recycled_content || draft.recycledContent,
      easeOfRepair: payload?.repairability_data?.ease_of_repair || draft.easeOfRepair,
      spareParts: payload?.repairability_data?.spare_parts || draft.spareParts,
      maintenanceManual: payload?.repairability_data?.maintenance_manual || draft.maintenanceManual,
      origin: payload?.manufacturing_data?.origin || draft.origin,
      materialComposition: payload?.manufacturing_data?.material_composition || draft.materialComposition,
      substanceOfConcern: payload?.manufacturing_data?.substance_of_concern || draft.substanceOfConcern,
      carbonFootprint: payload?.lifecycle_data?.carbon_footprint || draft.carbonFootprint,
      environmentalFootprint: payload?.lifecycle_data?.environmental_footprint || draft.environmentalFootprint,
      waterUsage: payload?.lifecycle_data?.water_usage || draft.waterUsage,
    };
  }

  generate(scannedCode: string, draft: InitialProductDataDraft): InitialProductData | null {
    if (!scannedCode.trim() || !draft.name.trim() || !draft.category.trim() || !draft.description.trim()) {
      return null;
    }

    return createInitialProductDataJson({
      ...draft,
      sku: draft.sku || scannedCode,
    });
  }

  serialize(data: InitialProductData | null): string {
    return data ? JSON.stringify(data, null, 2) : '';
  }

  getDownloadFileName(data: InitialProductData): string {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'product';
    return `${slug}.json`;
  }
}
