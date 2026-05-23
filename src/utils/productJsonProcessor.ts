/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { InitialProductData } from '../types/types';
import { isValidInitialProductData, getRenamedFilename } from './productJsonHelper';

/**
 * Interface representing the result of processing a single JSON file.
 */
export interface ProcessResult {
  originalFile: string;
  newFile: string;
  productName: string;
  success: boolean;
  error?: string;
}

/**
 * Processes all JSON files in the input directory.
 * Reads each file, parses it, validates its structure, and creates a new JSON file
 * named after the 'name' attribute (lowercased and spaces replaced with underscores).
 *
 * @param inputDir Directory containing the source JSON files
 * @param outputDir Directory where the renamed JSON files will be written (defaults to inputDir)
 * @returns A promise that resolves to an array of ProcessResult objects
 */
export async function processProductJsonFiles(
  inputDir: string,
  outputDir: string = inputDir
): Promise<ProcessResult[]> {
  const results: ProcessResult[] = [];

  try {
    // Ensure input directory exists
    try {
      const stats = await fs.stat(inputDir);
      if (!stats.isDirectory()) {
        throw new Error(`Input path ${inputDir} is not a directory.`);
      }
    } catch (err: any) {
      throw new Error(`Input directory not found or inaccessible: ${err.message}`);
    }

    // Ensure output directory exists (create it if not)
    await fs.mkdir(outputDir, { recursive: true });

    // Read all files in the input directory
    const files = await fs.readdir(inputDir);
    const jsonFiles = files.filter(file => file.toLowerCase().endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = path.join(inputDir, file);
      
      try {
        // Read file content
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(fileContent);

        // Validate structure
        if (!isValidInitialProductData(parsedData)) {
          results.push({
            originalFile: file,
            newFile: '',
            productName: parsedData?.name || '',
            success: false,
            error: "Invalid structure: 'name' attribute is missing or not a valid string.",
          });
          continue;
        }

        // Form new filename from name attribute
        const newFileName = getRenamedFilename(parsedData.name);
        const newFilePath = path.join(outputDir, newFileName);

        // Write the structured JSON data to the new file
        await fs.writeFile(newFilePath, JSON.stringify(parsedData, null, 2), 'utf-8');

        results.push({
          originalFile: file,
          newFile: newFileName,
          productName: parsedData.name,
          success: true,
        });

      } catch (err: any) {
        results.push({
          originalFile: file,
          newFile: '',
          productName: '',
          success: false,
          error: `Error processing file: ${err.message}`,
        });
      }
    }

  } catch (err: any) {
    console.error(`Failed to process JSON files: ${err.message}`);
    throw err;
  }

  return results;
}

// Support running directly as a script via node/tsx
const isDirectRun = (): boolean => {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const executedFilePath = process.argv[1];
    if (!executedFilePath) return false;
    
    // Resolve absolute paths to compare them reliably
    const absoluteCurrent = path.resolve(currentFilePath);
    const absoluteExecuted = path.resolve(executedFilePath);

    return absoluteCurrent === absoluteExecuted || 
           absoluteExecuted.endsWith('productJsonProcessor.ts') ||
           absoluteExecuted.endsWith('productJsonProcessor.js');
  } catch {
    return false;
  }
};

if (isDirectRun()) {
  const args = process.argv.slice(2);
  const inputDir = args[0];
  const outputDir = args[1] || inputDir;

  if (!inputDir) {
    console.log('Usage: npx tsx src/utils/productJsonProcessor.ts <input_directory> [output_directory]');
    process.exit(1);
  }

  console.log(`Processing JSON files in directory: ${inputDir}`);
  processProductJsonFiles(inputDir, outputDir)
    .then(results => {
      console.log('\nProcessing completed:');
      console.table(results);
      const successfulCount = results.filter(r => r.success).length;
      console.log(`Successfully processed ${successfulCount}/${results.length} files.`);
    })
    .catch(err => {
      console.error('Error during execution:', err);
      process.exit(1);
    });
}
