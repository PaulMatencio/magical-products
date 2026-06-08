import { ProductFormUseCase } from '../admin/ProductFormUseCase';
import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';
import { Category, Brand } from '../../../types/types';

export interface BulkloadProgressUpdate {
  index: number;
  total: number;
  fileName: string;
  status: 'processing' | 'success' | 'error';
  errorMessage?: string;
}

export class BulkloadUseCase {
  private productFormUseCase: ProductFormUseCase;

  constructor(private adminRepo: IAdminRepository) {
    this.productFormUseCase = new ProductFormUseCase(adminRepo);
  }

  async bulkload(
    imageFiles: File[],
    allFiles: File[],
    categories: Category[],
    brands: Brand[],
    onProgress: (update: BulkloadProgressUpdate) => void
  ): Promise<{ successCount: number; failedCount: number; errors: { fileName: string; error: string }[] }> {
    let successCount = 0;
    let failedCount = 0;
    const errors: { fileName: string; error: string }[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      onProgress({
        index: i,
        total: imageFiles.length,
        fileName: imageFile.name,
        status: 'processing'
      });

      try {
        // 1. Process files (IPFS image, JSON parsing, IPFS metadata)
        const { formData } = await this.productFormUseCase.processFile(
          imageFile,
          allFiles,
          categories,
          brands
        );

        // Set default pricing/quantity/stock if missing in JSON metadata, or use defaults
        const productPayload = {
          name: formData.name || imageFile.name.substring(0, imageFile.name.lastIndexOf('.')),
          title: formData.title || formData.name || imageFile.name.substring(0, imageFile.name.lastIndexOf('.')),
          sku: formData.sku || '',
          description: formData.description || '',
          price: formData.price || 0,
          discount_percentage: formData.discount_percentage || 0,
          category_id: formData.category_id,
          brand_id: formData.brand_id,
          category: formData.category,
          brand: formData.brand,
          manufacturer: formData.manufacturer || '',
          image_url: formData.image_url || '',
          barcode_id: formData.barcode_id || '',
          digital_passport_url: formData.digital_passport_url || '',
          in_stock: formData.in_stock ?? false,
          quantity: formData.quantity ?? 0,
          attributes: formData.attributes || {}
        };

        // 2. Add product to the database
        await this.adminRepo.addProduct(productPayload);

        successCount++;
        onProgress({
          index: i,
          total: imageFiles.length,
          fileName: imageFile.name,
          status: 'success'
        });
      } catch (err: any) {
        failedCount++;
        const errorMessage = err.message || String(err);
        errors.push({ fileName: imageFile.name, error: errorMessage });
        onProgress({
          index: i,
          total: imageFiles.length,
          fileName: imageFile.name,
          status: 'error',
          errorMessage
        });
      }
    }

    return { successCount, failedCount, errors };
  }
}
