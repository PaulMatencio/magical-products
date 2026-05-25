import { GoogleGenAI } from '@google/genai';
import { InitialProductData } from '../../types/types';

export class GeminiAnalyzerService {
  async analyzePackaging(
    base64ImageWithHeader: string,
    apiKey: string,
    scannedSku?: string
  ): Promise<Partial<InitialProductData>> {
    if (!apiKey) {
      throw new Error('Gemini API key is required. Please set it in the settings panel.');
    }

    // Split base64 header if present (e.g. "data:image/jpeg;base64,xxxx")
    const commaIndex = base64ImageWithHeader.indexOf(',');
    const base64Data = commaIndex !== -1 
      ? base64ImageWithHeader.substring(commaIndex + 1)
      : base64ImageWithHeader;

    const mimeType = base64ImageWithHeader.startsWith('data:')
      ? base64ImageWithHeader.substring(5, base64ImageWithHeader.indexOf(';'))
      : 'image/jpeg';

    const ai = new GoogleGenAI({ apiKey });

    const schema = {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING', description: 'Product name from the packaging' },
        category: { type: 'STRING', description: 'Retail category pathway (e.g., Food > Snacks > Chips)' },
        description: { type: 'STRING', description: 'Product description or label text summary' },
        brand: { type: 'STRING', description: 'Brand name' },
        manufacturer: { type: 'STRING', description: 'Manufacturer company name' },
        attributes: {
          type: 'OBJECT',
          properties: {
            color: { type: 'STRING' },
            size: { type: 'STRING' },
            material: { type: 'STRING', description: 'Ingredients list or raw materials' },
            weight: { type: 'STRING', description: 'Net weight, e.g. 100g' },
            sku: { type: 'STRING', description: 'SKU or Barcode number if visible on packaging' },
            dimensions: {
              type: 'OBJECT',
              properties: {
                length: { type: 'INTEGER' },
                width: { type: 'INTEGER' },
                height: { type: 'INTEGER' },
                unit: { type: 'STRING' }
              }
            }
          }
        },
        durability_data: {
          type: 'OBJECT',
          properties: {
            life_span: { type: 'STRING' },
            reliability: { type: 'STRING' },
            reusability: { type: 'STRING' },
            refurbishment: { type: 'STRING' },
            recycled_content: { type: 'STRING' }
          }
        },
        repairability_data: {
          type: 'OBJECT',
          properties: {
            ease_of_repair: { type: 'STRING' },
            spare_parts: { type: 'STRING' },
            maintenance_manual: { type: 'STRING' }
          }
        },
        manufacturing_data: {
          type: 'OBJECT',
          properties: {
            origin: { type: 'STRING' },
            material_composition: { type: 'STRING' },
            substance_of_concern: { type: 'STRING' }
          }
        },
        lifecycle_data: {
          type: 'OBJECT',
          properties: {
            carbon_footprint: { type: 'STRING' },
            environmental_footprint: { type: 'STRING' },
            water_usage: { type: 'STRING' }
          }
        },
        nutritional_info: {
          type: 'OBJECT',
          properties: {
            calories: { type: 'INTEGER', description: 'Calories per serving (integer)' },
            total_fat: { type: 'STRING', description: 'Total fat per serving, e.g. 5g' },
            saturated_fat: { type: 'STRING', description: 'Saturated fat per serving, e.g. 1g' },
            carbohydrates: { type: 'STRING', description: 'Total carbs, e.g. 20g' },
            sugars: { type: 'STRING', description: 'Total sugars, e.g. 5g' },
            protein: { type: 'STRING', description: 'Protein, e.g. 8g' },
            sodium: { type: 'STRING', description: 'Sodium content, e.g. 150mg' },
            ingredients: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Array of ingredients'
            },
            allergens: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Array of allergens'
            }
          },
          required: ['calories', 'total_fat', 'carbohydrates', 'protein']
        }
      },
      required: [
        'name', 'category', 'description'
      ]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType,
          },
        },
        `Analyze this product packaging or label image. 
         - Extract the product name, brand, manufacturer, and a clear description.
         - If this is a food, beverage, or nutritional supplement, you MUST extract the "nutritional_info" including calories, total_fat, saturated_fat, carbohydrates, sugars, protein, sodium, ingredients, and allergens. Pay close attention to the nutrition facts table and ingredient lists in the image.
         - If there is a barcode or numeric SKU visible in the image, extract it into attributes.sku.
         - Estimate or extract color, size, weight, and material if visible.
         ${scannedSku ? `Note: The barcode/SKU scanned from the packaging is "${scannedSku}". Please put this in attributes.sku.` : ''}`,
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema as any,
        temperature: 0.1,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini API.');
    }

    return JSON.parse(text);
  }
}
