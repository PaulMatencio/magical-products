import { Brand, Category, InitialProductData } from '../types/types';
import type { InitialProductDataDraft } from '../application/use-cases/operator/GenerateInitialProductDataUseCase';

export function createInitialProductDataJson(draft: InitialProductDataDraft): InitialProductData {
  return {
    name: draft.name.trim(),
    category: draft.category.trim(),
    description: draft.description.trim(),
    brand: draft.brand.trim(),
    manufacturer: draft.manufacturer.trim(),
    attributes: {
      color: draft.color.trim(),
      size: draft.size.trim(),
      material: draft.material.trim(),
      weight: draft.weight.trim(),
      sku: draft.sku.trim(),
      dimensions: {
        length: normalizeNumber(Number(draft.dimensionLength)),
        width: normalizeNumber(Number(draft.dimensionWidth)),
        height: normalizeNumber(Number(draft.dimensionHeight)),
        unit: draft.dimensionUnit.trim() || 'cm',
      },
    },
    durability_data: {
      life_span: draft.lifeSpan.trim(),
      reliability: draft.reliability.trim(),
      reusability: draft.reusability.trim(),
      refurbishment: draft.refurbishment.trim(),
      recycled_content: draft.recycledContent.trim(),
    },
    repairability_data: {
      ease_of_repair: draft.easeOfRepair.trim(),
      spare_parts: draft.spareParts.trim(),
      maintenance_manual: draft.maintenanceManual.trim(),
    },
    manufacturing_data: {
      origin: draft.origin.trim(),
      material_composition: draft.materialComposition.trim(),
      substance_of_concern: draft.substanceOfConcern.trim(),
    },
    lifecycle_data: {
      carbon_footprint: draft.carbonFootprint.trim(),
      environmental_footprint: draft.environmentalFootprint.trim(),
      water_usage: draft.waterUsage.trim(),
    },
  };
}

export function parseScannedInitialProductPayload(rawValue: string): Partial<InitialProductData> | null {
  const trimmed = rawValue.trim();
  if (!trimmed.startsWith('{')) return null;

  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as Partial<InitialProductData>;
  } catch {
    return null;
  }
}

export function findDefaultCategoryName(categories: Category[]): string {
  const category = categories[0];
  return category?.path || category?.title || category?.name || '';
}

export function findDefaultBrandName(brands: Brand[]): string {
  return brands[0]?.name || '';
}

function normalizeNumber(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value;
}
