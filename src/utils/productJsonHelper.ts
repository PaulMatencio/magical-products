/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InitialProductData } from '../types/types';

/**
 * Validates if the parsed object conforms to the InitialProductData interface.
 * Primarily checks for the required 'name' attribute.
 */
export function isValidInitialProductData(data: any): data is InitialProductData {
  if (!data || typeof data !== 'object') return false;
  return typeof data.name === 'string' && data.name.trim().length > 0;
}

/**
 * Generates the new JSON filename from the 'name' attribute.
 * Converts to lowercase and replaces every space (" ") with an underscore ("_").
 */
export function getRenamedFilename(name: string): string {
  const sanitizedName = name.toLowerCase().replace(/ /g, '_');
  return `${sanitizedName}.json`;
}
