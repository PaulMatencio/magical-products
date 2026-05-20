/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo, useRef } from 'react';
import { IOperatorRepository } from '../../domain/repositories/IOperatorRepository';
import { operatorRepository } from '../../infrastructure/repositories';
import { BulkloadUseCase } from '../../application/use-cases/admin/BulkloadUseCase';
import { bulkloadRepository } from '../../infrastructure/repositories';
import { BulkProductData } from '../../types/types';

export function useOperatorLogic(
  repo: IOperatorRepository = operatorRepository,
  bulkloadRepo = bulkloadRepository
) {
  const [isOperator, setIsOperator] = useState<boolean>(false);
  const [isCheckingOperator, setIsCheckingOperator] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState(false);

  const bulkloadUseCase = useMemo(() => new BulkloadUseCase(bulkloadRepo), [bulkloadRepo]);

  const isCheckingOperatorRef = useRef(false);
  const checkOperatorStatus = useCallback(async () => {
    if (isCheckingOperatorRef.current) return false;
    isCheckingOperatorRef.current = true;
    setIsCheckingOperator(true);
    try {
      const status = await repo.checkIsOperator();
      setIsOperator(status);
      return status;
    } catch (err) {
      console.error("useOperatorLogic: Failed to check operator status:", err);
      setIsOperator(false);
      return false;
    } finally {
      setIsCheckingOperator(false);
      isCheckingOperatorRef.current = false;
    }
  }, [repo]);

  const bulkload = useCallback(async (data: BulkProductData[]) => {
    setIsUploading(true);
    try {
      const result = await bulkloadUseCase.bulkload(data);
      return result;
    } catch (err) {
      console.error("useOperatorLogic: Bulk load failed:", err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [bulkloadUseCase]);

  const clearOperatorStatus = useCallback(() => {
    setIsOperator(false);
  }, []);

  return useMemo(() => ({
    isOperator,
    isCheckingOperator,
    checkOperatorStatus,
    clearOperatorStatus,
    isUploading,
    bulkload
  }), [
    isOperator,
    isCheckingOperator,
    checkOperatorStatus,
    clearOperatorStatus,
    isUploading,
    bulkload
  ]);
}
