import { describe, expect, it } from 'vitest';
import { createInitialProductDataJson, parseScannedInitialProductPayload } from './productJsonBuilder';
import type { InitialProductDataDraft } from '../application/use-cases/operator/GenerateInitialProductDataUseCase';

describe('productJsonBuilder', () => {
  it('creates InitialProductData JSON from a scanner draft', () => {
    const draft: InitialProductDataDraft = {
      name: 'Solar Robot Kit',
      category: 'Toys > STEM',
      description: 'STEM kit with solar parts.',
      brand: 'Sun Toys',
      manufacturer: 'Sun Toys Ltd',
      color: 'yellow',
      size: 'medium',
      material: 'recycled plastic',
      weight: '250g',
      sku: '0123456789012',
      dimensionLength: '10',
      dimensionWidth: '8',
      dimensionHeight: '6',
      dimensionUnit: 'cm',
      lifeSpan: '5 years',
      reliability: 'high',
      reusability: 'parts reusable',
      refurbishment: 'supported',
      recycledContent: '40%',
      easeOfRepair: 'moderate',
      spareParts: 'available',
      maintenanceManual: 'included',
      origin: 'France',
      materialComposition: 'plastic, copper',
      substanceOfConcern: 'none declared',
      carbonFootprint: '1.2 kg CO2e',
      environmentalFootprint: 'low',
      waterUsage: '2L',
      calories: '',
      totalFat: '',
      saturatedFat: '',
      carbohydrates: '',
      sugars: '',
      protein: '',
      sodium: '',
      ingredients: '',
      allergens: '',
      mainIngredients: '',
      certifications: '',
    };

    const data = createInitialProductDataJson(draft);

    expect(data).toMatchObject({
      name: 'Solar Robot Kit',
      category: 'Toys > STEM',
      description: 'STEM kit with solar parts.',
      brand: 'Sun Toys',
      manufacturer: 'Sun Toys Ltd',
      attributes: {
        sku: '0123456789012',
        dimensions: {
          length: 10,
          width: 8,
          height: 6,
          unit: 'cm',
        },
      },
      lifecycle_data: {
        carbon_footprint: '1.2 kg CO2e',
      },
    });
  });

  it('parses QR payloads that contain InitialProductData JSON', () => {
    const payload = parseScannedInitialProductPayload('{"name":"Mug","category":"Home"}');
    expect(payload).toEqual({ name: 'Mug', category: 'Home' });
  });

  it('ignores normal barcode payloads as InitialProductData JSON', () => {
    expect(parseScannedInitialProductPayload('0123456789012')).toBeNull();
  });

  it('creates InitialProductData JSON with nutritional_info when fields are provided', () => {
    const draft: InitialProductDataDraft = {
      name: 'Organic Milk',
      category: 'Food > Dairy',
      description: 'Fresh organic milk.',
      brand: 'BioFarm',
      manufacturer: 'BioFarm Dairy Ltd',
      color: '',
      size: '1L',
      material: '',
      weight: '1kg',
      sku: '9876543210123',
      dimensionLength: '8',
      dimensionWidth: '8',
      dimensionHeight: '22',
      dimensionUnit: 'cm',
      lifeSpan: '',
      reliability: '',
      reusability: '',
      refurbishment: '',
      recycledContent: '',
      easeOfRepair: '',
      spareParts: '',
      maintenanceManual: '',
      origin: 'Germany',
      materialComposition: '100% whole milk',
      substanceOfConcern: 'none',
      carbonFootprint: '0.8 kg',
      environmentalFootprint: '',
      waterUsage: '',
      calories: '150',
      totalFat: '8g',
      saturatedFat: '5g',
      carbohydrates: '12g',
      sugars: '11g',
      protein: '8g',
      sodium: '120mg',
      ingredients: 'Milk, Vitamin D3',
      allergens: 'Milk',
      mainIngredients: 'Milk',
      certifications: 'Organic, Bio',
    };

    const data = createInitialProductDataJson(draft);

    expect(data.nutritional_info).toEqual({
      calories: 150,
      total_fat: '8g',
      saturated_fat: '5g',
      carbohydrates: '12g',
      sugars: '11g',
      protein: '8g',
      sodium: '120mg',
      ingredients: ['Milk', 'Vitamin D3'],
      allergens: ['Milk'],
      main_ingredients: ['Milk'],
      certifications: ['Organic', 'Bio'],
    });
  });
});
