import { describe, expect, it } from 'vitest';
import { GenerateInitialProductDataUseCase } from './GenerateInitialProductDataUseCase';

describe('GenerateInitialProductDataUseCase', () => {
  it('creates defaults from catalog dependencies', () => {
    const useCase = new GenerateInitialProductDataUseCase();

    const draft = useCase.createInitialDraft(
      [{ id: 'cat-1', name: 'Toys', path: 'Toys > Solar Kits' }],
      [{ id: 'brand-1', name: 'Acme' }]
    );

    expect(draft.category).toBe('Toys > Solar Kits');
    expect(draft.brand).toBe('Acme');
    expect(draft.dimensionUnit).toBe('cm');
  });

  it('applies scanned InitialProductData JSON payloads to the draft', () => {
    const useCase = new GenerateInitialProductDataUseCase();
    const draft = useCase.createInitialDraft([], []);

    const updated = useCase.applyScannedValue(draft, JSON.stringify({
      name: 'Eco Speaker',
      category: 'Electronics > Speakers',
      description: 'Solar speaker',
      brand: 'Sun Audio',
      attributes: {
        color: 'green',
        sku: 'SPK-1',
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
    }));

    expect(updated).toMatchObject({
      name: 'Eco Speaker',
      category: 'Electronics > Speakers',
      description: 'Solar speaker',
      brand: 'Sun Audio',
      sku: 'SPK-1',
      color: 'green',
      dimensionLength: '10',
      carbonFootprint: '1.2 kg CO2e',
    });
  });

  it('generates InitialProductData JSON only when required fields are present', () => {
    const useCase = new GenerateInitialProductDataUseCase();
    const draft = {
      ...useCase.createInitialDraft([], []),
      name: 'Eco Speaker',
      category: 'Electronics > Speakers',
      description: 'Solar speaker',
      brand: 'Sun Audio',
      manufacturer: 'Sun Audio Ltd',
    };

    const data = useCase.generate('0123456789012', draft);

    expect(data).toMatchObject({
      name: 'Eco Speaker',
      category: 'Electronics > Speakers',
      description: 'Solar speaker',
      brand: 'Sun Audio',
      manufacturer: 'Sun Audio Ltd',
      attributes: {
        sku: '0123456789012',
      },
    });
    expect(useCase.serialize(data)).toContain('"sku": "0123456789012"');
  });

  it('applies scanned nutritional info payloads to the draft', () => {
    const useCase = new GenerateInitialProductDataUseCase();
    const draft = useCase.createInitialDraft([], []);

    const updated = useCase.applyScannedValue(draft, JSON.stringify({
      name: 'Organic Milk',
      nutritional_info: {
        calories: 150,
        total_fat: '8g',
        carbohydrates: '12g',
        protein: '8g',
        ingredients: ['Milk', 'Vitamin D3'],
      }
    }));

    expect(updated.name).toBe('Organic Milk');
    expect(updated.calories).toBe('150');
    expect(updated.totalFat).toBe('8g');
    expect(updated.ingredients).toBe('Milk, Vitamin D3');
  });
});
