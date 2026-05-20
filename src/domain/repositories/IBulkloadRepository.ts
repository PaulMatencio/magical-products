/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BulkProductData, UploadResult } from '../../types/types';


export interface IBulkLoadRepository {
  /** Add a list of new products to the inventory from bulk file */
  bulkload(products: BulkProductData[]): Promise<UploadResult>;
}

