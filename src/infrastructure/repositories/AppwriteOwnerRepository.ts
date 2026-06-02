/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IOwnerRepository } from '../../domain/repositories/IOwnerRepository';

/**
 * Appwrite stub for owner role check.
 * In hybrid mode, roles are always checked from Supabase.
 */
export class AppwriteOwnerRepository implements IOwnerRepository {
  async checkIsOwner(): Promise<boolean> {
    // In Appwrite mode, we still defer to Supabase for role checks
    return false;
  }
}

export const appwriteOwnerRepository = new AppwriteOwnerRepository();
