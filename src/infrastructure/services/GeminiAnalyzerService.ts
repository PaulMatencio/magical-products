import { toast } from 'sonner';
import { InitialProductData, ConsolidatedMetadata } from '../../types/types';

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
${scannedSku ? `Note: The barcode/SKU scanned from the packaging is "${scannedSku}". Please put this in attributes.sku.` : ''}`,
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

  async generateProductDataFromText(
    productName: string,
    brand: string,
    sku: string,
    apiKey: string
  ): Promise<Partial<InitialProductData>> {
    if (!apiKey) {
      throw new Error('Gemini API key is required. Please set it in the settings panel.');
    }

    // Step 1: Query Gemini with Google Search tool enabled to lookup real-world product information
    const searchUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    let searchQuery = `Search for and identify the product details for the barcode / SKU: "${sku}".`;
    if (productName) {
      searchQuery += ` It is likely named or related to: "${productName}".`;
    }
    if (brand) {
      searchQuery += ` Brand: "${brand}".`;
    }
    searchQuery += `\nFind the following details:
1. Product name
2. Brand and Manufacturer
3. Product description
4. Category
5. Country of origin / manufacturing location
6. Ingredients, materials, colors, sizes, or composition
7. Nutritional values (calories, fats, carbs, protein, sodium, ingredients, allergens) if it is food/beverage/supplement
8. Sustainability / durability facts if it is a durable good.`;

    let searchResultText = "";
    try {
      const searchResponse = await this.fetchWithRetry(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: searchQuery }]
            }
          ],
          tools: [
            {
              google_search: {}
            }
          ]
        })
      });

      if (searchResponse.ok) {
        const searchJson = await searchResponse.json();
        searchResultText = searchJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else {
        const errText = await searchResponse.text();
        console.warn("Google Search grounding failed:", errText);
      }
    } catch (searchErr) {
      console.warn("Failed to retrieve product details via Google Search grounding:", searchErr);
    }

    // Step 2: Use the grounded information to populate the structured schema
    const schema = {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING', description: 'Product name' },
        category: { type: 'STRING', description: 'Retail category pathway (e.g., Food > Oils > Olive Oil)' },
        description: { type: 'STRING', description: 'Product description or details summary' },
        brand: { type: 'STRING', description: 'Brand name' },
        manufacturer: { type: 'STRING', description: 'Manufacturer company name' },
        attributes: {
          type: 'OBJECT',
          properties: {
            color: { type: 'STRING' },
            size: { type: 'STRING' },
            material: { type: 'STRING', description: 'Ingredients list or raw materials' },
            weight: { type: 'STRING', description: 'Net weight, e.g. 100g' },
            sku: { type: 'STRING', description: 'SKU or Barcode number' },
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
            origin: { type: 'STRING', description: 'Country of origin / manufacturing location' },
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
            total_fat: { type: 'STRING', description: 'Total fat per serving, e.g. 14g' },
            saturated_fat: { type: 'STRING', description: 'Saturated fat per serving, e.g. 2g' },
            carbohydrates: { type: 'STRING', description: 'Total carbs, e.g. 0g' },
            sugars: { type: 'STRING', description: 'Total sugars, e.g. 0g' },
            protein: { type: 'STRING', description: 'Protein, e.g. 0g' },
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
              description: 'Product certifications'
            }
          },
          required: ['calories', 'total_fat', 'carbohydrates', 'protein']
        }
      },
      required: ['name', 'category', 'description']
    };

    const structuringPrompt = `You are a product information specialist.
Create a structured JSON object matching the requested schema.
Rely on the following real-world search results about this barcode to populate the fields. Do not hallucinate or guess fields if they are not supported by the search data or general common knowledge about this specific product.

Input Product Context:
- Barcode/SKU: "${sku}"
- Provided Name: "${productName}"
- Provided Brand: "${brand}"

Real-World Search Results / Grounded Data:
${searchResultText || "No search results returned. Please use general common knowledge for this barcode/product."}

Important Instructions:
- Set attributes.sku to "${sku}".
- Ensure category pathway is structured (e.g. Food > Oils > Olive Oil).
- Ensure origin/manufacturing details are set accurately based on the country of origin.
- Fill in nutrition info if it is a food or supplement item.
- Fill in durability/repairability/sustainability data if it is a durable good (like electronics, home goods, or clothing).`;

    const response = await this.fetchWithRetry(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: structuringPrompt }]
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
      throw new Error(`Gemini API error during structuring: ${response.status} - ${errText}`);
    }

    const resultJson = await response.json();
    const text = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini structuring API.');
    }

    return JSON.parse(text);
  }

  async getBrandDetails(
    brandName: string,
    apiKey: string
  ): Promise<{
    description?: string;
    logo_url?: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    is_manufacturer?: boolean;
  }> {
    if (!apiKey) {
      throw new Error('Gemini API key is required. Please set it in the settings panel.');
    }

    // Step 1: Query Gemini with Google Search tool enabled to lookup real-world brand information
    const searchUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const searchQuery = `Search for and identify the brand/company details for: "${brandName}".
Find:
1. Description of the brand / company, its history, product type, and philosophy.
2. Official website URL.
3. Contact email address.
4. Contact phone number.
5. Headquarters address.
6. Whether they are a manufacturer (true/false).
7. Official brand logo image URL.`;

    let searchResultText = "";
    try {
      const searchResponse = await this.fetchWithRetry(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: searchQuery }]
            }
          ],
          tools: [
            {
              google_search: {}
            }
          ]
        })
      });

      if (searchResponse.ok) {
        const searchJson = await searchResponse.json();
        searchResultText = searchJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else {
        const errText = await searchResponse.text();
        console.warn("Google Search brand lookup failed:", errText);
      }
    } catch (searchErr) {
      console.warn("Failed to retrieve brand details via Google Search grounding:", searchErr);
    }

    // Step 2: Use the grounded information to populate the structured schema
    const schema = {
      type: 'OBJECT',
      properties: {
        description: { type: 'STRING', description: 'Brief description of the brand / company' },
        logo_url: { type: 'STRING', description: 'Official brand logo URL (leave empty if not found)' },
        website: { type: 'STRING', description: 'Official website URL' },
        email: { type: 'STRING', description: 'Contact email address' },
        phone: { type: 'STRING', description: 'Contact phone number' },
        address: { type: 'STRING', description: 'Company headquarters / physical address' },
        is_manufacturer: { type: 'BOOLEAN', description: 'Whether this brand manufactures products directly' }
      },
      required: ['description', 'website', 'is_manufacturer']
    };

    const structuredResponse = await this.fetchWithRetry(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful brand details extractor. Given the search results:
"${searchResultText}"
Populate the brand details for: "${brandName}". Make sure description, website, email, phone, address, and logo_url are accurate based on the search results. If a field was not found, return empty string or null. Determine if they are a manufacturer of goods.`
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

    if (!structuredResponse.ok) {
      const errText = await structuredResponse.text();
      throw new Error(`Gemini API error during brand structuring: ${structuredResponse.status} - ${errText}`);
    }

    const resultJson = await structuredResponse.json();
    const text = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini brand structuring API.');
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

    const fieldsToTranslate: string[] = [];
    const draftKeys = Object.keys(draft);
    const schema: any = {
      type: 'OBJECT',
      properties: {},
      required: []
    };

    // We only want to translate text fields that are currently populated
    for (const key of draftKeys) {
      const val = draft[key];
      // Exclude sku/barcodes, numeric dimensions or calories from translation
      const skipKeys = ['sku', 'calories', 'dimensionLength', 'dimensionWidth', 'dimensionHeight', 'dimensionUnit'];
      if (skipKeys.includes(key)) {
        continue;
      }
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        schema.properties[key] = { type: 'STRING' };
        schema.required.push(key);
        fieldsToTranslate.push(key);
      }
    }

    if (fieldsToTranslate.length === 0) {
      return draft;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `You are a professional translator.
Translate all text values in the following product draft object into the target language code: "${targetLanguage}" (e.g. "en" for English, "es" for Spanish, "fr" for French).
- Automatically detect the source language.
- Keep numbers, measurements, units, and brand/manufacturer names in their original/standard forms unless they have a standard translation.
- Return a JSON object matching the schema.

Input data object:
${JSON.stringify(draft)}`;

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
                text: promptText
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

    const parsed = JSON.parse(text);
    return {
      ...draft,
      ...parsed
    };
  }

  async translateConsolidatedMetadata(
    metadata: ConsolidatedMetadata,
    targetLanguage: string,
    apiKey: string
  ): Promise<ConsolidatedMetadata> {
    if (!apiKey) {
      throw new Error('Gemini API key is required.');
    }

    const responseSchema = this.buildDynamicSchema(metadata);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `You are a translation engine. 
Translate all text values in the following consolidated product metadata object into the target language code: "${targetLanguage}" (e.g. "en" for English, "es" for Spanish, "fr" for French).
- Automatically detect the source language of the text.
- Translate product details, name, description, categories, durability, repairability, origin, compositions.
- IMPORTANT: You MUST translate every word/phrase inside the "ingredients", "allergens", "main_ingredients", and "certifications" arrays.
- Keep numbers, measurements, units (like cm, m), and brand/manufacturer names in their original/standard forms unless they have standard translations.
- Return a JSON object matching the schema.

Input data object:
${JSON.stringify(metadata)}`;

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
                text: promptText
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema,
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

    const parsed = JSON.parse(text);
    return {
      ...parsed,
      image_cid: metadata.image_cid
    };
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

  private buildDynamicSchema(metadata: any): any {
    const schema: any = {
      type: 'OBJECT',
      properties: {},
      required: []
    };

    // 1. Root Level
    if (metadata.name && String(metadata.name).trim() !== '') {
      schema.properties.name = { type: 'STRING' };
      schema.required.push('name');
    }
    if (metadata.description && String(metadata.description).trim() !== '') {
      schema.properties.description = { type: 'STRING' };
      schema.required.push('description');
    }

    // 2. partial_metadata
    const pm = metadata.partial_metadata;
    if (pm && typeof pm === 'object') {
      const pmSchema: any = {
        type: 'OBJECT',
        properties: {},
        required: []
      };

      if (pm.name && String(pm.name).trim() !== '') {
        pmSchema.properties.name = { type: 'STRING' };
        pmSchema.required.push('name');
      }
      if (pm.description && String(pm.description).trim() !== '') {
        pmSchema.properties.description = { type: 'STRING' };
        pmSchema.required.push('description');
      }

      // Durability Data
      if (pm.durability_data && typeof pm.durability_data === 'object') {
        const dur = pm.durability_data;
        const durSchema: any = { type: 'OBJECT', properties: {}, required: [] };
        for (const k of Object.keys(dur)) {
          if (dur[k] !== undefined && dur[k] !== null && String(dur[k]).trim() !== '') {
            durSchema.properties[k] = { type: 'STRING' };
            durSchema.required.push(k);
          }
        }
        if (durSchema.required.length > 0) {
          pmSchema.properties.durability_data = durSchema;
          pmSchema.required.push('durability_data');
        }
      }

      // Repairability Data
      if (pm.repairability_data && typeof pm.repairability_data === 'object') {
        const rep = pm.repairability_data;
        const repSchema: any = { type: 'OBJECT', properties: {}, required: [] };
        for (const k of Object.keys(rep)) {
          if (rep[k] !== undefined && rep[k] !== null && String(rep[k]).trim() !== '') {
            repSchema.properties[k] = { type: 'STRING' };
            repSchema.required.push(k);
          }
        }
        if (repSchema.required.length > 0) {
          pmSchema.properties.repairability_data = repSchema;
          pmSchema.required.push('repairability_data');
        }
      }

      // Manufacturing Data
      if (pm.manufacturing_data && typeof pm.manufacturing_data === 'object') {
        const mfg = pm.manufacturing_data;
        const mfgSchema: any = { type: 'OBJECT', properties: {}, required: [] };
        for (const k of Object.keys(mfg)) {
          if (mfg[k] !== undefined && mfg[k] !== null && String(mfg[k]).trim() !== '') {
            mfgSchema.properties[k] = { type: 'STRING' };
            mfgSchema.required.push(k);
          }
        }
        if (mfgSchema.required.length > 0) {
          pmSchema.properties.manufacturing_data = mfgSchema;
          pmSchema.required.push('manufacturing_data');
        }
      }

      // Lifecycle Data
      if (pm.lifecycle_data && typeof pm.lifecycle_data === 'object') {
        const lfc = pm.lifecycle_data;
        const lfcSchema: any = { type: 'OBJECT', properties: {}, required: [] };
        for (const k of Object.keys(lfc)) {
          if (lfc[k] !== undefined && lfc[k] !== null && String(lfc[k]).trim() !== '') {
            lfcSchema.properties[k] = { type: 'STRING' };
            lfcSchema.required.push(k);
          }
        }
        if (lfcSchema.required.length > 0) {
          pmSchema.properties.lifecycle_data = lfcSchema;
          pmSchema.required.push('lifecycle_data');
        }
      }

      // Nutritional Info
      if (pm.nutritional_info && typeof pm.nutritional_info === 'object') {
        const nut = pm.nutritional_info;
        const nutSchema: any = { type: 'OBJECT', properties: {}, required: [] };
        for (const k of Object.keys(nut)) {
          const val = nut[k];
          if (val === undefined || val === null) continue;

          if (k === 'calories') {
            nutSchema.properties.calories = { type: 'INTEGER' };
            nutSchema.required.push('calories');
          } else if (Array.isArray(val)) {
            if (val.length > 0) {
              nutSchema.properties[k] = { type: 'ARRAY', items: { type: 'STRING' } };
              nutSchema.required.push(k);
            }
          } else if (String(val).trim() !== '') {
            nutSchema.properties[k] = { type: 'STRING' };
            nutSchema.required.push(k);
          }
        }

        if (nutSchema.required.length > 0) {
          pmSchema.properties.nutritional_info = nutSchema;
          pmSchema.required.push('nutritional_info');
        }
      }

      if (pmSchema.required.length > 0) {
        schema.properties.partial_metadata = pmSchema;
        schema.required.push('partial_metadata');
      }
    }

    return schema;
  }
}

