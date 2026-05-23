/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { processProductJsonFiles } from './productJsonProcessor';

describe('productJsonProcessor utility', () => {
  const tempInputDir = path.join(__dirname, 'temp_test_input');
  const tempOutputDir = path.join(__dirname, 'temp_test_output');

  beforeAll(async () => {
    // Ensure clean test directories
    await fs.mkdir(tempInputDir, { recursive: true });
    await fs.mkdir(tempOutputDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up test directories
    await fs.rm(tempInputDir, { recursive: true, force: true });
    await fs.rm(tempOutputDir, { recursive: true, force: true });
  });

  it('should process, rename and copy valid product JSON files', async () => {
    // 1. Create a valid product JSON file matching InitialProductData
    const sampleProduct1 = {
      name: "EcoDry Wool Dryer Balls 6 Pack",
      category: "Home & Kitchen > Laundry",
      description: "Organic wool dryer balls.",
      brand: "EcoDry",
      manufacturer: "EcoPlanet",
      attributes: {
        color: "White",
        size: "Large",
        material: "Wool",
        weight: "200g",
        sku: "ED-BALLS-6",
        dimensions: { length: 10, width: 10, height: 10, unit: "cm" }
      },
      durability_data: {
        life_span: "1000 loads",
        reliability: "High",
        reusability: "Excellent",
        refurbishment: "N/A",
        recycled_content: "0%"
      },
      repairability_data: {
        ease_of_repair: "N/A",
        spare_parts: "None",
        maintenance_manual: "Online"
      },
      manufacturing_data: {
        origin: "New Zealand",
        material_composition: "100% Wool",
        substance_of_concern: "None"
      },
      lifecycle_data: {
        carbon_footprint: "0.2kg CO2",
        environmental_footprint: "Low",
        water_usage: "Minimal"
      }
    };

    const sampleProduct2 = {
      name: "Magic Sparkle Dust",
      category: "Toys & Games",
      description: "Some magical glitter dust.",
      brand: "PixieCorp",
      manufacturer: "PixieCorp"
    };

    await fs.writeFile(
      path.join(tempInputDir, 'ecodry-dryer-balls.json'),
      JSON.stringify(sampleProduct1, null, 2),
      'utf-8'
    );

    await fs.writeFile(
      path.join(tempInputDir, 'sparkle.json'),
      JSON.stringify(sampleProduct2, null, 2),
      'utf-8'
    );

    // Write an invalid JSON file (missing name)
    const invalidProduct = {
      category: "Invalid Product Catalog",
      description: "This has no name attribute"
    };

    await fs.writeFile(
      path.join(tempInputDir, 'invalid.json'),
      JSON.stringify(invalidProduct, null, 2),
      'utf-8'
    );

    // 2. Execute utility
    const results = await processProductJsonFiles(tempInputDir, tempOutputDir);

    // 3. Assertions
    expect(results).toHaveLength(3);

    const success1 = results.find(r => r.originalFile === 'ecodry-dryer-balls.json');
    expect(success1).toBeDefined();
    expect(success1?.success).toBe(true);
    expect(success1?.newFile).toBe('ecodry_wool_dryer_balls_6_pack.json');
    expect(success1?.productName).toBe('EcoDry Wool Dryer Balls 6 Pack');

    const success2 = results.find(r => r.originalFile === 'sparkle.json');
    expect(success2).toBeDefined();
    expect(success2?.success).toBe(true);
    expect(success2?.newFile).toBe('magic_sparkle_dust.json');

    const failure = results.find(r => r.originalFile === 'invalid.json');
    expect(failure).toBeDefined();
    expect(failure?.success).toBe(false);
    expect(failure?.error).toContain("Invalid structure");

    // Check if files actually exist in output directory
    const outputFiles = await fs.readdir(tempOutputDir);
    expect(outputFiles).toContain('ecodry_wool_dryer_balls_6_pack.json');
    expect(outputFiles).toContain('magic_sparkle_dust.json');
    expect(outputFiles).not.toContain('invalid.json');

    // Check content of the renamed files
    const content1 = await fs.readFile(path.join(tempOutputDir, 'ecodry_wool_dryer_balls_6_pack.json'), 'utf-8');
    const parsed1 = JSON.parse(content1);
    expect(parsed1.name).toBe("EcoDry Wool Dryer Balls 6 Pack");
    expect(parsed1.attributes.sku).toBe("ED-BALLS-6");
  });
});
