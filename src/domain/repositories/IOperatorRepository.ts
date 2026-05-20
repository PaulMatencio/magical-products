/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IOperatorRepository {
  /** Check if the current user is an operator */
  checkIsOperator(): Promise<boolean>;
}
