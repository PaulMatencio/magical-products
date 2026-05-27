import { toast } from 'sonner';
import { InitialProductData } from '../../types/types';

export class GeminiAnalyzerService {
  async analyzePackaging(
    base64ImageWithHeader: string,
    apiKey: string,
    scannedSku?: string,
    targetLanguage?: string
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
            },
            main_ingredients: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Array of main or active ingredients'
            },
            certifications: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Product certifications, e.g., Bio, Organic, Vegan, Gluten-Free, Non-GMO, Halal, Kosher'
            }
          },
          required: ['calories', 'total_fat', 'carbohydrates', 'protein']
        }
      },
      required: [
        'name', 'category', 'description'
      ]
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              {
                text: `Analyze this product packaging or label image. 
- Extract the product name, brand, manufacturer, and a clear description.
- If this is a food, beverage, or nutritional supplement, you MUST extract the "nutritional_info" including calories, total_fat, saturated_fat, carbohydrates, sugars, protein, sodium, ingredients, allergens, main_ingredients, and certifications (e.g. Organic, Vegan, Non-GMO, Gluten-Free). Pay close attention to the nutrition facts table and certification seals/logos on the packaging.
- If there is a barcode or numeric SKU visible in the image, extract it into attributes.sku.
- Estimate or extract color, size, weight, and material if visible.
${scannedSku ? `Note: The barcode/SKU scanned from the packaging is "${scannedSku}". Please put this in attributes.sku.` : ''}
${targetLanguage ? `IMPORTANT: Translate all extracted textual fields (including name, category pathway, description, color, size, material, origin, life_span, ease_of_repair, ingredients list, allergens list, main_ingredients, certifications, etc.) to language code "${targetLanguage}" (e.g. "en" for English, "es" for Spanish, "fr" for French). You MUST translate names of ingredients (e.g. "harina de trigo" -> "farine de blé"), allergens (e.g. "gluten" -> "gluten"), main ingredients, and certifications. Keep brand/manufacturer names in their original/standard forms unless they have standard translations.` : ''}`,
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.1,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const resultJson = await response.json();
    const text = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini API.');
    }

    return JSON.parse(text);
  }

  async translateDraft(
    draft: any,
    targetLanguage: string,
    apiKey: string
  ): Promise<any> {
    if (!apiKey) {
      throw new Error('Gemini API key is required.');
    }

    const schema = {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING' },
        category: { type: 'STRING' },
        description: { type: 'STRING' },
        brand: { type: 'STRING' },
        manufacturer: { type: 'STRING' },
        color: { type: 'STRING' },
        size: { type: 'STRING' },
        material: { type: 'STRING' },
        weight: { type: 'STRING' },
        sku: { type: 'STRING' },
        dimensionLength: { type: 'STRING' },
        dimensionWidth: { type: 'STRING' },
        dimensionHeight: { type: 'STRING' },
        dimensionUnit: { type: 'STRING' },
        lifeSpan: { type: 'STRING' },
        reliability: { type: 'STRING' },
        reusability: { type: 'STRING' },
        refurbishment: { type: 'STRING' },
        recycledContent: { type: 'STRING' },
        easeOfRepair: { type: 'STRING' },
        spareParts: { type: 'STRING' },
        maintenanceManual: { type: 'STRING' },
        origin: { type: 'STRING' },
        materialComposition: { type: 'STRING' },
        substanceOfConcern: { type: 'STRING' },
        carbonFootprint: { type: 'STRING' },
        environmentalFootprint: { type: 'STRING' },
        waterUsage: { type: 'STRING' },
        calories: { type: 'STRING' },
        totalFat: { type: 'STRING' },
        saturatedFat: { type: 'STRING' },
        carbohydrates: { type: 'STRING' },
        sugars: { type: 'STRING' },
        protein: { type: 'STRING' },
        sodium: { type: 'STRING' },
        ingredients: { type: 'STRING' },
        allergens: { type: 'STRING' },
        mainIngredients: { type: 'STRING' },
        certifications: { type: 'STRING' }
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert translation engine. 
Translate all text values in the following product data object into the target language code: "${targetLanguage}" (e.g. "en" for English, "es" for Spanish, "fr" for French).
- Automatically detect the source language of the text.
- IMPORTANT: You MUST translate every word/phrase inside the "ingredients", "allergens", "mainIngredients", and "certifications" fields. For example, if targetLanguage is "fr", translate "Copos de avena" to "flocons d'avoine", "harina de trigo" to "farine de blé", "aceite vegetal" to "huile végétale", "Sin azúcares añadidos" to "sans sucres ajoutés". Even if these fields contain numbers, percentages, or punctuation, you MUST translate the words while leaving the numbers and punctuation exactly as they are. Do not leave these fields untranslated!
- Translate product details, description, categories, durability, repairability, origin, compositions, and all other text.
- Keep numbers, measurements, dimension units (like cm, m), and identifier values (like sku, barcode) in their original format.
- Keep brand/manufacturer names in their original/standard forms unless they have standard translations.
- Return a JSON object with the exact same keys as the input.

Input data object:
${JSON.stringify(draft)}`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.1,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini Translation API error: ${response.status} - ${errText}`);
    }

    const resultJson = await response.json();
    const text = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini translation.');
    }

    return JSON.parse(text);
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 3,
    delay = 1000
  ): Promise<Response> {
    let lastError: any = null;
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);

        if (response.ok || response.status === 429) {
          return response;
        }
        // Retry for other non-ok server errors (e.g. 5xx statuses)
        if (i < retries - 1) {
          console.warn(`Gemini API returned status ${response.status}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
        return response;
      } catch (err) {
        lastError = err;
        if (i < retries - 1) {
          console.warn(`Gemini API network error. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`, err);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
      }
    }
    if (lastError) {
      throw lastError;
    }
    return fetch(url, options);
  }
}

