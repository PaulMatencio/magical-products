/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IOwnerRepository } from '../../../domain/repositories/IOwnerRepository';

export class OwnerUseCase {
  constructor(private ownerRepository: IOwnerRepository) {}

  async checkOwnerStatus(): Promise<boolean> {
    return this.ownerRepository.checkIsOwner();
  }
}
