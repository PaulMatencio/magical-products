import { useMemo } from 'react';
import { BulkloadUseCase } from '../../application/use-cases/admin/BulkloadUseCase';
import { bulkloadRepository } from '../../infrastructure/repositories';
import { BulkProductData } from '../../types/types';

export function useBulkUploadLogic(useCase?: BulkloadUseCase) {
    const defaultUseCase = useMemo(() => useCase || new BulkloadUseCase(bulkloadRepository), [useCase]);

    return {
        bulkload: (data: BulkProductData[]) => defaultUseCase.bulkload(data)
    };
}
