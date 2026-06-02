/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IOwnerRepository {
  /** Check if the current user has the business_owner role */
  checkIsOwner(): Promise<boolean>;
}
