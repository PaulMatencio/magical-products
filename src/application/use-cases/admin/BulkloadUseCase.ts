import { IBulkLoadRepository } from "../../../domain/repositories/IBulkloadRepository";
import { BulkProductData, UploadResult } from "../../../types/types";


export class BulkloadUseCase {
    constructor(private bulkLoadRepo: IBulkLoadRepository) { }

    async bulkload(products: BulkProductData[]): Promise<UploadResult> {
        return this.bulkLoadRepo.bulkload(products);
    }

}
